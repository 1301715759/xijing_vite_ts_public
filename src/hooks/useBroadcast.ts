import useFetchList from '@/utils/useFetchList';
import { fetchBroadcasts, type BroadcastRequestParams, type BroadcastResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';
import { useSoundCard } from '@/hooks/useUserInfo';
import { watch } from 'vue';
import { type UidSoundCard } from "@/types/userInfo";
import { reactive } from "vue";
/**
 * 获取广播列表 Hook
 * @param defaultParams - 默认请求参数
 * @param autoLoad - 是否自动加载
 * @param loadSoundCard - 是否加载用户声音卡片，默认不加载
 * @returns 包含广播列表、用户声音卡片映射、加载函数、加载状态和错误信息的对象
 */
export default function useBroadcast(
  defaultParams: BroadcastRequestParams = { page: 1, pia: 0 },
  autoLoad: boolean = true,
  loadSoundCard: boolean = false
) {
  const { dataList, loadData, loading, error } = useFetchList<BroadcastResponseData[]>(fetchBroadcasts, defaultParams, 'data', autoLoad);

  const uidSoundCardMap: UidSoundCard = reactive({});
  if (loadSoundCard) {
    watch(dataList, (newData) => {
      if (newData !== undefined) {
        loadSoundCardAsync(newData);
      }
    });
  }

  // 自定义加载和错误提示
  async function loadBroadcasts(params: BroadcastRequestParams = defaultParams) {
    ElMessage.info(`正在加载第${params.page}页广播...`);
    await loadData(params);
    if (error.value) {
      console.error('广播加载失败:', error.value);
      ElMessage.error('广播加载失败，请稍后重试');
    } else {

      console.log('广播数据:', dataList.value);
      ElMessage.success('广播加载成功');
    }
  }
  // 异步加载用户信息
  async function loadSoundCardAsync(broadcastList: BroadcastResponseData[]) {
    for (let item of broadcastList) {
      const {dataList: soundCardList, loadSoundCard: loadSoundCardData} = useSoundCard({id:0, uid: item.uid });
      await loadSoundCardData();
      if (soundCardList.value !== undefined) {
        uidSoundCardMap[item.uid] = soundCardList.value;
        // console.log('用户信息:', uidSoundCardMap[item.uid]);
      }
    }
  }

  return {
    /** 广播列表 */
    broadcastList: dataList,
    /** 用户声音卡片映射 */
    uidSoundCardMap,
    /** 加载广播列表函数 */
    loadBroadcasts,
    loading,
    error,
  };
}