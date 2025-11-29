<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">扫码登录</h1>
        <div class="login-tabs">
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'app' }"
            @click="switchLoginType('app')"
          >
            <span class="tab-icon">📱</span>
            <span>应用扫码</span>
          </button>
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'wechat' }"
            @click="switchLoginType('wechat')"
          >
            <span class="tab-icon">💬</span>
            <span>微信扫码</span>
          </button>
        </div>
      </div>
      
      <div class="login-content">
        <div class="qrcode-container" v-if="qrcodeData">
          <div class="qrcode-wrapper">
            <img 
              :src="qrcodeImage" 
              alt="登录二维码" 
              class="qrcode-image"
              v-if="qrcodeImage"
            />
            <!-- <div class="qrcode-loading" v-else>
              <div class="loading-spinner"></div>
              <p>{{ qrcodeLoading ? '正在生成二维码...' : '请刷新二维码' }}</p>
            </div>
            <div v-if="qrcodeError" class="qrcode-error">
              <div class="error-icon">⚠️</div>
              <p>{{ qrcodeError }}</p>
            </div> -->
          </div>
          <div class="qrcode-status">
            <p v-if="loginStatus === 'waiting'">请使用{{ loginType === 'app' ? '应用' : '微信' }}扫描上方二维码</p>
            <p v-else-if="loginStatus === 'scanned'">扫描成功，请在手机上确认登录</p>
            <p v-else-if="loginStatus === 'confirmed'">登录成功，正在跳转...</p>
            <p v-else-if="loginStatus === 'expired'">二维码已失效，请刷新重试</p>
          </div>
          <button class="refresh-button" @click="refreshQrcode">
            <span class="refresh-icon">🔄</span>
            <span>刷新二维码</span>
          </button>
        </div>
        
        <div class="login-tips">
          <div class="tip-item">
            <span class="tip-icon">💡</span>
            <span v-if="loginType === 'app'">请使用应用扫描二维码登录</span>
            <span v-else>请使用微信扫描二维码登录</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">🔒</span>
            <span>登录过程安全加密</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useLogin from '@/hooks/useLogin';

// 使用登录Hook
const {
  loginType,
  qrcodeData,
  qrcodeImage,
  loginStatus,
  getQrcode,
  switchLoginType,
  refreshQrcode,
  qrcodeLoading,
  qrcodeError
} = useLogin();

// 组件挂载时获取二维码
onMounted(() => {
  getQrcode();
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bgColor) 0%, var(--surfaceColor) 100%);
  padding: 20px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surfaceColor);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid var(--surfaceAlpha);
}

.login-header {
  padding: 24px 24px 16px;
  text-align: center;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--textColor);
  margin: 0 0 20px 0;
  letter-spacing: 1px;
}

.login-tabs {
  display: flex;
  background: var(--bgColor);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 8px;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--textAlpha);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button.active {
  background: var(--mainColor);
  color: var(--onMainColor);
  box-shadow: 0 2px 8px rgba(42, 79, 109, 0.3);
}

.tab-icon {
  font-size: 18px;
}

.login-content {
  padding: 0 24px 24px;
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.qrcode-wrapper {
  width: 200px;
  height: 200px;
  background: var(--bgColor);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
}

.qrcode-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
}

.qrcode-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--textAlpha);
}

.qrcode-error {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #fef0f0;
  border-radius: 4px;
  color: #f56c6c;
  font-size: 14px;
}

.error-icon {
  margin-right: 5px;
  font-size: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--surfaceAlpha);
  border-top: 3px solid var(--mainColor);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.qrcode-status {
  text-align: center;
  margin-bottom: 16px;
}

.qrcode-status p {
  margin: 0;
  color: var(--textColor);
  font-size: 14px;
  line-height: 1.5;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--mainColor);
  border: none;
  border-radius: 8px;
  color: var(--onMainColor);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-button:hover {
  background: var(--linkColor);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 158, 188, 0.3);
}

.refresh-icon {
  font-size: 16px;
}

.login-tips {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--bgColor);
  border-radius: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--textAlpha);
  font-size: 13px;
}

.tip-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 12px;
  }
  
  .login-card {
    max-width: 100%;
  }
  
  .login-header {
    padding: 20px 20px 12px;
  }
  
  .login-content {
    padding: 0 20px 20px;
  }
  
  .qrcode-wrapper {
    width: 180px;
    height: 180px;
  }
  
  .qrcode-image {
    width: 160px;
    height: 160px;
  }
}
</style>