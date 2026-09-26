import express from 'express';
import { generateReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect); // Only admin can access reports
router.route('/').get(getReports).post(generateReport);

export default router;
