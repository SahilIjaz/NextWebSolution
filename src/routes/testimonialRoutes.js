import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', authMiddleware, createTestimonial);
router.get('/:id', getTestimonialById);
router.put('/:id', authMiddleware, updateTestimonial);
router.delete('/:id', authMiddleware, deleteTestimonial);

export default router;
