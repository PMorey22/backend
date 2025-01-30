import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"; // Import CORS

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({ 
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allow cookies if needed
}));

app.use("/api/auth", authRoutes); // Use auth routes after CORS middleware

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB()
  .then(() => {
    console.log("Database connected successfully"); // Add log for confirmation
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
  console.log("Received request at /"); // Debug log
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Debug log
});
