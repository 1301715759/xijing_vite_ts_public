import request from '@/api/request';
/**
 * 广场动态接口的请求参数
 * @param type *必要属性，获取动态类型
 *  1，2，7返回类型一致），1为关注列表。2为推荐列表。6是告白列表。7为最新列表。0为指定id下的全部内容，4为带剧本配音动态，5为语音动态
 * @param id *必要属性，是否指定用户id，为0时不指定用户id，其他数字表示指定用户id
 * 仅在type = 0时指定用户id有效果，其他时刻不生效建议设定为0
 */
export interface SquareNewsRequestParams {
    baike: string;
    hide_top: string;
    id: string;
    order: string;
    /**
     * 页码
     */
    page: string;
    size: string;
    topic_dynamic_id: string;
    /**
     * 获取动态类型（1，2，7返回类型一致），1为关注列表。2为推荐列表。6是告白列表。7为最新列表。0为指定id下的全部内容，4为带剧本配音动态，5为语音动态
     */
    type: string;

}

export function fetchSquareNews(params: SquareNewsRequestParams) {
    return request.get('/square/news', { params });
}