import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB..."); // Debug log
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
    mongoose.connection.on("connected", () => {
        console.log("✅ MongoDB connection verified and active");
    });

    mongoose.connection.on("error", (err) => {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
    });
}

export default connectDB;