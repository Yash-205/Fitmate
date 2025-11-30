import express from 'express';
import passport from 'passport';
import {
    registerUser,
    loginUser,
    logoutUser,
    googleCallback,
    getUserProfile,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Google Auth
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleCallback
);

// Protected Route
router.get('/profile', protect, getUserProfile);

export default router;
