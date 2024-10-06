import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8005',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {

            config.headers = {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }
        return config;
    },
    (error) => {
        console.log('axios error', error)
        Promise.reject(error)
    }
)

export default api
