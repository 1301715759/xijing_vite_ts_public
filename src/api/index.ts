import request from './request';

/**
 * 统一API配置映射
 */
const API_ENDPOINTS = {
  // 广播接口
  BROADCAST: '/interactive/square/broadcast_message',
  // 关注在线接口
  FOLLOW_ONLINE: '/api/v2/follow/track/room',
  // 广场动态接口
  SQUARE_NEWS: '/square/news',
} as const;

// 请求参数类型定义
export interface BroadcastRequestParams {
  page: number;
  pia: number;
}

export interface FollowOnlineRequestParams {
  page: number;
}

export interface SquareNewsRequestParams {
  baike?: string;
  hide_top?: string;
  id?: string;
  order?: string;
  page?: string;
  size?: string;
  topic_dynamic_id?: string;
  type?: string;
}

export interface InteractiveRoomBytagRequestParams {
  tag: string;
  type: number;
  page: number;
  limit: number;
}

// 内部通用调用方法
function internalCallApi(endpoint: string, params?: Record<string, any>, dynamicUrl?: string) {
  const url = dynamicUrl || endpoint;
  return request.get(url, { params });
}

/**
 * 获取广播数据
 */
export function fetchBroadcasts(params: BroadcastRequestParams) {
  return internalCallApi(API_ENDPOINTS.BROADCAST, params);
}

/**
 * 获取关注在线数据
 */
export function fetchFollowOnline(params: FollowOnlineRequestParams) {
  return internalCallApi(API_ENDPOINTS.FOLLOW_ONLINE, params);
}

/**
 * 获取广场动态数据
 */
export function fetchSquareNews(params: SquareNewsRequestParams) {
  return internalCallApi(API_ENDPOINTS.SQUARE_NEWS, params);
}

/**
 * 根据标签获取互动房间数据
 * 注意：这个方法需要传入完整的URL，因为它是动态的
 */
export function interactiveRoomBytag(url: string, params: InteractiveRoomBytagRequestParams) {
  console.log('完整的请求连接:', url, params);
  return internalCallApi('', params, url); // 第一个参数为空，因为使用动态URL
}

// 导出类型定义
// export type {
//   BroadcastRequestParams,
//   FollowOnlineRequestParams,
//   SquareNewsRequestParams,
//   InteractiveRoomBytagRequestParams
// };

// 导出API端点常量
export { API_ENDPOINTS };

// 默认导出一个包含所有API方法的对象，提供更多使用选择
const ApiMethods = {
  fetchBroadcasts,
  fetchFollowOnline,
  fetchSquareNews,
  interactiveRoomBytag
};

export default ApiMethods;