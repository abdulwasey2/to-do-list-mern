import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Aapka backend URL
});

// Axios Interceptor: Har request ke saath token bhejne ke liye
// Yeh function har API request se pehle run hoga
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;