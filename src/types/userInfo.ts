/**
 * Request
 */
// export interface UserInfoResponseData {
//     data: Data;
//     r: number;
//     [property: string]: any;

import type { SoundCardResponseData } from './soundCard';

// }
export type { SoundCardResponseData } from '@/types/soundCard';
export interface UserInfoResponseData {
    age: number;
    age_str: string;
    article_count: number;
    astro: string;
    astro_id: number;
    avatar: string;
    avatar_frame: string;
    avatar_mask: number;
    bg_img: string;
    charm: number;
    charm_info: CharmInfo;
    charm_level: number;
    charm_rank: number;
    chat_bubble_id: number;
    city_id: number;
    city_name: string;
    continue_sign_count: number;
    cos_enter_room: null;
    cos_microphone: null;
    cover: string[];
    created_at: string;
    credit_score: number;
    deleted_at: null;
    email: null;
    exp: number;
    fans_num: number;
    floating_anim: string;
    followed_num: number;
    friends_num: number;
    gender: number;
    gift_recived: null;
    gift_send: null;
    group: null;
    has_dubber_content: number;
    has_info: number;
    has_pa_content: number;
    hot_rank: number;
    id: number;
    is_author: number;
    is_certified: number;
    is_default_info: number;
    is_followed: number;
    is_pa: number;
    is_pia_visible: number;
    is_vip: number;
    level: number;
    medal: Medal;
    motto: string;
    nickname: string;
    paipai: string;
    pia: Pia[];
    qq_bind: boolean;
    qq_nickname: string;
    rich: Rich;
    rich_level: number;
    rich_rank: number;
    tags: string;
    ua_cnt: number;
    username: null;
    vip_icon: string;
    vip_url: string;
    wx_nickname: string;
    [property: string]: any;
}

export interface CharmInfo {
    diff: number;
    image: string;
    level: number;
    name: string;
    value: number;
    [property: string]: any;
}

export interface Medal {
    data: string[];
    total: number;
    [property: string]: any;
}

export interface Pia {
    text: string;
    value: string;
    [property: string]: any;
}

export interface Rich {
    diff: number;
    image: string;
    level: number;
    name: string;
    value: number;
    [property: string]: any;
}

export type UidSoundCard = Record<number, SoundCardResponseData>