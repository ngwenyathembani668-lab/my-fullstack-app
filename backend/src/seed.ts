import mongoose from "mongoose";
import dotenv from "dotenv";
import { Accommodation } from "./models/Accomodation";

dotenv.config();

// 5 high-quality mock listings across famous travel destinations
const accommodations = [
  {
    title: "Luxury Manhattan Sky Loft",
    description:
      "A breathtaking penthouse loft in the heart of Manhattan with floor-to-ceiling windows, sweeping skyline views, and a private rooftop terrace. Steps from Times Square, Central Park, and world-class dining.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Entire Apartment",
    location: "New York",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Air Conditioning", "Pool", "Gym", "Doorman"],
    rating: 4.9,
    reviews: 128,
    price: 450,
    host: "Sophia Bennett",
    host_id: "host_ny_001",
    weeklyDiscount: 15,
    cleaningFee: 120,
    serviceFee: 65,
    occupancyTaxes: 45,
    enhancedCleaning: true,
    selfCheckIn: true,
    specificRatings: {
      cleanliness: 4.9,
      communication: 5.0,
      checkIn: 4.8,
      accuracy: 4.9,
      location: 5.0,
      value: 4.8,
    },
  },
  {
    title: "Chic Montmartre Studio with Eiffel View",
    description:
      "A charming Parisian studio nestled in the artistic Montmartre district. Wake up to views of the Eiffel Tower, stroll to Sacré-Cœur, and enjoy cozy mornings at the neighborhood cafés.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Entire Apartment",
    location: "Paris",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Kitchen", "Heating", "Washer", "Coffee Maker"],
    rating: 4.8,
    reviews: 96,
    price: 210,
    host: "Camille Laurent",
    host_id: "host_paris_002",
    weeklyDiscount: 10,
    cleaningFee: 45,
    serviceFee: 30,
    occupancyTaxes: 22,
    enhancedCleaning: true,
    selfCheckIn: true,
    specificRatings: {
      cleanliness: 4.8,
      communication: 4.9,
      checkIn: 4.7,
      accuracy: 4.8,
      location: 4.9,
      value: 4.7,
    },
  },
  {
    title: "Modern Shinjuku Penthouse Retreat",
    description:
      "A sleek, high-tech penthouse in the vibrant Shinjuku district. Enjoy panoramic city views, a Japanese soaking tub, and easy access to Tokyo's best shopping, dining, and nightlife.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Entire Apartment",
    location: "Tokyo",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Air Conditioning", "Washer", "Elevator", "Smart TV"],
    rating: 4.9,
    reviews: 154,
    price: 320,
    host: "Haruto Tanaka",
    host_id: "host_tokyo_001",
    weeklyDiscount: 12,
    cleaningFee: 80,
    serviceFee: 50,
    occupancyTaxes: 35,
    enhancedCleaning: true,
    selfCheckIn: true,
    specificRatings: {
      cleanliness: 5.0,
      communication: 4.9,
      checkIn: 4.9,
      accuracy: 4.8,
      location: 4.9,
      value: 4.9,
    },
  },
  {
    title: "Elegant Notting Hill Townhouse",
    description:
      "A beautifully restored Victorian townhouse on a quiet Notting Hill street. Featuring a private garden, designer kitchen, and a short walk to Portobello Road Market and Hyde Park.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "House",
    location: "London",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["Wifi", "Kitchen", "Garden", "Fireplace", "Washer", "Dryer", "Parking"],
    rating: 4.8,
    reviews: 74,
    price: 380,
    host: "Oliver Whitmore",
    host_id: "host_london_001",
    weeklyDiscount: 18,
    cleaningFee: 110,
    serviceFee: 55,
    occupancyTaxes: 40,
    enhancedCleaning: true,
    selfCheckIn: false,
    specificRatings: {
      cleanliness: 4.8,
      communication: 4.7,
      checkIn: 4.6,
      accuracy: 4.8,
      location: 4.9,
      value: 4.8,
    },
  },
  {
    title: "Romantic Trastevere Villa with Terrace",
    description:
      "A sun-drenched villa in the charming Trastevere quarter, complete with a private rooftop terrace overlooking Rome's ancient rooftops. Minutes from the Colosseum, Trevi Fountain, and authentic trattorias.",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    type: "Villa",
    location: "Rome",
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Air Conditioning", "Pool", "Terrace", "Espresso Machine"],
    rating: 4.7,
    reviews: 58,
    price: 280,
    host: "Giulia Romano",
    host_id: "host_rome_001",
    weeklyDiscount: 10,
    cleaningFee: 60,
    serviceFee: 35,
    occupancyTaxes: 28,
    enhancedCleaning: true,
    selfCheckIn: true,
    specificRatings: {
      cleanliness: 4.7,
      communication: 4.8,
      checkIn: 4.6,
      accuracy: 4.7,
      location: 4.9,
      value: 4.6,
    },
  },
];

async function seedDatabase(): Promise<void> {
  try {
    // Load environment variables from the .env file
    dotenv.config();

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully!");

    // Purge old records to leave a clean baseline of exactly 5 documents
    const deleted = await Accommodation.deleteMany({});
    console.log(`Cleaned up ${deleted.deletedCount} existing accommodation(s).`);

    // Insert the 5 mock listings
    const inserted = await Accommodation.insertMany(accommodations);
    console.log(`Successfully seeded ${inserted.length} accommodations:`);
    inserted.forEach((acc) => {
      console.log(`  - ${acc.title} (${acc.location})`);
    });

    // Graceful exit on success
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();