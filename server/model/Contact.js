import mongoose from "mongoose";

const  { model, models, Schema } = mongoose
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: Number,
      required: false,
    },

    info: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;
