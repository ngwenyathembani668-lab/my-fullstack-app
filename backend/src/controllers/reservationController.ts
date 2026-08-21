import { Request, Response } from "express";
import { Reservation } from "../models/Reservation";
import { Accommodation } from "../models/Accommodation";

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

    // make sure the listing actually exists before booking it
    const listing = await Accommodation.findById(listingId);
    if (!listing) {
      res.status(404).json({ message: "Accommodation listing not found" });
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
    res.status(500).json({ message: "Server error" });
  }
};

// Fetches every reservation belonging to the logged-in visitor
export const getUserReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // fetch all bookings for the user, populating the listing
    // details so the dashboard can display titles, images, etc.
    const reservations = await Reservation.find({ userId }).populate("listingId");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetches every reservation made on the host's own listings
export const getHostReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // first find all the listings owned by this host
    const listings = await Accommodation.find({ host_id: userId }).select("_id");
    const listingIds = listings.map((listing) => listing._id);

    // then grab every booking that references those listings
    const reservations = await Reservation.find({ listingId: { $in: listingIds } }).populate("listingId");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Cancels a reservation - only the guest who booked it or the host can cancel
export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // find the booking and pull in the listing so we can check ownership
    const reservation = await Reservation.findById(id).populate("listingId");
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    const listing = reservation.listingId as any;
    const isGuest = reservation.userId.toString() === userId;
    const isHost = listing && listing.host_id === userId;

    // only the guest or the host of that listing can cancel it
    if (!isGuest && !isHost) {
      res.status(403).json({ message: "Access Denied: You cannot cancel this reservation" });
      return;
    }

    await Reservation.findByIdAndDelete(id);

    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    // Catch-all block handles bad syntax IDs gracefully without crashing the app context
    res.status(400).json({ message: "Invalid ID format or internal server failure" });
  }
};