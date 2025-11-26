import { API_ENDPOINTS, createApiCaller } from '@/api-V2/factory';
import type { SquareNewsRequestParams } from '@/api-V2/requestTypes';
import type { SquareNewsResponseData } from '@/types/squareNews';

/**
 * 获取广场动态数据
 * @param params 请求参数
 * @returns 广场动态数据
 */
export const fetchSquareNews = createApiCaller<SquareNewsResponseData>(API_ENDPOINTS.SQUARE_NEWS);

// 导出请求参数类型和响应数据类型
export type { SquareNewsRequestParams, SquareNewsResponseData };