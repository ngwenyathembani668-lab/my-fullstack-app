import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import listingRouter from './routes/listingRoutes';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import reservationRouter from './routes/reservationRoutes';
import { notFound, errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// fail fast if the JWT secret is missing so auth never silently breaks
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing from the environment variables!");
  process.exit(1);
}

// security + parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// this is the normal routing!
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Anything sent to '/api/accommodations' will be handled by the listingRouter file!
app.use('/api/accommodations', listingRouter);

// Anything sent to '/api/auth' will be handled by the authRouter file!
app.use('/api/auth', authRouter);

// Anything sent to '/api/users' will be handled by the userRouter file!
app.use('/api/users', userRouter);

// Anything sent to '/api/reservations' will be handled by the reservationRouter file!
app.use('/api/reservations', reservationRouter);

// 404 + global error handling must come last
app.use(notFound);
app.use(errorHandler);

// Connecting to MongoDB!
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