import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    trainerId?: mongoose.Types.ObjectId;
    title: string;
    type: string;
    date: Date;
    duration: number; // in minutes
    status: 'scheduled' | 'completed' | 'missed';
    caloriesBurned?: number;
    notes?: string;
    createdAt: Date;
}

const WorkoutSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'missed'],
        default: 'scheduled',
    },
    caloriesBurned: {
        type: Number,
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
