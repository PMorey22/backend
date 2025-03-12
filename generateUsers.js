require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Uset = require('/models/Uset'); // Import the Uset model

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Function to generate random user data
const generateUserData = () => {
    return {
        user_id: faker.string.uuid(),
        age: faker.number.int({ min: 18, max: 40 }), // Age between 18 and 40
        gender: faker.helpers.arrayElement(["male", "female", "non-binary"]),
        location: faker.location.city(),
        interests: faker.helpers.arrayElements(
            ["anime", "gaming", "travel", "music", "memes", "fitness", "movies", "tech", "books", "food"],
            faker.number.int({ min: 2, max: 5 }) // Select 2-5 interests
        ),
        meme_preferences: faker.helpers.arrayElements(
            ["dark humor", "wholesome", "relatable", "dank", "sarcastic", "retro", "absurd", "animal memes"],
            faker.number.int({ min: 2, max: 4 }) // Select 2-4 meme types
        ),
        interaction_patterns: {
            likes: faker.number.int({ min: 0, max: 100 }),
            shares: faker.number.int({ min: 0, max: 50 }),
            comments: faker.number.int({ min: 0, max: 30 }),
            dm_responses: faker.number.int({ min: 0, max: 20 })
        },
        past_matches: []
    };
};

// Function to insert users into the database
const insertUsers = async () => {
    try {
        const users = Array.from({ length: 100 }, generateUserData); // Generate 100 users
        await Uset.insertMany(users);
        console.log("✅ 100 Users Inserted Successfully!");
        mongoose.connection.close(); // Close the DB connection
    } catch (error) {
        console.error("Error inserting users:", error);
    }
};

// Run the function
insertUsers();
