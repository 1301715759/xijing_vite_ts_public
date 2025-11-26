import request from '@/api/request';

/**
 * 关注在线接口的请求参数
 * @param page 页码
 */
export interface FollowOnlineRequestParams {
    page: number;
}

export function fetchFollowOnline(params: FollowOnlineRequestParams) {
    return request.get('/api/v2/follow/track/room', { params });
}