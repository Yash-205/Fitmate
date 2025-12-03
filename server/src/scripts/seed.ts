
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import { gyms, trainers, learners } from "../data/mockData";

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fitmate');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

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
                features: gym.amenities, // Same as facilities
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
            });
            createdUsers.push({ role: 'Learner', email: learnerUser.email, password });
        }

        console.log('Data Imported Successfully!');

        console.log('\n--- CREATED USERS CREDENTIALS ---');
        console.table(createdUsers);

        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

seedData();
