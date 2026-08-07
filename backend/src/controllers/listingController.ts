import { Request, Response } from "express";
import { Accommodation } from "../models/Accomodation";


// the function bellow is meant to fetch all listing that
// exist in this airbnb clone

export const getAllAccommodations = async (req: Request, res: Response): Promise<void> => {
  try {
    // Queries the entire collection from your cluster
    const listings = await Accommodation.find({});
    
    // Send a 200 OK status containing your database records array
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error inside getAllAccommodations:", error);
    res.status(500).json({ message: "Server error failed to retrieve accommodations" });
  }
};

/**
 * FEATURE 2: Fetch a Single Listing by ID
 * Targets specific ID parameter tokens to feed your dynamic frontend (listing-details) page.
 */
export const getAccommodationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Use Mongoose built-in engine to pinpoint the exact document
    const listing = await Accommodation.findById(id);

    // Strict Validation: If the ID format is correct but doesn't exist in the DB
    if (!listing) {
      res.status(404).json({ message: "Accommodation listing not found" });
      return;
    }

    // Success: Returns the precise object containing review templates and fees
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error inside getAccommodationById:", error);
    
    // Catch-all block handles bad syntax IDs gracefully without crashing the app context
    res.status(500).json({ message: "Invalid ID format or internal server failure" });
  }
};