import { ref, onMounted, shallowRef } from 'vue';


/**
 * 通用数据列表获取 Hook
 * 
 * @template T - 列表项的数据类型
 * @param fetchFunction - 请求数据的 API 方法，需返回 Promise
 *   @param params 请求参数
 *   @returns Promise<any> 返回的响应数据
 * @param defaultParams - 默认请求参数
 * @param dataPath - 返回数据的层级路径（如 'data' 或 'data.data'），默认为 'data'
 * @param autoLoad - 是否在挂载时自动加载数据，默认为 false
 * @returns 包含响应式数据列表、加载方法、加载状态和错误信息的对象
 * 
 * @example
 * const { dataList, loadData, loading, error } = useFetchList<User>(
 *   fetchUsers, 
 *   { page: 1, size: 10 }, 
 *   'data.data',
 *   true
 * 
 * );
 */
export default function useFetchList<T>(
  fetchFunction: (params: any) => Promise<any>,
  defaultParams: any = {},
  dataPath: string = 'data',
  autoLoad: boolean = false
) {
  /** 响应式数据列表 */
  // const dataList = ref<T[]>([]);
  /** 浅响应式数据列表，适用于大型数据集 */
  const dataList = shallowRef<T[]>([]);
  /** 加载状态 */
  const loading = ref(false);
  /** 错误信息 */
  const error = ref<unknown>(null);

  /**
   * 加载数据方法
   * @param params - 请求参数，默认为 defaultParams
   */
  async function loadData(params = defaultParams) {
    // 设置加载状态
    loading.value = true;
    // 清除之前的错误信息
    error.value = null;
    
    try {
      // 发起请求获取数据
      const response = await fetchFunction(params);
      // 根据 dataPath 路径提取数据
      const data = dataPath.split('.').reduce((obj, key) => obj?.[key], response);
      
      // 类型断言并赋值给响应式数据列表
      dataList.value = data as T[];
    } catch (err) {
      // 捕获并设置错误信息
      error.value = err;
    } finally {
      // 重置加载状态
      loading.value = false;
    }
  }

  // 根据 autoLoad 参数决定是否在组件挂载时自动加载数据
  if (autoLoad) {
    onMounted(() => {
      loadData();
    });
  }

  // 返回包含响应式数据和方法的对象
  return {
    /** 数据列表 */
    dataList,
    /** 加载数据的方法 */
    loadData,
    /** 加载状态 */
    loading,
    /** 错误信息 */
    error,
  };
}