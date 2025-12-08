import { createApiCaller, API_ENDPOINTS } from '@/api-V2/factory';
import { type FollowListRequestParams } from '@/api-V2/requestTypes';
import { type FollowResponseData } from '@/types/relationList';

/**
 * 关注列表接口
 * @param userId 用户ID
 * @param params 关注列表接口的请求参数
 * @returns 关注列表数据
 */
export const fetchFollowList = (userId: string) => createApiCaller<FollowResponseData>(API_ENDPOINTS.FOLLOW_LIST, userId);


export type {
    FollowListRequestParams,
    FollowResponseData,
}