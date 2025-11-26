/**
 * Request
 */
export interface SquareNewsResponseData {
    count: number;
    data: Datum[];
    r: number;
    [property: string]: any;
}

export interface Datum {
    _anonymous: number;
    ad_type?: number;
    ad_url?: string;
    anonymous: number;
    author: DatumAuthor;
    content: string;
    copy_content: string;
    create_time: string;
    dislike: number;
    group_id: number;
    group_name: string;
    /**
     * 热度
     */
    hot: string;
    hot_comment?: HotComment;
    id: number;
    ip_address: null | string;
    is_follow: number;
    is_like: boolean;
    is_new_at: number;
    is_top: number;
    like: number;
    media: Media[];
    news_tag?: string;
    not_recommend: number;
    origin_create_time: string;
    reply: number;
    room_id: number;
    share?: Share;
    share_content?: ShareContent;
    skin: string;
    status: number;
    tag?: Tag[];
    type: number;
    update_time: string;
    view_count: number;
    visibility: Visibility;
    [property: string]: any;
}

export interface DatumAuthor {
    avatar: string;
    avatar_frame: string;
    gender: number;
    icon_buff?: string[];
    id: number;
    level: number;
    nickname: string;
    uid: number;
    [property: string]: any;
}

export interface HotComment {
    author: HotCommentAuthor;
    content: string;
    id: number;
    uid: number;
    [property: string]: any;
}

export interface HotCommentAuthor {
    avatar: string;
    avatar_frame: string;
    gender: number;
    id: number;
    nickname: string;
    [property: string]: any;
}

export interface Media {
    audio?: string;
    height: number;
    id: number;
    type: number;
    url: string;
    width: number;
    [property: string]: any;
}

export interface Share {
    desc: string;
    id: number;
    photo: string;
    title: string;
    type: number;
    url: string;
    [property: string]: any;
}

export interface ShareContent {
    cover: string;
    desc: string;
    icon: string;
    title: string;
    type: string;
    uri: string;
    [property: string]: any;
}

export interface Tag {
    id: number;
    name: string;
    [property: string]: any;
}

export interface Visibility {
    iconDubber: string;
    iconNews: string;
    id: number;
    intro: string;
    isPublic: boolean;
    name: string;
    [property: string]: any;
}