import useFetchList from '@/utils/useFetchList';
import { fetchBroadcasts, type BroadcastRequestParams, type BroadcastResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';
/**
 * 获取广播列表 Hook

 */
export default function useBroadcast() {
  const { dataList, loadData, loading, error } = useFetchList<BroadcastResponseData>(fetchBroadcasts, { page: 1, pia: 0 }, 'data', true);

  // 自定义加载和错误提示
  async function loadBroadcasts(params: BroadcastRequestParams = { page: 1, pia: 0 }) {
    ElMessage.info('正在加载广播...');
    await loadData(params);
    if (error.value) {
      console.error('广播加载失败:', error.value);
      ElMessage.error('广播加载失败，请稍后重试');
    } else {
      console.log('广播数据:', dataList.value);
      ElMessage.success('广播加载成功');
    }
  }

  return {
    broadcastList: dataList,
    loadBroadcasts,
    loading,
    error,
  };
}