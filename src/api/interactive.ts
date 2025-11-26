import request from '@/api/request';

/**
 * 收藏房间接口的请求参数
 * @param tag 指定类型
 * @param type 房间类型
 * @param page 页码
 * @param limit 每页数量
 */
export interface InteractiveRoomBytagRequestParams {
    tag: string;
    type: number;
    page: number;
    limit: number;
}

/**
 * 房间列表接口
 * @param url 接口路径
 * @param params 请求参数
 */
export function interactiveRoomBytag(url: string, params: InteractiveRoomBytagRequestParams) {
    console.log('完整的请求连接:', url, params);
    return request.get(url, { params });
}