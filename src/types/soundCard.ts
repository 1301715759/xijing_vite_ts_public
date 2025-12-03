/**
 * Request
 */
export interface SoundCardResponseData {
    id: number;
    recommend_index: number;
    result: Result;
    status: number;
    [property: string]: any;
}

export interface Result {
    comment: string;
    detail: string[];
    piaPartner: string[];
    piaRole: string[];
    qr_code: string;
    role: Role;
    score: Score;
    silence: number;
    unique: number;
    user: User;
    voice: Voice[];
    voice_url: string;
    [property: string]: any;
}

export interface Role {
    bgUrl: string;
    cardAvatar: string;
    cardBgUrl: string;
    gender: number;
    role: string;
    [property: string]: any;
}

export interface Score {
    friend: number;
    love: number;
    loved: number;
    [property: string]: any;
}

export interface User {
    avatar: string;
    gender: number;
    id: number;
    motto: string;
    nickname: string;
    [property: string]: any;
}

export interface Voice {
    color: string;
    isMain: number;
    name: string;
    percent: number;
    [property: string]: any;
}

