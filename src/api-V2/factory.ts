import request from '@/api-V2/config/request';

// API端点配置
export const API_ENDPOINTS = {
  // 广播接口
  BROADCAST: '/interactive/square/broadcast_message',
  // 关注在线接口
  FOLLOW_ONLINE: '/api/v2/follow/track/room',
  // 广场动态接口
  SQUARE_NEWS: '/square/news',
  // 用户信息接口
  USER_INFO: '/user/info/',

  // 声音卡片接口
  SOUND_CARD: '/api/v2/vpc/detail',
  // app二维码接口
  APP_QRCODE: '/api/v2/qrcode',
  // 微信二维码接口
  WECHAT_QRCODE: '/wechat/loginQRcode',
  // 基础房间接口
  Room: '/interactive/room/',
  // 根据标签获取房间列表
  ROOMs_BY_TAG: '/interactive/rooms/by_tag',
  
} as const;

// 通用API调用工厂函数
export function createApiCaller<T>(endpoint: string, urlAppend?: string) {
  const fullEndpoint = `${endpoint}${urlAppend || ''}`;
  // console.log('@@fullEndpoint:', fullEndpoint);
  return (params?: Record<string, any>) => 
    request.get<T>(fullEndpoint, { params });
}

// 特殊处理动态URL的API调用函数
export function createDynamicApiCaller<T>() {
  return (url: string, params?: Record<string, any>) => {
    // console.log('完整的请求连接:', url, params);
    return request.get<T>(url, { params });
  };
}
