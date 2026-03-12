import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log("Please define the MONGO_URI environment variable inside .env.local");
}



const dbConnect = async (res) => {

  try {
    console.log(MONGODB_URI)
    const db = await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.log(MONGODB_URI);
  }
};

export default dbConnect;
