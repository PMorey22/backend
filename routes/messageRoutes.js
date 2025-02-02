import express from "express";
import Message from "../models/message.js";
import User from "../models/user.js";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
        const message = await Message.create({ sender, receiver, content });

        // Update users' message lists
        await User.findByIdAndUpdate(sender, { $push: { messages: message._id } });
        await User.findByIdAndUpdate(receiver, { $push: { messages: message._id } });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch messages between two users
router.get("/:user1/:user2", async (req, res) => {
    const { user1, user2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
