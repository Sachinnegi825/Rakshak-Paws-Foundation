import express from 'express';
import { createOrder, verifyPayment, getAllDonations } from '../controllers/donationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/', protect, getAllDonations);

export default router;
