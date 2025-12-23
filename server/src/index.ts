import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import { connectDB } from './config/db';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://fitmate-blond.vercel.app',
            process.env.CLIENT_URL || ''
        ].filter(Boolean);

        // Allow Vercel preview URLs (e.g., https://fitmate-*.vercel.app)
        const isVercelPreview = origin && /^https:\/\/fitmate-[a-z0-9-]+\.vercel\.app$/.test(origin);

        if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Database Connection
connectDB();

// Routes
app.use('/api', routes);

// Start server
// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

