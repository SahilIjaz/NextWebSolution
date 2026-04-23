import { body, validationResult } from 'express-validator';

export const validateContact = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('service').notEmpty().withMessage('Service is required'),
  body('budget').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('agreeToTerms').isIn([true, 'true']).withMessage('You must agree to terms')
];

export const validateAuth = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Express-validator errors:');
    errors.array().forEach(err => {
      console.log(`  - ${err.param}: ${err.msg}`);
    });
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  console.log('✅ Express-validator passed');
  next();
};
