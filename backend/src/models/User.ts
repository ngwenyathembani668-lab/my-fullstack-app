import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// This creates a custom type for user roles so a user can only be either a visitor or a host
// Exporting it lets us reuse this specific rule across other files to keep our data consistent!
export type UserRole = "visitor" | "host";

// Defines the User structure for my database
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string; // Optional profile picture link
  role: UserRole[]; // Array of roles assigned to the user

  // Checks if the entered password is correct.
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Simple regex to check if an email format is valid
const EMAIL_REGEX = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "A name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "An email address is required"],
      unique: true,             // no duplicate accounts in the cluster
      lowercase: true,          // normalize to lowercase
      trim: true,               // strip surrounding whitespace
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
    role: {
      type: [String],
      enum: ["visitor", "host"],
      default: ["visitor"],
    },
  },
  {
    timestamps: true, // createdAt / updatedAt tracking
  }
);

// Hashes the password automatically right before saving a user profile
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  // Generate a secure salt and turn the plain text password into a hash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// helper function to check if the user passsword matches the database hash
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the compiled model for reuse across the application
export const User = model<IUser>("User", UserSchema);
export default User;