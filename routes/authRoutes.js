import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // Endpoint for user registration
router.post('/login', loginUser); // Endpoint for user login

export default router;
