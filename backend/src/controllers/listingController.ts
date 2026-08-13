import { Request, Response } from "express";
import { Accommodation } from "../models/Accommodation";
import { User } from "../models/User";

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
    res.status(400).json({ message: "Invalid ID format or internal server failure" });
  }
};

// this function lets a host create a brand new listing
export const createAccommodation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    // Denies access if the user ID could not be found or extracted
    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // grab the host name so the listing shows who owns it
    const hostUser = await User.findById(userId);
    if (!hostUser) {
      res.status(404).json({ message: "Host user not found" });
      return;
    }

    // build the new listing and force the host_id from the token, never the body
    const newListing = new Accommodation({
      ...req.body,
      host: hostUser.name,
      host_id: userId,
    });

    await newListing.save();

    // 201 created with the full listing object
    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error inside createAccommodation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// this function lets a host delete their own listing only
export const deleteAccommodation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Denies access if the user ID could not be found or extracted
    if (!userId) {
      res.status(401).json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // find the listing first so we can check who owns it
    const listing = await Accommodation.findById(id);
    if (!listing) {
      res.status(404).json({ message: "Accommodation listing not found" });
      return;
    }

    // ownership check - only the host who created it can delete it
    if (listing.host_id !== userId) {
      res.status(403).json({ message: "Access Denied: You can only delete your own listings" });
      return;
    }

    await Accommodation.findByIdAndDelete(id);

    res.status(200).json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error("Error inside deleteAccommodation:", error);

    // Catch-all block handles bad syntax IDs gracefully without crashing the app context
    res.status(400).json({ message: "Invalid ID format or internal server failure" });
  }
};