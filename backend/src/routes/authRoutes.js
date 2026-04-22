import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateAuth, handleValidationErrors } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validateAuth, handleValidationErrors, register);
router.post('/login', validateAuth, handleValidationErrors, login);

export default router;
