import express from 'express';
import {
  getServices,
  getPricingPlans,
  createService,
  createPricingPlan,
  updateService,
  updatePricingPlan,
  deleteService,
  deletePricingPlan
} from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/services', getServices);
router.post('/services', authMiddleware, createService);
router.put('/services/:id', authMiddleware, updateService);
router.delete('/services/:id', authMiddleware, deleteService);

router.get('/pricing', getPricingPlans);
router.post('/pricing', authMiddleware, createPricingPlan);
router.put('/pricing/:id', authMiddleware, updatePricingPlan);
router.delete('/pricing/:id', authMiddleware, deletePricingPlan);

export default router;
