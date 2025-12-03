import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, (user._id as unknown as string));
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileCompleted: user.profileCompleted,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: IUser, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid credentials' });
        }

        generateToken(res, (user._id as unknown as string));

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profileCompleted: user.profileCompleted,
        });
    })(req, res, next);
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = (req: Request, res: Response) => {
    const user = req.user as IUser;
    generateToken(res, (user._id as unknown as string));
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    if (user.role == null) {
        res.redirect(`${clientUrl}/role-selection`);
    }
    else {
        res.redirect(clientUrl); // Redirect to frontend
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
    const user = req.user as IUser;

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profileCompleted: user.profileCompleted,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
