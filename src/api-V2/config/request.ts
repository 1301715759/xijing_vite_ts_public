import axios from 'axios';
import { API_BASE_URL, GLOBAL_HEADERS } from '@/api-V2/config/config';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: GLOBAL_HEADERS,
    timeout: 10000
});

export default instance;