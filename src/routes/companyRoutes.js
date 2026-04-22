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
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// ═══════════════════════════════════════
// COMPANY VALUES ROUTES
// ═══════════════════════════════════════

router.get('/values', getValues);
router.post('/values', authenticate, createValue);
router.delete('/values/:id', authenticate, deleteValue);

// ═══════════════════════════════════════
// TECH STACK ROUTES
// ═══════════════════════════════════════

router.get('/tech-stack', getTechStack);
router.post('/tech-stack', authenticate, createTech);
router.delete('/tech-stack/:id', authenticate, deleteTech);

// ═══════════════════════════════════════
// CONTACT INFO ROUTES
// ═══════════════════════════════════════

router.get('/contact-info', getContactInfo);
router.post('/contact-info', authenticate, createContactMethod);
router.delete('/contact-info/:id', authenticate, deleteContactMethod);

export default router;
