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
        :class="size" 
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
  width: 60px;
  height: 60px;
}
.medium {
  width: 40px;
  height: 40px;
}
.small {
  width: 30px;
  height: 30px;
}
img {
  border-radius: 50%;
}
</style>