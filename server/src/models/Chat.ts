import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    sender: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
    read: boolean;
}

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    messages: IMessage[];
    lastMessage: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSchema: Schema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        }
    }],
    lastMessage: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure only 2 participants per chat for now
ChatSchema.pre<IChat>('save', function (next) {
    if (this.participants.length !== 2) {
        next(new Error('Chat must have exactly 2 participants'));
    } else {
        next();
    }
});

export default mongoose.model<IChat>('Chat', ChatSchema);
