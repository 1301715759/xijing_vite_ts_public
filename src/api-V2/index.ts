// 统一导出所有API函数
export { fetchBroadcasts } from '@/api-V2/broadcast';
export { fetchFollowOnline } from '@/api-V2/followOnline';
export { fetchSquareNews } from '@/api-V2/squareNews';
export { fetchRoomInfo, fetchRoomListByTag, fetchRoomSeats } from '@/api-V2/interactive';
export { fetchUserInfo, fetchSoundCard } from '@/api-V2/userInfo';

// 统一导出所有类型定义
export type { 
  BroadcastRequestParams,
  FollowOnlineRequestParams,
  SquareNewsRequestParams,
  RoomsByTagRequestParams,
  SoundCardRequestParams
} from '@/api-V2/requestTypes';

// 统一导出所有响应数据类型
export type { 
  BroadcastResponseData,
  FollowOnlineResponseData,
  SquareNewsResponseData,
  RoomListResponseData,
  UserInfoResponseData,
  AppLoginResponseData,
  WxLoginResponseData,
  SoundCardResponseData,
  RoomInfoResponseData,
  RoomSeatsResponseData,
} from '@/types';

// 导出API端点常量
export { API_ENDPOINTS } from '@/api-V2/factory';

// 默认导出一个包含所有API方法的对象
import { fetchBroadcasts } from '@/api-V2/broadcast';
import { fetchFollowOnline } from '@/api-V2/followOnline';
import { fetchSquareNews } from '@/api-V2/squareNews';
import { fetchRoomInfo, fetchRoomListByTag, fetchRoomSeats } from '@/api-V2/interactive';
import { fetchUserInfo, fetchSoundCard } from '@/api-V2/userInfo';
import { wechatLoginQrcode, appLoginQrcode, wxLoginCheck, appLoginCheck } from '@/api-V2/login';


const ApiMethods = {
  fetchBroadcasts,
  fetchFollowOnline,
  fetchSquareNews,
  fetchRoomListByTag,
  fetchRoomInfo,
  fetchRoomSeats,
  fetchUserInfo,
  fetchSoundCard,
  wechatLoginQrcode,
  appLoginQrcode,
  wxLoginCheck,
  appLoginCheck,
};

export default ApiMethods;