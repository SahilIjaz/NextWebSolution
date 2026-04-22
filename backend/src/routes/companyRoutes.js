import express from 'express';
import {
  getValues,
  createValue,
  deleteValue,
  getTechStack,
  createTech,
  deleteTech,
  getContactInfo,
  createContactMethod,
  deleteContactMethod
} from '../controllers/companyController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ═══════════════════════════════════════
// COMPANY VALUES ROUTES
// ═══════════════════════════════════════

router.get('/values', getValues);
router.post('/values', authMiddleware, createValue);
router.delete('/values/:id', authMiddleware, deleteValue);

// ═══════════════════════════════════════
// TECH STACK ROUTES
// ═══════════════════════════════════════

router.get('/tech-stack', getTechStack);
router.post('/tech-stack', authMiddleware, createTech);
router.delete('/tech-stack/:id', authMiddleware, deleteTech);

// ═══════════════════════════════════════
// CONTACT INFO ROUTES
// ═══════════════════════════════════════

router.get('/contact-info', getContactInfo);
router.post('/contact-info', authMiddleware, createContactMethod);
router.delete('/contact-info/:id', authMiddleware, deleteContactMethod);

export default router;
