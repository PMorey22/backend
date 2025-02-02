import express from "express";
import Match from "../models/match.js";
import User from "../models/user.js";

const router = express.Router();

// Create a match request
router.post("/", async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        const match = await Match.create({ user1, user2 });
        
        // Update user match list
        await User.findByIdAndUpdate(user1, { $push: { matches: match._id } });
        await User.findByIdAndUpdate(user2, { $push: { matches: match._id } });

        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update match status
router.put("/:id", async (req, res) => {
    const { status } = req.body;

    try {
        const match = await Match.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(match);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
