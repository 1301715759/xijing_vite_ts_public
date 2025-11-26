/**
 * Request
 */
import type { NewTags } from '@/types/broadcast';
export interface RoomInfoResponseData {
    allow_join_cate: number;
    avatars: null;
    background_anim: string;
    background_anim_top: string;
    background_img_url: string;
    bgm_id: number;
    bgm_is_playing: boolean;
    bgm_mode: number;
    bless: number;
    bless_per: number;
    broadcast_msg_live: boolean;
    broadcaster_cnt: number;
    can_pia: boolean;
    collect_num: number;
    cover_img_url: string;
    covers: null;
    enable_cp: boolean;
    guild_cate: null;
    guild_gift_count_open: boolean;
    guild_id: number;
    guild_type: number;
    has_password: boolean;
    hot_value: number;
    id: number;
    invite_uri: string;
    is_free_broadcast: boolean;
    is_live: boolean;
    is_open_broadcaster_name: boolean;
    is_pin: boolean;
    is_presenter: boolean;
    is_report: boolean;
    is_seller: boolean;
    is_show_clock_in: boolean;
    larp_room_id: number;
    larp_room_status: number;
    locked_broadcast: number;
    manager_count: number;
    managers: Manager[];
    marry_host: null;
    message_level: number;
    mic_room_mode: boolean;
    mode: number;
    mysterious_id: number;
    name: string;
    new_tags: NewTags;
    owner: Owner;
    owner_ext: number;
    pia_level: number;
    pia_levels: PiaLevel[];
    play_texts: null;
    popularity: number;
    popularity_up: number;
    proposal_id: number;
    quick_greet: string;
    recording_status: number;
    room_list_cover_select_text: string;
    rule: string;
    show_tag: string;
    skin: null;
    tag: string;
    top_tags: TopTag[];
    user_count: number;
    welcome: string;
    [property: string]: any;
}

export interface Manager {
    id?: number;
    user?: User;
    [property: string]: any;
}

export interface User {
    avatar: string;
    avatar_frame: string;
    brand_icon: string;
    brand_icon_svga: string;
    bubble_color: number;
    can_whale_bean_gift: boolean;
    charm_level: number;
    charm_level_icon: string;
    chat_bubble: null;
    colorful_nickname: boolean;
    cos_enter_room: string;
    cos_microphone: string;
    exp: number;
    gender: number;
    guild_love_count: number;
    guild_love_count_icon: null;
    guild_role: number;
    icon_buff: string;
    id: number;
    id_icon: string;
    idx: number;
    is_followed: boolean;
    is_mysterious: boolean;
    is_vip: number;
    motto: string;
    mysterious_voice: number;
    nickname: string;
    nickname_color: number;
    nickname_effect_idx: number;
    paipai: string;
    rich_level: number;
    rich_level_icon: string;
    role: string;
    role_text_color: string;
    vip_icon: string;
    [property: string]: any;
}

// export interface NewTags {
//     background_color: string;
//     frame_color: string;
//     icon: string;
//     pag_bg: string;
//     tag: string;
//     text_color: string;
//     [property: string]: any;
// }

export interface Owner {
    avatar: string;
    avatar_frame: string;
    brand_icon: string;
    brand_icon_svga: string;
    bubble_color: number;
    can_whale_bean_gift: boolean;
    charm_level: number;
    charm_level_icon: string;
    chat_bubble: null;
    colorful_nickname: boolean;
    cos_enter_room: string;
    cos_microphone: string;
    exp: number;
    gender: number;
    guild_love_count: number;
    guild_love_count_icon: null;
    guild_role: number;
    icon_buff: string;
    id: number;
    id_icon: string;
    idx: number;
    is_followed: boolean;
    is_mysterious: boolean;
    is_vip: number;
    motto: string;
    mysterious_voice: number;
    nickname: string;
    nickname_color: number;
    nickname_effect_idx: number;
    paipai: string;
    rich_level: number;
    rich_level_icon: string;
    role: string;
    role_text_color: string;
    vip_icon: string;
    [property: string]: any;
}

export interface PiaLevel {
    level: number;
    name: string;
    [property: string]: any;
}

export interface TopTag {
    current_time?: number;
    icon?: string;
    image?: string;
    pc_show?: boolean;
    status?: number;
    text?: string;
    total_time?: number;
    type?: number;
    url?: string;
    [property: string]: any;
}