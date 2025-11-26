import useFetchList from '@/utils/useFetchList';
import { fetchUserInfo, type UserInfoResponseData } from '@/api-V2';
import { type UserInfoRequestParams } from '@/api-V2/requestTypes';
import { ElMessage } from 'element-plus';

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


