import express from 'express';
import { getCampaigns, createCampaign, getCampaignById, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCampaigns).post(protect, createCampaign);
router.route('/:id')
  .get(getCampaignById)
  .put(protect, updateCampaign)
  .delete(protect, deleteCampaign);

export default router;
