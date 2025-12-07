import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    currentValue: number;
    targetValue: number;
    unit: string;
    deadline: Date;
    status: 'in-progress' | 'achieved' | 'failed';
    createdAt: Date;
}

const GoalSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    currentValue: {
        type: Number,
        required: true,
        default: 0,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['in-progress', 'achieved', 'failed'],
        default: 'in-progress',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IGoal>('Goal', GoalSchema);
