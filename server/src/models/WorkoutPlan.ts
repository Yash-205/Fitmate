import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkoutPlan extends Document {
    user: mongoose.Types.ObjectId;
    goal: string;
    duration: string;
    schedule: Array<{
        day: string;
        focus: string;
        exercises: Array<{
            name: string;
            sets: string;
            reps: string;
            notes?: string;
        }>;
    }>;
    createdAt: Date;
}

const WorkoutPlanSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    duration: { type: String, default: '1 week' },
    schedule: [{
        day: { type: String, required: true },
        focus: { type: String, required: true },
        exercises: [{
            name: { type: String, required: true },
            sets: { type: String, required: true },
            reps: { type: String, required: true },
            notes: { type: String }
        }]
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkoutPlan>('WorkoutPlan', WorkoutPlanSchema);
