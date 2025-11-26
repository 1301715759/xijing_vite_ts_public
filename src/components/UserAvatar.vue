<template>
  <el-popover
    trigger="hover"
    placement="left"
    width="auto"
    :disabled="!validUid"
    :show-after="500"
    @show="onPopoverShow"
    @hide="onPopoverHide"
  >
    <template #reference>
      <img 
        :src="avatarUrl" 
        :alt="altText" 
        :class="avatarClass"
        @error="onImageError"
      />
    </template>
    
    <!-- Popover 内容 -->
    <div class="user-info-popover" v-loading="userInfoLoading">
      <div v-if="userInfoError" class="error-message">
        {{ userInfoError }}
      </div>
      <!-- <div v-else-if="userInfoLoading">
        正在加载用户信息...
      </div> -->
      <div v-else-if="userInfo && Object.keys(userInfo).length > 0">
        <p><strong>UID:</strong> {{ userInfo.id }}</p>
        <p><strong>昵称:</strong> {{ userInfo.nickname }}</p>
        <p><strong>年龄:</strong> {{ userInfo.age_str }}</p>
        <p><strong>签名:</strong> {{ userInfo.motto }}</p>
        <p><strong>性别:</strong> {{ userInfo.gender === 1 ? '男' : '女' }}</p>
        <p><strong>等级:</strong> {{ userInfo.level }}</p>
      </div>
      <div v-else>
        暂无用户信息
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useUserInfo from '@/hooks/useUserInfo';
import type { UserInfoResponseData } from '@/types/userInfo';

// 定义组件props
const props = withDefaults(defineProps<{
  uid?: number;
  avatar?: string;
  nickname?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
}>(), {
  uid: undefined,
  avatar: '',
  nickname: '',
  size: 'medium',
  shape: 'circle'
});

// 计算有效的uid
const validUid = computed(() => props.uid && props.uid > 0);

// 默认头像URL
const defaultAvatar = 'https://via.placeholder.com/50x50.png?text=默认头像';

// 头像URL，优先使用传入的avatar，否则使用默认头像
const avatarUrl = computed(() => props.avatar || defaultAvatar);

// alt文本
const altText = computed(() => props.nickname ? `${props.nickname}的头像` : '用户头像');

// 头像样式类
const avatarClass = computed(() => {
  const classes = ['user-avatar'];
  classes.push(`avatar-${props.size}`);
  classes.push(`avatar-${props.shape}`);
  return classes.join(' ');
});

// 当图片加载失败时使用默认头像
const onImageError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = defaultAvatar;
};

// 使用useUserInfo hook，但不自动加载
const {
  dataList: userInfoData,
  loadUserInfo,
  loading: userInfoLoading,
  error: userInfoError
} = useUserInfo(`/user/info/${props.uid}`, { mini: 1 }, false);

// 提取用户信息，确保类型正确
const userInfo = computed((): UserInfoResponseData | null => {
  // 直接从 userInfoData.value 获取用户信息对象
  if (userInfoData.value && typeof userInfoData.value === 'object' && !Array.isArray(userInfoData.value)) {
    return userInfoData.value as UserInfoResponseData;
  }
  return null;
});

// 当popover显示时加载用户信息
const onPopoverShow = async () => {
  console.log('onPopoverShow triggered');
  // 只有当uid有效时才加载
  if (validUid.value && !userInfoLoading.value) {
    console.log('Loading user info...');
    await loadUserInfo({ mini: 1 });
  }
};

// 当popover隐藏时清空数据
const onPopoverHide = () => {
  console.log('onPopoverHide triggered, clearing user info');
  // 清空用户信息数据，确保下一次悬停时能正确加载
  if (userInfoData.value) {
     userInfoData.value = [] as UserInfoResponseData[];
  }
};
</script>

<style scoped>
.user-avatar {
  cursor: pointer;
  object-fit: cover;
}

.avatar-small {
  width: 30px;
  height: 30px;
}

.avatar-medium {
  width: 40px;
  height: 40px;
}

.avatar-large {
  width: 60px;
  height: 60px;
}

.avatar-circle {
  border-radius: 50%;
}

.avatar-square {
  border-radius: 4px;
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