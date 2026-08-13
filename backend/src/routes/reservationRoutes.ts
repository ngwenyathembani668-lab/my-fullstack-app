import { Router } from "express";
import { verifyToken, requireHost } from "../middleware/auth";
import {
  createReservation,
  getUserReservations,
  getHostReservations,
  deleteReservation,
} from "../controllers/reservationController";
import { validate, createReservationValidation } from "../middleware/validation";

const router: Router = Router();

// Protected: creates a new booking for the logged-in user
router.post("/", verifyToken, validate(createReservationValidation), createReservation);

// Protected: fetches all bookings belonging to the logged-in visitor
router.get("/user", verifyToken, getUserReservations);

// Protected: fetches all bookings made on the host's own listings
router.get("/host", verifyToken, requireHost, getHostReservations);

// Protected: cancels a reservation
router.delete("/:id", verifyToken, deleteReservation);

export default router;