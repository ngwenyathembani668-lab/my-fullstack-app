import { Request, Response } from "express";
import { Reservation } from "../models/Reservation.js";

// Creates a brand new booking with strict overlap protection
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { listingId, checkInDate, checkOutDate, totalPrice } = req.body;
    const userId = req.user?.id;

    // Denies access if the user ID could not be found or extracted
    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // parse the incoming date strings into real Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      res.status(400).json({ message: "Invalid date format provided" });
      return;
    }

    // check-in must be a future date
    if (checkIn.getTime() <= Date.now()) {
      res.status(400).json({ message: "Check-in date must be in the future" });
      return;
    }

    // check-out must occur strictly after check-in
    if (checkOut.getTime() <= checkIn.getTime()) {
      res.status(400).json({ message: "Check-out date must be after the check-in date" });
      return;
    }

    // searches the database to see if this listing is already booked for these dates
    const overlappingReservation = await Reservation.findOne({
      listingId,
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
    });

    if (overlappingReservation) {
      res.status(400).json({ message: "This accommodation is already booked for the selected dates." });
      return;
    }

    // creates a new reservation record with the booking details and final price
    const newReservation = new Reservation({
      listingId,
      userId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice,
    });

    await newReservation.save();

    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error inside createReservation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetches every reservation belonging to the logged-in user
export const getUserReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // fetch all bookings for thhe user, populating the listing
    // details so the dashboard can display titles, images, etc.
    const reservations = await Reservation.find({ userId }).populate("listingId");

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error inside getUserReservations:", error);
    res.status(500).json({ message: "Server error" });
  }
};