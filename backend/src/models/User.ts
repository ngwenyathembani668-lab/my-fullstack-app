import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Role definition: literal union of permitted access levels.
// Standard accounts initialize with a default fallback role of ['visitor'].
export type UserRole = "visitor" | "host";

// The IUser interface extends Mongoose's Document framework so every hydrated
// document carries the full document lifecycle methods (save, isModified, etc.)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: UserRole[];
  // Custom schema method for downstream plaintext-vs-hash match validations
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Formal RegEx template verifying the layout health of an email address:
// supports names like "user.name+tag@sub.domain.com"
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

// Pre-save middleware: salts and hashes the password before any document
// hits the database. Only re-hashes when the password field actually changed.
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Custom instance method: compares a candidate plaintext password against the
// stored bcrypt hash for downstream login/match validations.
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the compiled model for reuse across the application
export const User = model<IUser>("User", UserSchema);
export default User;