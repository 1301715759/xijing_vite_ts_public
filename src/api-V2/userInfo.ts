import { createDynamicApiCaller } from '@/api-V2/factory';
import type { UserInfoRequestParams } from '@/api-V2/requestTypes';
import type { UserInfoResponseData } from '@/types/userInfo';

/**
 * 获取用户信息
 * @param params 请求参数
 * @returns 用户信息
 */
export const fetchUserInfo = createDynamicApiCaller<UserInfoResponseData>();

// 导出请求参数类型和响应数据类型
export type { UserInfoRequestParams, UserInfoResponseData };
