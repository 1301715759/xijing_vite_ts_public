import { API_ENDPOINTS, createApiCaller } from '@/api-V2/factory';
import type { BroadcastRequestParams } from '@/api-V2/requestTypes';
import type { BroadcastResponseData } from '@/types/broadcast';

/**
 * 获取广播数据
 * @param params 请求参数
 * @returns 广播数据
 */
export const fetchBroadcasts = createApiCaller<BroadcastResponseData>(API_ENDPOINTS.BROADCAST);

// 导出请求参数类型和响应数据类型
export type { BroadcastRequestParams, BroadcastResponseData };