<!-- PopoverCard.vue -->
<template>
  <el-popover
    placement="left"
    trigger="hover"
    width="300px"
    style="min-height: 200px; "
    :show-after="500"
    destroy-on-close
    @show="onPopoverShow"
    @hide="onPopoverHide"
  >
    <template #reference>
      <slot><img :src="img" 
        :alt="cardType === 'user' ? '用户头像' : '房间头像'" 
        :class="[size, {'male': gender === 1, 'female': gender === 2}, placeholder]"  
        /></slot>
    </template>
    
    <!-- 内部容器加上 min-height -->
    <div style="min-width: 250px; min-height: 200px;">
          <!-- 根据卡片类型显示不同的内容 -->
      <UserCard v-if="popoverVisible && cardType === 'user'" />
      <RoomCard v-else-if="cardType === 'room'" />
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserCard from './UserCard.vue'
import RoomCard from './RoomCard.vue'
import { useHoveredContextStore } from '@/stores/hoveredContextStore'

interface Props {
  cardType: 'user' | 'room'
  id: number
  img: string
  size?: 'large' | 'medium' | 'small'
  gender?: number
  placeholder?: string
}

const props = defineProps<Props>()
const hoveredContextStore = useHoveredContextStore()
const popoverVisible = ref(false)
const onPopoverShow = () => {
  popoverVisible.value = true
  // 设置对应的ID到store中
  if (props.cardType === 'user' && props.id) {
    hoveredContextStore.setHoveredUserId(props.id)
  } else if (props.cardType === 'room' && props.id) {
    hoveredContextStore.setHoveredRoomId(props.id)
  }
}

const onPopoverHide = () => {
  popoverVisible.value = false
  // 清除对应的ID
  hoveredContextStore.clearAllHoveredContexts()
}
</script>

<style scoped lang="scss">
.large {
  width: 80px;
  height: 80px;
}
.medium {
  width: 60px;
  height: 60px;
}
.small {
  width: 40px;
  height: 40px;
}
img {
  border-radius: 50%;
  &.male.broadcast {
    border: 2px solid #007bff;
    animation: animated-border-male 1.5s linear infinite;
  }
  &.female.broadcast {
    border: 2px solid #ff69b4;
    animation: animated-border-female 1.5s linear infinite;
  }

}

@keyframes animated-border-female {
    0% {
        box-shadow: 0 0 0 0 #ff69b4c4;
    }
    100% {
        box-shadow: 0 0 0 12px #ff69b400;
    }
}
@keyframes animated-border-male {
    0% {
        box-shadow: 0 0 0 0 #007bffc4;
    }
    100% {
        box-shadow: 0 0 0 12px #007bff00;
    }
}

</style>