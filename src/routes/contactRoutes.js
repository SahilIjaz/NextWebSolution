import express from 'express';
import { submitContact, getContacts, getContactById, updateContactStatus } from '../controllers/contactController.js';
import { validateContact, handleValidationErrors } from '../utils/validation.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', validateContact, handleValidationErrors, submitContact);
router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContactById);
router.put('/:id/status', authMiddleware, updateContactStatus);

export default router;
