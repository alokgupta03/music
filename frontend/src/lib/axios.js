import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'https://backend-pcxf.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;