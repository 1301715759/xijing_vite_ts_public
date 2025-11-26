import { API_ENDPOINTS, createApiCaller } from '@/api-V2/factory';
import type { FollowOnlineRequestParams } from '@/api-V2/requestTypes';
import type { FollowOnlineResponseData } from '@/types/followOnline';

/**
 * 获取关注在线数据
 * @param params 请求参数
 * @returns 关注在线数据
 */
export const fetchFollowOnline = createApiCaller<FollowOnlineResponseData>(API_ENDPOINTS.FOLLOW_ONLINE);

// 导出请求参数类型和响应数据类型
export type { FollowOnlineRequestParams, FollowOnlineResponseData };