import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";  // New
import messageRoutes from "./routes/messageRoutes.js";  // New
import cors from "cors"; 

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({ 
    origin: "https://akhripasta-pcge8vi3o-purvas-projects-dbbac4aa.vercel.app", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
}));

app.use("/api/auth", authRoutes); 
app.use("/api/matches", matchRoutes);  // New
app.use("/api/messages", messageRoutes);  // New

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
  console.log("Received request at /");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
