import useFetchList from '@/utils/useFetchList';
import { fetchFollowOnline, type FollowOnlineRequestParams, type FollowOnlineResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';
export default function useFollowOnline() {
  // 数据层级为 `response.data.data`
  const { dataList, loadData, loading, error } = useFetchList<FollowOnlineResponseData>(fetchFollowOnline, { page: 1 }, 'data.data', true);

  // 自定义加载和错误提示
  async function loadFollowOnline(params: FollowOnlineRequestParams = { page: 1 }) {
    ElMessage.info('正在加载关注在线用户...');
    await loadData(params);
    if (error.value) {
      console.error('关注在线用户加载失败:', error.value);
      ElMessage.error('关注在线用户加载失败，请稍后重试');
    } else {
      console.log('关注在线用户数据:', dataList.value);
      ElMessage.success('关注在线用户加载成功');
    }
  }

  return {
    followOnlineList: dataList,
    loadFollowOnline,
    loading,
    error,
  };
}