import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connecting to MangoDB!
mongoose.connect(process.env.MONGODB_URI as string) 
    .then(() => {
        console.log("Connected to MongoDB successfully!");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });

// this is the normal routing!
app.get('/', (req, res) => {
    res.send('Server is running!');
});
