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


// this function bellow allows you to fetch a single listing by its Id
export const getAccommodationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Use mongoose to fetch the exact document
    const listing = await Accommodation.findById(id);

    // if the id format is valid but the listing is not found
    // in the database, the it will return a 404 error
    if (!listing) {
      res.status(404).json({ message: "Accommodation listing not found" });
      return;
    }

    // success: returns the correct object containing review templates and the listing fees
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error inside getAccommodationById:", error);
    
    // Catch-all block handles bad syntax IDs gracefully without crashing the app context
    res.status(500).json({ message: "Invalid ID format or internal server failure" });
  }
};