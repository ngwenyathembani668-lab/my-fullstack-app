import { Schema, model, Document } from 'mongoose';

// Ratings interface
interface ISpecificRatings {
  cleanliness: number;
  communication: number;
  checkIn: number;
  accuracy: number;
  location: number;
  value: number;
}

// this is the interface for the Accommodation document in MongoDB 
// and it can be shared across the application for type safety.
export interface IAccommodation extends Document {
  title: string;
  description: string;
  images: string[];            // Array of image URL strings (.cover-img and 4 other .alt-images)
  type: string;              // e.g entire Apartment, House, Room
  location: string;          // City name (e.g New York, Paris, Durban/capetown)
  guests: number;            // Max visitor count
  bedrooms: number;
  bathrooms: number;
  amenities: string[];       // Array of items (eg. Wifi, Kitchen and more..)
  rating: number;            // Total overall star review out of 5.0
  reviews: number;           // Total count of reviews
  price: number;             // dynamic price in dollars per night
  host: string;              // Name of the host
  host_id: string;           // Tracks who owns the listing
  weeklyDiscount: number;    // Percentage or flat rate discount
  cleaningFee: number;
  serviceFee: number;
  occupancyTaxes: number;
  enhancedCleaning: boolean;
  selfCheckIn: boolean;
  specificRatings: ISpecificRatings;
}

// The Mongoose Schema (The database guardrails that stop invalid data)
const AccommodationSchema = new Schema<IAccommodation>(
  {
    title: { type: String, required: [true, 'A title is required'] },
    description: { type: String, required: [true, 'A description is required'] },
    images: { type: [String], required: [true, 'At least one image is required'] },
    type: { type: String, required: [true, 'Accommodation type is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    guests: { type: Number, required: [true, 'Maximum guest capacity is required'] },
    bedrooms: { type: Number, required: [true, 'Number of bedrooms is required'] },
    bathrooms: { type: Number, required: [true, 'Number of bathrooms is required'] },
    amenities: { type: [String], default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'Price per night is required'] },
    host: { type: String, required: [true, 'Host name is required'] },
    host_id: { type: String, required: [true, 'Host ID is required'] },
    weeklyDiscount: { type: Number, default: 0 },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    occupancyTaxes: { type: Number, default: 0 },
    enhancedCleaning: { type: Boolean, default: false },
    selfCheckIn: { type: Boolean, default: false },
    specificRatings: {
      cleanliness: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      checkIn: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 },
      location: { type: Number, default: 0 },
      value: { type: Number, default: 0 },
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' tracking fields
    timestamps: true, 
  }
);

// making the foundation to be shared across the entire app!
export const Accommodation = model<IAccommodation>('Accommodation', AccommodationSchema);