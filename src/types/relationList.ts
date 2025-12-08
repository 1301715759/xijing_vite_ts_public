/**
 * Request
 */
export interface FollowResponseData {
    data: Datum[];
    r: number;
    [property: string]: any;
}

export interface Datum {
    avatar: string;
    avatar_frame: null | string;
    gender: number;
    id: number;
    is_friend: number;
    level: number;
    motto: string;
    nickname: string;
    [property: string]: any;
}