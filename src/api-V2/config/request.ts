import axios from 'axios';
import { API_BASE_URL, GLOBAL_HEADERS } from '@/api-V2/config/config';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: GLOBAL_HEADERS,
    timeout: 10000
});

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        // 如果是400错误，不抛出异常，而是返回响应对象
        if (error.response && error.response.status === 400) {
            console.warn('收到400响应，但不抛出异常:', error.response.data);
            return error.response;
        }
        
        // 其他错误继续抛出
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 添加请求拦截器，用于捕获网络错误
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // 捕获请求配置错误
        console.warn('请求配置错误:', error);
        return Promise.reject(error);
    }
);

// 全局错误处理，防止未捕获的Promise错误显示在控制台
window.addEventListener('unhandledrejection', (event) => {
    // 检查是否是axios请求错误
    if (event.reason && event.reason.response && event.reason.response.status === 400) {
        console.warn('捕获到未处理的400错误:', event.reason);
        event.preventDefault(); // 阻止错误显示在控制台
    }
});

export default instance;