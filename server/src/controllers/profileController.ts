import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// @desc    Update user role and profile information
// @route   PUT /api/profile/role
// @access  Private
export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        const {
            role,
            phone,
            bio,
            // Learner fields
            fitnessGoals,
            experienceLevel,
            preferredWorkouts,
            // Trainer fields
            certifications,
            specializations,
            yearsOfExperience,
            // Gym Owner fields
            gymName,
            gymLocation,
            facilities
        } = req.body;

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Validate role
        const validRoles = ['learner', 'trainer', 'gymowner'];
        if (!role || !validRoles.includes(role)) {
            res.status(400).json({ message: 'Invalid role. Must be learner, trainer, or gymowner' });
            return;
        }

        // Update common fields
        user.role = role;
        user.phone = phone;
        user.bio = bio;
        user.profileCompleted = true;

        // Update role-specific fields
        if (role === 'learner') {
            user.fitnessGoals = fitnessGoals;
            user.experienceLevel = experienceLevel;
            user.preferredWorkouts = preferredWorkouts;
        } else if (role === 'trainer') {
            user.certifications = certifications;
            user.specializations = specializations;
            user.yearsOfExperience = yearsOfExperience;
        } else if (role === 'gymowner') {
            user.gymName = gymName;
            user.gymLocation = gymLocation;
            user.facilities = facilities;
        }

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            bio: user.bio,
            profileCompleted: user.profileCompleted,
            // Include role-specific fields in response
            ...(role === 'learner' && {
                fitnessGoals: user.fitnessGoals,
                experienceLevel: user.experienceLevel,
                preferredWorkouts: user.preferredWorkouts,
            }),
            ...(role === 'trainer' && {
                certifications: user.certifications,
                specializations: user.specializations,
                yearsOfExperience: user.yearsOfExperience,
            }),
            ...(role === 'gymowner' && {
                gymName: user.gymName,
                gymLocation: user.gymLocation,
                facilities: user.facilities,
            }),
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
