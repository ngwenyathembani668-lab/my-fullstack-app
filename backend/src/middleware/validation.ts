import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

// runs all the validation rules and sends back a clean 400 if anything fails
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Validation failed", errors: errors.array() });
      return;
    }

    next();
  };
};

// rules for creating a brand new user account
export const registerValidation: ValidationChain[] = [
  body("name").trim().notEmpty().withMessage("A name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

// rules for logging an existing user in
export const loginValidation: ValidationChain[] = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("A password is required"),
];

// rules for creating a new accommodation listing
export const createAccommodationValidation: ValidationChain[] = [
  body("title").trim().notEmpty().withMessage("A title is required"),
  body("description").trim().notEmpty().withMessage("A description is required"),
  body("images").isArray({ min: 1 }).withMessage("At least one image is required"),
  body("type").trim().notEmpty().withMessage("Accommodation type is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("guests").isInt({ min: 1 }).withMessage("Maximum guest capacity is required"),
  body("bedrooms").isInt({ min: 0 }).withMessage("Number of bedrooms is required"),
  body("bathrooms").isInt({ min: 0 }).withMessage("Number of bathrooms is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price per night is required"),
];

// rules for creating a new booking
export const createReservationValidation: ValidationChain[] = [
  body("listingId").isMongoId().withMessage("A valid listing id is required"),
  body("checkInDate").isISO8601().withMessage("A valid check-in date is required"),
  body("checkOutDate").isISO8601().withMessage("A valid check-out date is required"),
  body("totalPrice").isFloat({ min: 0 }).withMessage("A valid total price is required"),
];