import useFetchList from '@/utils/useFetchList';
import { fetchRoomListByTag, type RoomsByTagRequestParams, type RoomListResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';

/**
 * 获取收藏房间列表 Hook
 * @param url 接口路径
 * @param defaultParams 默认请求参数
 * @param autoLoad 是否自动加载
 */
export default function useRoomsByTag(
  defaultParams: RoomsByTagRequestParams = { page: 1, limit: 20, tag: '收藏', type: 0 },
  autoLoad: boolean = false
) {
  // console.log('@@获取到的接口路径:', url);
  // console.log('@@默认请求参数:', defaultParams);
  // fetchFunction 需要传递 url 和 params
  

  const { dataList, loadData, loading, error } = useFetchList<RoomListResponseData[]>(fetchRoomListByTag, defaultParams, 'data', autoLoad);

  // 自定义加载和错误提示
  async function loadRoomsByTag(params: RoomsByTagRequestParams = defaultParams) {
    // console.log('@@请求参数:', params);
    ElMessage.info(`正在加载${params.tag}房间列表...`);
    await loadData(params);
    if (error.value) {
      console.error('房间列表加载失败:', error.value);
      ElMessage.error('房间列表加载失败，请稍后重试');
    } else {
      console.log(`${params.tag}房间列表数据:`, dataList.value);
      ElMessage.success(`${params.tag}房间列表加载成功`);
    }
  }

  return {
    followRoomList: dataList,
    loadRoomsByTag,
    loading,
    error,
  };
}