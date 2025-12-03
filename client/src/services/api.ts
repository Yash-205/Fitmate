import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fitmate-yfrz.onrender.com',
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
