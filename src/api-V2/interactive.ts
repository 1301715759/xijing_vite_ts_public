import { createDynamicApiCaller } from '@/api-V2/factory';
import type { InteractiveRoomBytagRequestParams } from '@/api-V2/requestTypes';
import type { FollowRoomResponseData } from '@/types/followRooms';

/**
 * 根据标签获取互动房间数据
 * 注意：这个方法需要传入完整的URL，因为它是动态的
 * @param url 接口路径
 * @param params 请求参数
 * @returns 互动房间数据
 */
export const interactiveRoomBytag = createDynamicApiCaller<FollowRoomResponseData>();

// 导出请求参数类型和响应数据类型
export type { InteractiveRoomBytagRequestParams, FollowRoomResponseData };