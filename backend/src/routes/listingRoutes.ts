import { Router } from 'express';
import {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} from '../controllers/listingController';
import { verifyToken, requireHost } from '../middleware/auth';
import { validate, createAccommodationValidation } from '../middleware/validation';

const router: Router = Router();

// This fetches all the accommodations from the database when someone visits the main endpoint.
router.get('/', getAllAccommodations);

// This finds one specific accommodation using the unique ID passed in the URL
router.get('/:id', getAccommodationById);

// Protected: lets a host create a brand new listing
router.post('/', verifyToken, requireHost, validate(createAccommodationValidation), createAccommodation);

// Protected: lets a host update their own listing
router.put('/:id', verifyToken, requireHost, validate(createAccommodationValidation), updateAccommodation);

// Protected: lets a host delete their own listing
router.delete('/:id', verifyToken, requireHost, deleteAccommodation);

export default router;