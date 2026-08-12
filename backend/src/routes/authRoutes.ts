import { Router } from "express";
import {
  registerUser,
  loginUser,
  becomeHost,
} from "../controllers/authController";

const router: Router = Router();

// registers a brand new user account
router.post("/register", registerUser);

// Logs an existing user into the application
router.post("/login", loginUser);

// Upgrades a visitor to also hold the host role
router.post("/become-a-host", becomeHost);

export default router;