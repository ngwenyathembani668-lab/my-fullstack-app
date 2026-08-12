import { Router } from "express";
import {
  registerUser,
  loginUser,
  becomeHost,
} from "../controllers/authController";
import { verifyToken } from "../middleware/auth.js";

const router: Router = Router();

// registers a brand new user account
router.post("/register", registerUser);

// Logs an existing user into the application
router.post("/login", loginUser);

// Upgrades a visitor to also hold the host role
// protected: only logged-in visitors can call the role-switching pipeline
router.post("/become-a-host", verifyToken, becomeHost);

export default router;