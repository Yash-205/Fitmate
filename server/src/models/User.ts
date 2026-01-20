import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface Review {
    userId?: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: Date;
}

interface SuccessStory {
    clientName: string;
    achievement: string;
    timeframe: string;
    image: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    avatar?: string;
    role: 'learner' | 'trainer' | 'gymowner' | 'admin' | null;
    phone?: string;
    bio?: string;
    profileCompleted: boolean;

    // Common profile fields
    rating?: number;
    reviews?: Review[];

    // Learner-specific fields
    fitnessGoals?: string[];
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    preferredWorkouts?: string[];
    age?: number;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    height?: number;
    weight?: number;
    targetWeight?: number;
    activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
    dietaryPreferences?: string[];
    injuries?: string[];

    // Trainer-specific fields
    certifications?: string[];
    specializations?: string[];
    yearsOfExperience?: number;
    sessionPrice?: number;
    availability?: string[];
    strengths?: string[];
    successStories?: SuccessStory[];

    // Gym Owner-specific fields
    gymName?: string;
    gymLocation?: string;
    facilities?: string[];
    totalMembers?: number;
    features?: string[];
    gallery?: string[];

    // Relationships
    trainerId?: mongoose.Types.ObjectId;
    gymId?: mongoose.Types.ObjectId;

    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // Password is not required if using OAuth
    },
    googleId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['learner', 'trainer', 'gymowner', 'admin', null],
        default: null,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    // Common profile fields
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    reviews: [{
        userId: String,
        userName: { type: String, required: true },
        userAvatar: String,
        rating: { type: Number, required: true, min: 0, max: 5 },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
    }],
    // Learner-specific fields
    fitnessGoals: [{
        type: String,
    }],
    experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    preferredWorkouts: [{
        type: String,
    }],
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    targetWeight: { type: Number }, // in kg
    activityLevel: {
        type: String,
        enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']
    },
    dietaryPreferences: [{ type: String }],
    injuries: [{ type: String }],
    // Trainer-specific fields
    certifications: [{
        type: String,
    }],
    specializations: [{
        type: String,
    }],
    yearsOfExperience: {
        type: Number,
    },
    sessionPrice: {
        type: Number,
    },
    availability: [{
        type: String,
    }],
    strengths: [{
        type: String,
    }],
    successStories: [{
        clientName: { type: String, required: true },
        achievement: { type: String, required: true },
        timeframe: { type: String, required: true },
        image: { type: String, required: true },
    }],
    // Gym Owner-specific fields
    gymName: {
        type: String,
    },
    gymLocation: {
        type: String,
    },
    facilities: [{
        type: String,
    }],
    totalMembers: {
        type: Number,
    },
    features: [{
        type: String,
    }],
    gallery: [{
        type: String,
    }],
    // Relationships
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    gymId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        next();
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
