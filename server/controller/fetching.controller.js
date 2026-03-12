import Category from "../model/Categories.js";
import Services from "../model/Services.js";
import Project from "../model/Project.js";
import Team from "../model/Teams.js";
import Testimonail from "../model/Testimonail.js";
import FAQS from "../model/Faqs.js";
import mongoose from "mongoose";

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const service = await Services.find({
      cateogryId: id,
      isActive: true,
    })
      .populate("cateogryId", "title description")
      .lean();

    if (!service || service.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this category" });
    }

    res.status(200).json({ service, message: "Services fetched successfully" });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServicesDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const service = await Services.findById(id)
      .populate("categoryId", "title description")
      .populate("adminId", "name email")
      .lean();

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ service, message: "Service fetched successfully" });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true });

    res.status(200).json({ projects, message: "Project fetched successfully" });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTestimonails = async (req, res) => {
  try {
    const testimonials = await Testimonail.find();

    res
      .status(200)
      .json({ testimonials, message: "Testimonail fetched successfully" });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teamMembers = await Team.aggregate([
      {
        $addFields: {
          roleOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$role", "owner"] }, then: 1 },
                { case: { $eq: ["$role", "manager"] }, then: 2 },
                { case: { $eq: ["$role", "teamlead"] }, then: 3 },
                { case: { $eq: ["$role", "employee"] }, then: 4 },
              ],
              default: 5,
            },
          },
        },
      },
      {
        $sort: {
          roleOrder: 1,
        },
      },
      {
        $project: {
          roleOrder: 0,
        },
      },
    ]);

    return res.status(200).json({
      teamMembers,
      message: "Team members fetched successfully",
    });
  } catch (error) {
    console.error("Team fetch error:", error);
    return res.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const getFaqs = async (req, res) => {
  try {
    const faqs = await FAQS.find().sort({ createdAt: -1 });
    res.status(200).json({ faqs });
  } catch (error) {
    console.error("Error faqs :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


