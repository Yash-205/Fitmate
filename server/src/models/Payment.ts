import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;
    gymId: mongoose.Types.ObjectId; // The gym receiving the money
    amount: number;
    currency: string;
    type: 'membership' | 'class' | 'personal_training' | 'product';
    status: 'paid' | 'pending' | 'failed';
    date: Date;
    description?: string;
}

const PaymentSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gymId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    type: {
        type: String,
        enum: ['membership', 'class', 'personal_training', 'product'],
        required: true,
    },
    status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'paid',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: String,
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
