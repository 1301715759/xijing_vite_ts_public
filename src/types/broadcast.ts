/**
 * 广播消息返回结构体
 */
export interface BroadcastResponseData {
    /**
     * 年龄
     */
    age: number;
    /**
     * 头像路径
     */
    avatar: string;
    /**
     * 多少秒前
     */
    createTime: string;
    ext: null;
    /**
     * 性别
     */
    gender: number;
    /**
     * 唯一标识
     */
    id: number;
    /**
     * 消息内容
     */
    message: string;
    /**
     * 标签样式
     */
    newTags: NewTags;
    /**
     * 座位情况，1为男，2为女
     */
    role: number[];
    /**
     * 房间id
     */
    roomid: number;
    /**
     * 房间模式
     */
    roomMode: number;
    /**
     * 房间标签
     */
    tag: string;
    /**
     * 主题
     */
    theme: string;
    /**
     * 用户id
     */
    uid: number;
    [property: string]: any;
}

/**
 * 标签样式
 */
export interface NewTags {
    /**
     * 标签背景色
     */
    backgroundColor: string;
    /**
     * 标签窗体色
     */
    frameColor: string;
    icon: string;
    pagBg: string;
    /**
     * 标签名称
     */
    tag: string;
    /**
     * 字体颜色
     */
    textColor: string;
    [property: string]: any;
}
export interface MiniBroadcastResponseData {
    
    id: number;
    uid: number;
    gender: number;
    avatar: string;
    message: string;
    room_id: number;
    room_mode: number;
    role: number[];
    creat_time: string;


}


/**
 * 广播消息请求参数结构体
 */
export type BroadcastRequestParams = {
    /**
     * 页码
     */
    page: number;
    /**
     * 是否为pia戏类型
     */
    pia: number
}