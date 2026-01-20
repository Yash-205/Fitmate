import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:3001/api' : 'https://fitmate-yfrz.onrender.com/api'),
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateWorkoutPlan = (data: any) => api.post('/workout-plans/generate', data);
export const getWorkoutPlan = () => api.get('/workout-plans/current');

export default api;
