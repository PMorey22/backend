import mongoose from "mongoose";

const usetSchema = new mongoose.Schema({
    uset_id: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "non-binary"], required: true },
    location: { type: String, required: true },
    interests: { type: [String], required: true },
    meme_preferences: { type: [String], required: true },
    interaction_patterns: {
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        dm_responses: { type: Number, default: 0 }
    },
    past_matches: { type: [String], default: [] }
});

const Uset = mongoose.model("Uset", usetSchema);
export default Uset;
