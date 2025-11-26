<template>
  <el-popover
    trigger="hover"
    placement="right"
    width="auto"
    :disabled="!validUid"
  >
    <template #reference>
      <slot>
        <!-- <img v-if="avatar" :src="avatar" alt="avatar" class="user-avatar" /> -->
        <!-- <div v-else class="default-avatar">默认头像</div> -->
      </slot>
    </template>
    <div class="user-info-popover" v-loading="loading">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-else-if="userData && Object.keys(userData).length > 0">
        <p><strong>UID:</strong> {{ userData.id }}</p>
        <p><strong>昵称:</strong> {{ userData.nickname }}</p>
        <p><strong>年龄:</strong> {{ userData.age_str }}</p>
        <p><strong>签名:</strong> {{ userData.motto }}</p>
      </div>
      <div v-else>
        暂无用户信息
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import useUserInfo from '@/hooks/useUserInfo';

// 定义组件props
const props = defineProps<{
  uid?: number;
  index?: number;
  [key: string]: any;
}>();

// 计算有效的uid
const validUid = computed(() => props.uid && props.uid > 0);

// 只有当uid有效时才初始化用户信息hook
let loadDataFunction: Function | null = null;
let loadingRef: any = null;
let errorRef: any = null;
let dataListRef: any = null;

if (validUid.value) {
  // 初始化用户信息hook，但不自动加载
  const { dataList, loadUserInfo, loading, error } = useUserInfo(
    `/user/info/${props.uid}`,
    { mini: 1 },
    false
  );
  
  loadDataFunction = loadUserInfo;
  loadingRef = loading;
  errorRef = error;
  dataListRef = dataList;
}

// 计算属性获取用户信息
const userData = computed(() => {
  if (dataListRef && dataListRef.value && dataListRef.value.length > 0) {
    return dataListRef.value[0].data || {};
  }
  return {};
});

// 计算属性获取加载状态
const loading = computed(() => {
  return loadingRef ? loadingRef.value : false;
});

// 计算属性获取错误信息
const error = computed(() => {
  return errorRef ? errorRef.value : null;
});

// 当uid变化时重新加载用户信息
watch(
  () => props.uid,
  async (newUid) => {
    if (newUid && newUid > 0 && loadDataFunction) {
      try {
        await loadDataFunction({ mini: 1 });
      } catch (err) {
        console.error('加载用户信息失败:', err);
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.default-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.user-info-popover {
  min-width: 200px;
  padding: 10px;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
}
</style>