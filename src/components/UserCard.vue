<!-- UserCard.vue -->
<template>
  <div class="user-card" >
    <!-- 骨架屏占位 -->
    <template v-if="loading || !userData || Object.keys(userData).length === 0">
      <div class="skeleton-header">
        <div class="skeleton-text">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
      <div class="skeleton-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </template>

    <!-- 实际内容 -->
    <template v-else>
      <div class="user-header">
        <div class="user-basic-info">
          <h3>{{ userData.nickname }}</h3>
          <p>UID: {{ userData.id }}</p>
        </div>
      </div>
      <div class="user-details">
        <p><strong>年龄:</strong> {{ userData.age_str }}</p>
        <p><strong>签名:</strong> {{ userData.motto }}</p>
        <p><strong>性别:</strong> {{ userData.gender === 1 ? '男' : '女' }}</p>
        <p><strong>等级:</strong> {{ userData.level }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import useUserInfo from '@/hooks/useUserInfo'
import { useHoveredContextStore } from '@/stores/hoveredContextStore'
import type { UserInfoResponseData } from '@/types/userInfo'



// 使用hoveredContextStore获取当前hovered的用户ID
const hoveredContextStore = useHoveredContextStore()

// 使用useUserInfo hook，传入具体的URL路径
const { dataList, loadUserInfo, loading, error } = useUserInfo(`/user/info/${hoveredContextStore.hoveredUserId}`)
let userData = ref<UserInfoResponseData | null>() as unknown as UserInfoResponseData
// 组件挂载时加载用户数据
// onMounted(async () => {
//   if (hoveredContextStore.hoveredUserId) {
//     try {
//       console.log('hoveredContextStore.hoveredUserId:', hoveredContextStore.hoveredUserId)
//       await loadUserInfo({ mini: 1 })
//     } catch (err) {
//       console.error('Failed to load user info:', err)
//     }
//   }
// })

// 监听 hoveredUserId 的变化，并据此加载用户信息
watch(
  () => hoveredContextStore.hoveredUserId,
  async (newUserId) => {
    if (newUserId) {
      try {
        await loadUserInfo({ mini: 1 })
        userData.value = dataList.value 
      } catch (err) {
        console.error('Failed to load user info:', err)
      }
    }
  },
  { immediate: true } // 立即执行一次（相当于原来 onMounted 的作用）
)


</script>

<style scoped lang="scss">
.user-card {
  min-width: 250px;
  padding: 15px;
}

.user-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.user-basic-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.user-basic-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.user-details p {
  margin: 8px 0;
  font-size: 14px;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  text-align: center;
}

/* 骨架屏样式 */
.skeleton-header,
.skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-text {
  flex: 1;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  width: 100%;

  &.short {
    width: 60%;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>