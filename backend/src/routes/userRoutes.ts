import { Router } from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController";
import { validate, registerValidation, loginValidation } from "../middleware/validation";

const router: Router = Router();

// registers a brand new user account
router.post("/register", validate(registerValidation), registerUser);

// Logs an existing user into the application
router.post("/login", validate(loginValidation), loginUser);

export default router;