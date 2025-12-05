/**
 * api-V2 请求参数类型定义文件
 */

/**
 * 广播接口的请求参数
 * @param page 页码
 * @param pia pia
 */
export interface BroadcastRequestParams {
    page: number;
    pia: number;
}

/**
 * 关注在线接口的请求参数
 * @param page 页码
 */
export interface FollowOnlineRequestParams {
    page: number;
}

/**
 * 收藏房间接口的请求参数
 * @param tag 指定类型
 * @param type 房间类型
 * @param page 页码
 * @param limit 每页数量
 */
export interface RoomsByTagRequestParams {
    tag: string;
    type: number;
    page: number;
    limit: number;
}

/**
 * 广场动态接口的请求参数
 * @param baike 非必要
 * @param hide_top 是否隐藏置顶动态，非必要
 * @param id 用户ID
 * @param order 排序方式
 * @param page 页码
 * @param size 每页大小
 * @param topic_dynamic_id 话题动态ID
 * @param type 动态类型
 */
export interface SquareNewsRequestParams {
    baike?: string;
    hide_top?: string;
    id: string;
    order?: string;
    /**
     * 页码
     */
    page?: string;
    size?: string;
    topic_dynamic_id?: string;
    /**
     * 获取动态类型（1，2，7返回类型一致），1为关注列表。2为推荐列表。6是告白列表。7为最新列表。0为指定id下的全部内容，4为带剧本配音动态，5为语音动态
     */
    type: string;
}

/**
 * 用户信息接口的请求参数
 * @param mini 是否为简化版数据
 */
export interface UserInfoRequestParams {
    mini?: number;
    [property: string]: any;
}

/**
 * 声音卡片接口的请求参数
 * @param id 声音卡片ID
 * @param uid 用户ID
 * id和uid二选一，
 */
export interface SoundCardRequestParams {
    id?: number;
    uid?: number;
}