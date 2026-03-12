import express from "express"
import { ConatctUs } from "../controller/contact.controller.js";


const router = express.Router()


router.post('/', ConatctUs); 

export default router