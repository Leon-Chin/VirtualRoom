import { message as $message } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8088/vcr',
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    config => {
        return config?.data;
    },
    error => {
        let errorMessage = 'error';

        if (error?.message?.includes('Network Error')) {
            errorMessage = 'network connection error!';
        } else {
            errorMessage = error?.message;
        }
        error.message && $message.error(errorMessage);

        return {
            status: false,
            message: errorMessage,
            result: null,
        };
    },
);

export const request = (method, url, data, config) => {
    switch (method) {
        case 'post':
            return axiosInstance.post(url, data, config);
        case 'get':
            return axiosInstance.get(url, { params: data, ...config });
        case 'delete':
            return axiosInstance.delete(url, { params: data, ...config });
        case 'put':
            return axiosInstance.put(url, data, config);
        default:
            break;
    }
};