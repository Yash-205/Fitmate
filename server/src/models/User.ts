import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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

    // Learner-specific fields
    fitnessGoals?: string[];
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    preferredWorkouts?: string[];

    // Trainer-specific fields
    certifications?: string[];
    specializations?: string[];
    yearsOfExperience?: number;

    // Gym Owner-specific fields
    gymName?: string;
    gymLocation?: string;
    facilities?: string[];

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
