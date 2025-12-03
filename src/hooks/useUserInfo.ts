import useFetchList from '@/utils/useFetchList';
import { fetchUserInfo, type UserInfoResponseData, fetchSoundCard, type SoundCardResponseData } from '@/api-V2';
import { type UserInfoRequestParams, type SoundCardRequestParams } from '@/api-V2/requestTypes';




/**
 * 获取用户信息 Hook
 * @param url 接口路径
 * @param defaultParams 默认请求参数
 * @param autoLoad 是否自动加载
 */
export default function useUserInfo(
    url: string,
    defaultParams: UserInfoRequestParams = { mini: 1 },
    autoLoad: boolean = false
) {
    // console.log('@@获取到的接口路径:', url);
    // console.log('@@默认请求参数:', defaultParams);
    // fetchFunction 需要传递 url 和 params
    const fetchFunction = (params: UserInfoRequestParams) => fetchUserInfo(url, params);

    const { dataList, loadData, loading, error } = useFetchList<UserInfoResponseData>(fetchFunction, defaultParams, 'data.data', autoLoad);

    // 自定义加载和错误提示
    async function loadUserInfo(params: UserInfoRequestParams = defaultParams) {
        // console.log('@@请求参数:', params);
        //ElMessage.info(`正在加载用户信息...`);
        await loadData(params);
        if (error.value) {
            console.error('用户信息加载失败:', error.value);
            //ElMessage.error('用户信息加载失败，请稍后重试');
        } else {
            console.log('用户信息数据:', dataList.value);
            //ElMessage.success('用户信息加载成功');

        }
    }
    return {
        dataList,
        loadUserInfo,
        loading,
        error
    }
}
/**
 * 获取语音卡片信息 Hook
 * @param defaultParams 默认请求参数
 * @param autoLoad 是否自动加载
 */
export function useSoundCard(
    defaultParams: SoundCardRequestParams = { id: 0, uid: 0 },
    autoLoad: boolean = false
) {
    // console.log('@@获取到的接口路径:', url);
    // console.log('@@默认请求参数:', defaultParams);
    // fetchFunction 需要传递 url 和 params
    const fetchFunction = (params: SoundCardRequestParams) => fetchSoundCard(params);
    const { dataList, loadData, loading, error, statusCode } = useFetchList<SoundCardResponseData>(fetchFunction, defaultParams, 'data', autoLoad);

    async function loadSoundCard(params: SoundCardRequestParams = defaultParams) {
        // console.log('@@请求参数:', params);
        //ElMessage.info(`正在加载用户信息...`);
        await loadData(params);
        if (error.value) {
            // console.error('语音卡片信息加载失败:', error.value);
            //ElMessage.error('语音卡片信息加载失败，请稍后重试');
        } else {
            if (statusCode.value === 200) {
                console.log('用户%d语音卡片信息数据:', params.uid, dataList.value);
            } else if (statusCode.value === 400) {
                console.log('用户%d语音卡片信息不存在:', params.uid);
            }
            //ElMessage.success('语音卡片信息加载成功');
        }
    }
        return {
        dataList,
        loadSoundCard,
        loading,
        error
    }
    
}
