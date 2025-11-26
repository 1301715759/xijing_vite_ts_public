import request from '@/api/request';

/**
 * 广播接口的请求参数
 * @param page 页码
 * @param pia pia
 */
export interface BroadcastRequestParams {
    page: number;
    pia: number;
}

// export function fetchBroadcasts(params: BroadcastRequestParams) {
//     return request.get('/interactive/square/broadcast_message', { params });
// }