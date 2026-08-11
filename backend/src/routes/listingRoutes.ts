import { Router } from 'express';
import { getAllAccommodations, getAccommodationById } from '../controllers/listingController';

const router: Router = Router();

// This fetches all the accommodations from the database when someone visits the main endpoint.
router.get('/', getAllAccommodations);

// This finds one specific accommodation using the unique ID passed in the URL
router.get('/:id', getAccommodationById);

export default router;
