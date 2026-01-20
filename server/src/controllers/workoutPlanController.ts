import { Request, Response } from 'express';
import WorkoutPlan from '../models/WorkoutPlan';
import { generateWorkoutPlan } from '../services/openaiService';
import { IUser } from '../models/User';

export const createWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Gather user profile data for the AI
        // In a real app, this might come from a detailed profile or the request body
        const userProfile = {
            name: user.name,
            goal: req.body.goal || (typeof user.fitnessGoals?.[0] === 'string' ? user.fitnessGoals[0] : (user.fitnessGoals?.[0] as any)?.title) || 'General Fitness',
            experience: req.body.experience || 'Intermediate',
            daysAvailable: req.body.daysAvailable || 'Monday, Wednesday, Friday',
            equipment: req.body.equipment || 'Standard Gym'
        };

        // Generate plan using AI
        const { feedback, currentPlan } = req.body;
        const aiResponse = await generateWorkoutPlan(userProfile, feedback, currentPlan);

        // Save to database
        const workoutPlan = new WorkoutPlan({
            user: user._id,
            goal: userProfile.goal,
            duration: '1 week',
            schedule: aiResponse.schedule
        });

        await workoutPlan.save();

        res.status(201).json(workoutPlan);
    } catch (error) {
        console.error('Create workout plan error:', error);
        res.status(500).json({ error: 'Failed to generate workout plan' });
    }
};

export const getWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Get the latest plan
        const workoutPlan = await WorkoutPlan.findOne({ user: user._id })
            .sort({ createdAt: -1 });

        if (!workoutPlan) {
            return res.status(404).json({ error: 'No workout plan found' });
        }

        res.json(workoutPlan);
    } catch (error) {
        console.error('Get workout plan error:', error);
        res.status(500).json({ error: 'Failed to retrieve workout plan' });
    }
};
