import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../models/User";

// this is the exact shape stored inside a signed JWT
interface JwtPayload {
  id: string;
  roles: UserRole[];
}

// builds a signed JWT containing the user's id and roles, valid for 7 days only
const generateToken = (id: string, roles: UserRole[]): string => {
  const payload: JwtPayload = { id, roles };
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};

// Extracts a consistent, flat user profile object for API responses
const buildUserProfile = (user: {
  id: string;
  name: string;
  email: string;
  role: UserRole[];
  avatarUrl?: string;
}) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  roles: user.role,
  avatarUrl: user.avatarUrl,
});

// registers or creating a brand new visitor account
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // prevent duplicate accounts sharing the same email account
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // password validation before creating the user
    if (!password || password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters long" });
      return;
    }

    // create the new user - the pre-save hook hashes the password automatically
    const user = await User.create({ name, email, password });

    // sign a JWT with the users id and their default roles
    const token = generateToken(user.id, user.role);

    // 201 created with the token and a clean user profile
    res.status(201).json({
      token,
      user: buildUserProfile(user),
    });
  } catch (error) {
    console.error("Error inside registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// logs an existing user into the application!
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // locate or spot the user by their email address
    const user = await User.findOne({ email });
    if (!user) {
      // keep the message generic to avoid leaking which emails are registered
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // verifing the submitted password with also the stored bcrypt hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // sends back a 401 Error if login credentials don't match.
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // issue a fresh 7-day JWT for the authenticated session
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      token,
      user: buildUserProfile(user),
    });
  } catch (error) {
    console.error("Error inside loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// upgrades a visitor account to also have the host role
export const becomeHost = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // grant the 'host' role only if it isn't already present
    if (!user.role.includes("host")) {
      user.role.push("host");
      await user.save();
    }

    // give the token so the frontend immediately receives the new dual roles
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      token,
      user: buildUserProfile(user),
    });
  } catch (error) {
    console.error("Error inside becomeHost:", error);
    res.status(500).json({ message: "Server error" });
  }
};