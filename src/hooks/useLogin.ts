import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import useFetchList from '@/utils/useFetchList';
import { 
  appLoginQrcode, 
  appLoginCheck, 
  wechatLoginQrcode, 
  wxLoginCheck 
} from '@/api-V2/login';
import type { AppLoginResponseData, WxLoginResponseData } from '@/types/qrcodeLogin';
import { ElMessage } from 'element-plus';
import { setCookie } from '@/utils/cookie';

/**
 * 登录数据获取 Hook
 * 负责获取二维码数据和检查登录状态
 */
function useLoginData() {
  const loginType = ref<'app' | 'wechat'>('app'); // 默认为app扫码
  const qrcodeData = ref<any>(null);
  const qrcodeImage = ref<string>('');
  const loginStatus = ref<'waiting' | 'scanned' | 'confirmed' | 'expired'>('waiting');
  let pollingTimer: number | undefined = undefined;
  
  // 使用useFetchList管理二维码数据
  const { dataList: qrcodeList, loadData: loadQrcode, loading: qrcodeLoading, error: qrcodeError } = useFetchList<any>(
    async (params: { type: 'app' | 'wechat' }) => {
      if (params.type === 'app') {
        return await appLoginQrcode();
      } else {
        return await wechatLoginQrcode();
      }
    },
    { type: 'app' },
    'data',
    false
  );

  // 获取二维码
  const getQrcode = async () => {
    try {
      loginStatus.value = 'waiting';
      qrcodeImage.value = '';
      
      // 使用useFetchList的loadData方法获取二维码
      await loadQrcode({ type: loginType.value });

      
      // 现在qrcodeList.value直接是对象，不再是数组
      if (qrcodeList.value) {
        const qrcode = qrcodeList.value;
        qrcodeData.value = qrcode;

        if (loginType.value === 'app') {
          // APP二维码返回的是base64编码的图片
          qrcodeImage.value = `data:image/png;base64,${qrcode.image}`;
          // 开始轮询检查登录状态
          // 注意：这里不直接调用startPolling，而是在useLogin中处理
        } else {
          // 微信二维码返回的是图片URL，数据结构为response.data.data.url
          qrcodeImage.value = qrcode.data?.url || qrcode.url;
          // 开始轮询检查登录状态
          // 注意：这里不直接调用startPolling，而是在useLogin中处理
        }
      }
    } catch (error) {
      console.error('获取二维码失败:', error);
      ElMessage.error('获取二维码失败，请重试');
    }
  };

  // 开始轮询检查登录状态
  const startPolling = (identifier: string, onLoginSuccess?: (userData: AppLoginResponseData | any) => void) => {
    // 清除之前的轮询
    if (pollingTimer !== undefined) {
      clearInterval(pollingTimer);
    }
    
    // 设置轮询，每2秒检查一次
    pollingTimer = window.setInterval(async () => {
      try {
        let response;
        
        if (loginType.value === 'app') {
          // APP登录检查
          const url = `/api/v2/qrcode/${identifier}`;
          response = await appLoginCheck(url);
          
          if (response.data.status === 3) {
            // 登录成功
            loginStatus.value = 'confirmed';
            if (pollingTimer !== undefined) {
              clearInterval(pollingTimer);
            }
            // 调用登录成功回调
            if (onLoginSuccess) {
              onLoginSuccess(response.data);
            }
          } else if (response.data.status === 0) {
            // 二维码已失效
            loginStatus.value = 'expired';
            if (pollingTimer !== undefined) {
              clearInterval(pollingTimer);
            }
          }
        } else {
          // 微信登录检查
          const url = `/wechat/loginQRcode/${identifier}`;
          response = await wxLoginCheck(url);
          
          if (response.data.data.token) {
            // 登录成功
            loginStatus.value = 'confirmed';
            if (pollingTimer !== undefined) {
              clearInterval(pollingTimer);
            }
            // 调用登录成功回调
            if (onLoginSuccess) {
              onLoginSuccess(response.data.data);
            }
          }
        }
      } catch (error) {
        console.error('检查登录状态失败:', error);
      }
    }, 2000);
  };

  // 切换登录类型
  const switchLoginType = (type: 'app' | 'wechat') => {
    if (loginType.value !== type) {
      loginType.value = type;
      // 清除之前的轮询
      if (pollingTimer !== undefined) {
        clearInterval(pollingTimer);
      }
      // 获取新的二维码
      getQrcode();
    }
  };

  // 刷新二维码
  const refreshQrcode = () => {
    // 清除之前的轮询
    if (pollingTimer !== undefined) {
      clearInterval(pollingTimer);
    }
    // 获取新的二维码
    getQrcode();
  };

  // 组件卸载时清除轮询
  onUnmounted(() => {
    if (pollingTimer !== undefined) {
      clearInterval(pollingTimer);
    }
  });

  return {
    loginType,
    qrcodeData,
    qrcodeImage,
    loginStatus,
    getQrcode,
    switchLoginType,
    refreshQrcode,
    qrcodeLoading,
    qrcodeError,
    startPolling
  };
}

/**
 * 登录处理 Hook
 * 负责处理登录成功后的逻辑，如存储用户信息和跳转
 */
function useLoginHandler() {
  const router = useRouter();

  // 处理登录成功
  const handleLoginSuccess = (userData: AppLoginResponseData | any) => {
    console.log('登录成功:', userData);
    
    // 使用cookie存储token，字段名为Authorization
    setCookie('Authorization', userData.token, 7, '/');
    
    // 用户信息仍然使用localStorage存储
    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    // 跳转到主页
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return {
    handleLoginSuccess
  };
}

/**
 * 登录功能 Hook
 * 整合数据获取和登录处理功能
 */
export default function useLogin() {
  const loginData = useLoginData();
  const loginHandler = useLoginHandler();

  // 监听登录状态变化，处理登录成功
  const watchLoginStatus = () => {
    // 这里可以添加监听逻辑，当登录状态变为confirmed时调用handleLoginSuccess
    // 由于startPolling已经返回登录结果，我们可以在那里直接处理
  };

  // 重写getQrcode，使其在获取二维码后启动轮询
  const originalGetQrcode = loginData.getQrcode;
  loginData.getQrcode = async () => {
    await originalGetQrcode();
    
    // 获取二维码后启动轮询
    if (loginData.qrcodeData.value) {
      const qrcode = loginData.qrcodeData.value;
      if (loginData.loginType.value === 'app') {
        // APP登录轮询
        loginData.startPolling(qrcode.uuid, loginHandler.handleLoginSuccess);
      } else {
        // 微信登录轮询
        loginData.startPolling(qrcode.data?.ticket || qrcode.ticket, loginHandler.handleLoginSuccess);
      }
    }
  };

  // 重写switchLoginType，使其在切换类型后获取新二维码
  const originalSwitchLoginType = loginData.switchLoginType;
  loginData.switchLoginType = (type: 'app' | 'wechat') => {
    originalSwitchLoginType(type);
    // 切换类型后获取新二维码
    loginData.getQrcode();
  };

  // 重写refreshQrcode，使其在刷新后获取新二维码
  const originalRefreshQrcode = loginData.refreshQrcode;
  loginData.refreshQrcode = () => {
    originalRefreshQrcode();
    // 刷新后获取新二维码
    loginData.getQrcode();
  };

  return {
    ...loginData,
    ...loginHandler,
    watchLoginStatus
  };
}