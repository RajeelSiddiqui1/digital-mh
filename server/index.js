import express from "express"
import dotenv from "dotenv"
import dbConnect from "./lib/db.js"
import cors from "cors"
import fetchRoute from "./routes/fetching.route.js"
import contactRoute from "./routes/contact.route.js"

dotenv.config()

dbConnect()
const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.use(cors({
  origin: ["http://localhost:5173","http://153.92.209.177:5178","https://mhdigitaledge.com"]
}));


app.use("/api/user/fetch", fetchRoute); 
app.use("/api/user/contact", contactRoute); 


app.listen(PORT || 5005, () =>{
    console.log(`Mongodb run on ${PORT}`)
})