import {  createApiCaller, API_ENDPOINTS } from '@/api-V2/factory';
import type { UserInfoRequestParams } from '@/api-V2/requestTypes';
import type { UserInfoResponseData } from '@/types/userInfo';
import type { SoundCardResponseData } from '@/types/soundCard';
import type { SoundCardRequestParams } from '@/api-V2/requestTypes';

/**
 * 获取用户信息
 * @param params 请求参数
 * @returns 用户信息
 */
export const fetchUserInfo = (userId: string) => createApiCaller<UserInfoResponseData>(API_ENDPOINTS.USER_INFO, userId);

// 导出请求参数类型和响应数据类型
export type { UserInfoRequestParams, UserInfoResponseData };

/**
 * 获取声音卡片信息
 * @param params 请求参数
 * @returns 声音卡片信息
 */
export const fetchSoundCard = createApiCaller<SoundCardResponseData>(API_ENDPOINTS.SOUND_CARD);

export type { SoundCardRequestParams, SoundCardResponseData };
