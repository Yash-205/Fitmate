import { Request, Response } from 'express';
import User from '../models/User';
import { gyms, trainers, learners } from '../data/mockData';
import mongoose from 'mongoose';

import Workout from '../models/Workout';
import Goal from '../models/Goal';

export const seedDatabase = async (req: Request, res: Response) => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Workout.deleteMany({});
        await Goal.deleteMany({});
        console.log('Cleared existing data');

        // Map to store created user IDs: mockId -> realObjectId
        const idMap: Record<string, mongoose.Types.ObjectId> = {};
        const createdUsers: any[] = [];

        // 1. Create Gym Owners (from gyms data)
        console.log('Seeding Gym Owners...');
        for (const gym of gyms) {
            const password = '123456';
            const gymOwner = await User.create({
                name: gym.name,
                email: gym.contactEmail,
                password: password,
                role: 'gymowner',
                avatar: gym.image,
                profileCompleted: true,
                gymName: gym.name,
                gymLocation: gym.location,
                facilities: gym.amenities,
                features: gym.amenities,
                bio: gym.description,
                phone: gym.contactPhone,
                rating: gym.rating,
                reviews: gym.reviews,
                totalMembers: gym.memberCount,
            });
            idMap[gym.id] = gymOwner._id as mongoose.Types.ObjectId;
            createdUsers.push({ role: 'Gym Owner', email: gymOwner.email, password });
        }

        // 2. Create Trainers (from trainers data)
        console.log('Seeding Trainers...');
        for (const trainer of trainers) {
            const password = '123456';
            const trainerUser = await User.create({
                name: trainer.name,
                email: `${trainer.name.toLowerCase().replace(/\s+/g, '.')}@fitmate.com`,
                password: password,
                role: 'trainer',
                avatar: trainer.avatar,
                profileCompleted: true,
                specializations: [trainer.specialty],
                certifications: trainer.certifications,
                yearsOfExperience: trainer.experience,
                bio: trainer.description,
                rating: trainer.rating,
                reviews: trainer.reviews,
                sessionPrice: trainer.sessionPrice,
                availability: trainer.availability,
                gymId: trainer.gymId ? idMap[trainer.gymId] : undefined,
            });
            idMap[trainer.id] = trainerUser._id as mongoose.Types.ObjectId;
            createdUsers.push({ role: 'Trainer', email: trainerUser.email, password });
        }

        // 3. Create Learners (from learners data)
        console.log('Seeding Learners...');
        for (const learner of learners) {
            const password = '123456';
            const learnerUser = await User.create({
                name: learner.name,
                email: learner.email,
                password: password,
                role: 'learner',
                avatar: learner.avatar,
                profileCompleted: true,
                fitnessGoals: learner.goals.map(g => g.title),
                trainerId: learner.trainerId ? idMap[learner.trainerId] : undefined,
                gymId: learner.gymId ? idMap[learner.gymId] : undefined,
                // Add new profile fields with mock data
                age: 20 + Math.floor(Math.random() * 40), // 20-60
                gender: Math.random() > 0.5 ? 'male' : 'female',
                height: 160 + Math.floor(Math.random() * 30), // 160-190 cm
                weight: 60 + Math.floor(Math.random() * 40), // 60-100 kg
                targetWeight: 60 + Math.floor(Math.random() * 30),
                activityLevel: ['sedentary', 'lightly_active', 'moderately_active', 'very_active'][Math.floor(Math.random() * 4)] as any,
                dietaryPreferences: Math.random() > 0.7 ? ['vegetarian'] : [],
                injuries: Math.random() > 0.8 ? ['knee_pain'] : [],
            });
            createdUsers.push({ role: 'Learner', email: learnerUser.email, password });

            // 4. Create Workouts for Learner
            const workoutTypes = ['Strength', 'Cardio', 'Yoga', 'HIIT'];
            const statuses = ['completed', 'completed', 'completed', 'missed', 'scheduled'];

            // Past workouts
            for (let i = 0; i < 5; i++) {
                await Workout.create({
                    userId: learnerUser._id,
                    trainerId: learnerUser.trainerId,
                    title: `${workoutTypes[Math.floor(Math.random() * workoutTypes.length)]} Session`,
                    type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
                    date: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000), // Past dates
                    duration: [30, 45, 60][Math.floor(Math.random() * 3)],
                    status: 'completed',
                    caloriesBurned: Math.floor(Math.random() * 300) + 200,
                });
            }

            // Upcoming workouts
            for (let i = 0; i < 3; i++) {
                await Workout.create({
                    userId: learnerUser._id,
                    trainerId: learnerUser.trainerId,
                    title: `${workoutTypes[Math.floor(Math.random() * workoutTypes.length)]} Session`,
                    type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
                    date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000), // Future dates
                    duration: [30, 45, 60][Math.floor(Math.random() * 3)],
                    status: 'scheduled',
                });
            }

            // 5. Create Goals for Learner
            const goalTitles = ['Weight Loss', 'Muscle Gain', 'Running Distance', 'Consistency'];
            for (let i = 0; i < 2; i++) {
                const target = Math.floor(Math.random() * 20) + 10;
                await Goal.create({
                    userId: learnerUser._id,
                    title: goalTitles[i],
                    currentValue: Math.floor(Math.random() * target),
                    targetValue: target,
                    unit: i === 0 ? 'kg' : (i === 2 ? 'km' : 'days'),
                    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                    status: 'in-progress',
                });
            }
        }

        console.log('Data Imported Successfully!');

        res.status(200).json({
            success: true,
            message: 'Database seeded successfully',
            usersCreated: createdUsers.length,
            users: createdUsers
        });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({
            success: false,
            message: 'Error seeding database',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
