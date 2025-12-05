import useFetchList from '@/utils/useFetchList';
import { fetchRoomInfo, fetchRoomSeats, type RoomSeatsResponseData, type RoomInfoResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';
/**
 * 获取房间详情
 * @param roomId 房间ID
 */
export default function useRoomDetail(roomId: string) {

    const { dataList, loadData, loading, error } = useFetchList<RoomInfoResponseData>(fetchRoomInfo(roomId))

    async function loadRoomDetail() {
        await loadData()
        // if (error.value) {
        //     console.error('房间详情加载失败:', error.value);
        //     ElMessage.error('房间详情加载失败，请稍后重试');
        // } else {
        //     console.log('房间详情数据:', dataList.value);
        //     ElMessage.success('房间详情加载成功');
        // }
    }
    return {
        dataList,
        loadRoomDetail,
        loading,
        error
    }
}
/**
 * 获取房间座位详情
 * @param roomId 房间ID
 */
export function useRoomSeats(roomId: string, defaultParams: any = {  }) {
    const { dataList, loadData, loading, error } = useFetchList<RoomSeatsResponseData[]>(fetchRoomSeats(roomId))
    console.log('@@useRoomSeats', roomId);
    async function loadRoomSeats() {
        await loadData()
        if (error.value) {
            console.error('房间座位详情加载失败:', error.value);
            // ElMessage.error('房间座位详情加载失败，请稍后重试');
        } else {
            console.log('房间座位详情数据:', dataList.value);
            // ElMessage.success('房间座位详情加载成功');
        }
    }
    return {
        dataList,
        loadRoomSeats,
        loading,
        error
    }
}
