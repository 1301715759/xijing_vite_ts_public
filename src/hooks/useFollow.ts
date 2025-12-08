import useFetchList from '@/utils/useFetchList';
import { ElMessage } from 'element-plus';

import { fetchFollowList, type FollowListRequestParams, type FollowResponseData } from '@/api-V2';
/**
 * 关注用户列表
 * 
 * @returns 
 */
export function useFollowList(userId: string, defaultParams: FollowListRequestParams = { page: 1, limit: 20 }) {
  // 数据层级为 `response.data.data`
  const { dataList, loadData, loading, error } = useFetchList<FollowResponseData>(fetchFollowList(userId), defaultParams, 'data.data', true);
  // 自定义加载和错误提示
  async function loadFollowList(params: FollowListRequestParams = defaultParams) {
    ElMessage.info('正在加载关注用户列表...');
    await loadData(params);
    if (error.value) {
      console.error('关注用户列表加载失败:', error.value);
      ElMessage.error('关注用户列表加载失败，请稍后重试');
    } else {
      console.log('关注用户列表数据:', dataList.value);
      ElMessage.success('关注用户列表加载成功');
    }
  }

  return {
    followList: dataList,
    loadFollowList,
    loading,
    error,
  };
}



/**
 * 关注用户在线列表
 * 
 * @returns 
 */
import { fetchFollowOnline, type FollowOnlineRequestParams, type FollowOnlineResponseData } from '@/api-V2';
export  function useFollowOnline() {
  // 数据层级为 `response.data.data`
  const { dataList, loadData, loading, error } = useFetchList<FollowOnlineResponseData[]>(fetchFollowOnline, { page: 1 }, 'data.data', true);

  // 自定义加载和错误提示
  async function loadFollowOnline(params: FollowOnlineRequestParams = { page: 1 }, silent = false) {
    if (!silent) {
      ElMessage.info('正在加载关注在线用户...');
    }
    await loadData(params);
    if (error.value) {
      console.error('关注在线用户加载失败:', error.value);
      if (!silent) {
        ElMessage.error('关注在线用户加载失败，请稍后重试');
      }
    } else {
      console.log('关注在线用户数据:', dataList.value);
      if (!silent) {
        ElMessage.success('关注在线用户加载成功');
      }
    }
  }

  return {
    followOnlineList: dataList,
    loadFollowOnline,
    loading,
    error,
  };
}

