import mongoose from 'mongoose';
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitmate';

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        // Only exit mechanism in dev, in prod let the function fail gracefully or retry
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};
