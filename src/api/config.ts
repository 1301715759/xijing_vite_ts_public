import authconfig from '@/api-V2/config/auth_key.json'
export const API_BASE_URL = 'https://api.aipiaxi.com'

export const GLOBAL_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'User-Agent': 'XI JING/1.9.5 (PC)',
    'App-Type': 'PC',
    'App-Ver': '33800',
    'Authkey': authconfig.Authkey,
    'Authorization': authconfig.Authorization,
};