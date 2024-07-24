import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Replace with your API URL
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response.data;
    }
)

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
