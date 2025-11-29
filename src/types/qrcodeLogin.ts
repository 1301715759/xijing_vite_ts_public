/**
 * Request
 */
export interface AppLoginResponseData {
    avatar: string;
    gender: number;
    id: number;
    im_token: string;
    level: number;
    motto: string;
    nickname: string;
    status: number;
    token: string;
    [property: string]: any;
}

export interface WxLoginResponseData {
    data: LoginData;
    r: number;
    [property: string]: any;
}

export interface LoginData {
    age: number;
    age_str: string;
    article_count: number;
    astro: string;
    astro_id: number;
    avatar: string;
    avatar_frame: null;
    avatar_mask: number;
    bg_img: string;
    birth: string;
    charm: number;
    charm_level: number;
    chat_bubble_id: number;
    city_id: number;
    city_name: null;
    cos_enter_room: null;
    cos_microphone: null;
    cover: string[];
    credit_score: number;
    deleted_at: null;
    email: null;
    exp: number;
    ext: null;
    fans_num: number;
    followed_num: number;
    friends_num: number;
    gender: number;
    gift_recived: null;
    gift_send: null;
    group: null;
    guide: number;
    guide_quickjoin: number;
    has_info: number;
    has_voice_drift: number;
    id: number;
    im_token: string;
    is_author: number;
    is_certified: number;
    is_default_info: number;
    is_pa: number;
    is_vip: number;
    level: number;
    month_card_expired: null;
    motto: string;
    nickname: string;
    open_new_home: boolean;
    paipai: string;
    phone: string;
    province_name: null;
    rich_level: number;
    tags: string;
    token: string;
    unionid: string;
    username: null;
    wx_nickname: string;
    [property: string]: any;
}