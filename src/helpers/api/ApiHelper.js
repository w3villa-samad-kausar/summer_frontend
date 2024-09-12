import axios from 'axios';
import Config from 'react-native-config';
import { getAuthToken } from '../../utility/AuthToken';
import { resetAuth } from '../../redux/reducers/AuthSlice';
import { store } from '../../redux/store';
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
                'Bearer': token,
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
    async error => {
        if (error.response.status === 400) {
            // Token is invalid or expired, remove it from redux
            store.dispatch(resetAuth()); // reset the auth
        }
        return Promise.reject(error);
    },
);
export default API;