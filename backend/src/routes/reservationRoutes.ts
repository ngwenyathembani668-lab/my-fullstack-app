import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationController.js";

const router: Router = Router();

// Protected: creates a new booking for the logged-in user
router.post("/", verifyToken, createReservation);

// Protected: fetches all bookings belonging to the logged-in user
router.get("/", verifyToken, getUserReservations);

export default router;