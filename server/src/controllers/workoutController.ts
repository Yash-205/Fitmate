import { Request, Response } from 'express';
import Workout from '../models/Workout';
import { IUser } from '../models/User';

export const logWorkout = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { title, type, duration, calories, notes, date } = req.body;

        if (!title || !type || !duration) {
            return res.status(400).json({ message: 'Title, type, and duration are required' });
        }

        const workout = new Workout({
            userId,
            title,
            type,
            duration,
            calories: calories || 0,
            notes: notes || '',
            date: date || new Date(),
            status: 'completed'
        });

        await workout.save();

        res.status(201).json(workout);
    } catch (error) {
        console.error('Error logging workout:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const scheduleWorkout = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { title, type, duration, date, notes } = req.body;

        if (!title || !type || !duration || !date) {
            return res.status(400).json({ message: 'Title, type, duration, and date are required' });
        }

        const workout = new Workout({
            userId,
            title,
            type,
            duration,
            date: new Date(date),
            notes: notes || '',
            status: 'scheduled'
        });

        await workout.save();

        res.status(201).json(workout);
    } catch (error) {
        console.error('Error scheduling workout:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getWorkouts = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { status } = req.query;

        let query: any = { userId };
        if (status) {
            query.status = status;
        }

        const workouts = await Workout.find(query).sort({ date: -1 });

        res.status(200).json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
