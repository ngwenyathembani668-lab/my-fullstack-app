import { Schema, model, Document, Types } from "mongoose";

// Strongly-typed shape of a booking document stored in MongoDB
export interface IReservation extends Document {
  listingId: Types.ObjectId;   // references the Accommodation being booked
  userId: Types.ObjectId;      // references the User making the booking
  checkInDate: Date;           // first night of the stay
  checkOutDate: Date;          // morning the guest departs
  totalPrice: number;          // final computed sum for the stay
}

// The Mongoose schema guarding reservation data integrity
const ReservationSchema = new Schema<IReservation>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Accommodation",
      required: [true, "A listing reference is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A user reference is required"],
    },
    checkInDate: {
      type: Date,
      required: [true, "A check-in date is required"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "A check-out date is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "A total price is required"],
    },
  },
  {
    timestamps: true, // automatically tracks createdAt / updatedAt
  }
);

// Export the compiled model for use across the application
export const Reservation = model<IReservation>("Reservation", ReservationSchema);
export default Reservation;