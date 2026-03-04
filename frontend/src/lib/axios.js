import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'https://backend-m88i.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
