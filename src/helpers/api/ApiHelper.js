import axios from 'axios';
import Config from 'react-native-config';
import { getAuthToken } from '../../utility/AuthToken';

// Create an Axios instance
const API = axios.create({
    baseURL: Config.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


API.interceptors.request.use(
    async config => {
        const token = await getAuthToken();
        const configHeaders = config.headers;
        if (token) {
            config.headers = {
                ...configHeaders,
                'Authorization': token,
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
// Add a response interceptor
API.interceptors.response.use(
    response => {
        // You can modify the response data here, e.g., handling pagination
        return response.data;
    },
    error => {
        return Promise.reject(error);
    },
);
export default API;