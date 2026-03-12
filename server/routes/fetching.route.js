import express from "express"
import { getCategory, getFaqs, getProjects, getServicesByCategory, getServicesDetail, getTeams, getTestimonails } from "../controller/fetching.controller.js"

const router = express.Router()

router.get('/category', getCategory); // fetch all categories
router.get('/category/:id', getServicesByCategory); // fetch all services by category
router.get('/services/:id', getServicesDetail); 
router.get('/projects', getProjects); 
router.get('/teams', getTeams); 
router.get('/testimonail', getTestimonails); 
router.get('/faqs', getFaqs); 

export default router