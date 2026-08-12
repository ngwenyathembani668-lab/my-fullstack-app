import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listingRouter from './routes/listingRoutes';
import authRouter from './routes/authRoutes';

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


// Parse incoming JSON request bodies
app.use(express.json());

// Anything sent to '/api/accommodations' will be handled by the listingRouter file!
app.use('/api/accommodations', listingRouter);

// Anything sent to '/api/auth' will be handled by the authRouter file!
app.use('/api/auth', authRouter);
