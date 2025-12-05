import { createApiCaller, API_ENDPOINTS } from '@/api-V2/factory';
import type { RoomsByTagRequestParams } from '@/api-V2/requestTypes';
import type { RoomListResponseData } from '@/types/followRooms';
import type { RoomSeatsResponseData, RoomInfoResponseData } from '@/types/roomInfo';

/**
 * 获取房间信息详情
 * @param roomId 房间ID
 * @returns 互动房间详情数据
 */
export const fetchRoomInfo = (roomId: string) => createApiCaller<RoomInfoResponseData>(API_ENDPOINTS.Room, roomId);

/**
 * 获取房间座位信息详情，需要Url拼接
 * @param roomId 房间ID
 * @returns 互动房间座位信息数据
 */
export const fetchRoomSeats = (roomId: string,) => createApiCaller<RoomSeatsResponseData>(API_ENDPOINTS.Room, roomId+'/broadcasters');

/**
 * 根据标签获取房间列表
 * @param params 请求参数
 * @returns 互动房间列表数据
 */
export const fetchRoomListByTag = createApiCaller<RoomListResponseData>(API_ENDPOINTS.ROOMs_BY_TAG);

/**
 * 获取
 */
export type { 
    RoomsByTagRequestParams, 
    RoomListResponseData,
    RoomSeatsResponseData,
    RoomInfoResponseData,
};

