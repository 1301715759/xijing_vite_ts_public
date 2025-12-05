import useFetchList from '@/utils/useFetchList';
import { fetchSquareNews, type SquareNewsRequestParams, type SquareNewsResponseData } from '@/api-V2';
import { ElMessage } from 'element-plus';


/**
 * 广场动态数据获取 Hook
 * 
 * @returns 包含广场动态列表、加载方法、加载状态和错误信息的对象
 */
export default function useSquareNews(
    defaultParams: SquareNewsRequestParams ,
    autoLoad: boolean = true
) {
  
    const fetchFunction = (params: SquareNewsRequestParams) => fetchSquareNews(params);

    const { dataList, loadData, loading, error } = useFetchList<SquareNewsResponseData>(fetchFunction, defaultParams, 'data.data', autoLoad);
    
    // 自定义加载和错误提示
    async function loadSquareNews(params: SquareNewsRequestParams) {
        ElMessage.info(`正在加载广场动态...${params}`);
        console.log('params', params);
        await loadData(params);
        if (error.value) {
            console.error('广场动态加载失败:', error.value);
            ElMessage.error('广场动态加载失败，请稍后重试');
        } else {
            console.log('广场动态数据:', dataList.value);
            ElMessage.success('广场动态加载成功');
        }
        return dataList.value;
    }

    return {
        squareNewsList: dataList,
        loadSquareNews,
        loading,
        error,
    };
}