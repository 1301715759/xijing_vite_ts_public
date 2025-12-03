<template>
  <div class="anime-login-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-sparkles">
        <div class="sparkle sparkle-1"></div>
        <div class="sparkle sparkle-2"></div>
        <div class="sparkle sparkle-3"></div>
        <div class="sparkle sparkle-4"></div>
        <div class="sparkle sparkle-5"></div>
      </div>
    </div>
    
    <!-- 主要内容 -->
    <div class="login-wrapper">
      <div class="login-card">
        <!-- 选项卡切换 -->
        <div class="login-tabs">
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'app' }"
            @click="switchLoginType('app')"
          >
            <span class="tab-text">应用登录</span>
          </button>
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'wechat' }"
            @click="switchLoginType('wechat')"
          >
            <span class="tab-text">微信登录</span>
          </button>
        </div>
        
        <!-- 二维码区域 -->
        <div class="qrcode-section">
          <div class="qrcode-frame">
            <div class="qrcode-container">
              <img 
                :src="qrcodeImage" 
                alt="登录二维码" 
                class="qrcode-image"
                v-if="qrcodeImage"
              />
              <div class="qrcode-overlay" v-if="loginStatus === 'expired'">
                <div class="expired-text">二维码已失效</div>
              </div>
            </div>
          </div>
          
          <!-- 刷新按钮 -->
          <button class="refresh-btn" @click="refreshQrcode">
            <div class="refresh-icon"></div>
            <span>刷新二维码</span>
          </button>
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
/* 二次元风格登录页面 */
.anime-login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  font-family: 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #D8FA00;
  top: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite;
}

.circle-2 {
  width: 250px;
  height: 250px;
  background: #ff6b6b;
  bottom: -80px;
  right: -80px;
  animation: float 10s ease-in-out infinite reverse;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: #4ecdc4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.25; }
}

/* 闪光效果 */
.bg-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: twinkle 3s infinite;
}

.sparkle-1 { top: 20%; left: 15%; animation-delay: 0s; }
.sparkle-2 { top: 30%; left: 70%; animation-delay: 0.5s; }
.sparkle-3 { top: 60%; left: 25%; animation-delay: 1s; }
.sparkle-4 { top: 75%; left: 60%; animation-delay: 1.5s; }
.sparkle-5 { top: 40%; left: 85%; animation-delay: 2s; }

@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

/* 主要内容区域 */
.login-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 选项卡切换 */
.login-tabs {
  display: flex;
  margin-bottom: 30px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 4px;
}

.tab-button {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  color: #666;
  font-size: 15px;
}

.tab-button.active {
  background: #fff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tab-text {
  position: relative;
  z-index: 1;
}

/* 二维码区域 */
.qrcode-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-frame {
  position: relative;
  margin-bottom: 25px;
  padding: 15px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.qrcode-container {
  position: relative;
  width: 220px;
  height: 220px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.qrcode-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.expired-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

/* 刷新按钮 */
.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #D8FA00, #b8d600);
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(216, 250, 0, 0.3);
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(216, 250, 0, 0.4);
}

.refresh-btn:active {
  transform: translateY(0);
}

.refresh-icon {
  width: 18px;
  height: 18px;
  position: relative;
}

.refresh-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-wrapper {
    padding: 15px;
  }
  
  .login-card {
    padding: 20px;
  }
  
  .qrcode-container {
    width: 200px;
    height: 200px;
  }
  
  .qrcode-image {
    width: 180px;
    height: 180px;
  }
}
</style>