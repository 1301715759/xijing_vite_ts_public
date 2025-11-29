import { createApiCaller, createDynamicApiCaller, API_ENDPOINTS } from '@/api-V2/factory';
import type { AppLoginResponseData, WxLoginResponseData } from '@/types/qrcodeLogin';
/**
 * 微信登录二维码返回数据
 * @param r 状态码，0表示成功
 * @param data.ticket 二维码唯一ticket标识
 * @param data.url 二维码图片URL
 * 
 */
interface WxQrcodeResponseData {
    r: number;
    data: {
        ticket: string;
        url: string;
    }
}
export const wechatLoginQrcode = createApiCaller<WxQrcodeResponseData>(API_ENDPOINTS.WECHAT_QRCODE);

/**
 * 应用登录二维码返回数据
 * @param image 二维码图片base64编码
 * @param uuid 二维码唯一标识
 */
interface AppQrcodeResponseData {
    image: string;
    uuid: string;
}
export const appLoginQrcode = createApiCaller<AppQrcodeResponseData>(API_ENDPOINTS.APP_QRCODE);

/**
 * 微信登录校验
 * url参考来自ResponseData里data包含的ticket
 * 完整的url示例：
 * https://api.aipiaxi.com/wechat/loginQRcode/43f3bf628a66716a03cf75c892f28ef9
 * 返回数据包含token和用户基础信息
 * 若返回data里包不含ticket字段，则表示登录成功，否则为等待扫码
 */
export const wxLoginCheck = createDynamicApiCaller<WxLoginResponseData>();

/**
 * 应用登录校验
 * url参考来自ResponseData包含的uuid
 * 完整的url示例：
 * https://api.aipiaxi.com/api/v2/qrcode/21a52667-460c-4f8e-adf4-8c18a84cab19
 * 返回数据包含token和用户基础信息
 * 若返回的'status':3 则表示登录成功，1为等待扫码，0为该uuid已经失效
 */
export const appLoginCheck = createDynamicApiCaller<AppLoginResponseData>();


