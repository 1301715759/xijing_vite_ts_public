<template>
  <el-scrollbar>
    <div class="follow-rooms-view">
        <!-- <h2>收藏房间视图</h2> -->
        <!-- <el-button type="primary" @click="loadRoomsByTag()">获取收藏房间列表</el-button> -->
        <div v-for="data in followRoomList" :key="data.id" class="room-item">
          <div class="room-cover">
            <PopoverCard
              :id="data.id"
              :img="data.cover_img_url"
              card-type="room"
              size="medium"
            />
          </div>
          <div class="room-info">
            <div class="line-1">{{ data.name }}</div>
            <div class="line-2">
              <svg-icon icon-class="owner" size="18" color="#a7a7a7"></svg-icon>
              <div class="owner-name">{{ data.owner.nickname }}</div>
              |
              <div class="user-count">{{ data.user_count }}人</div>
            </div>
            <div class="line-3">
              {{ data.new_desc }}
            </div>
          </div>
        </div>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import {useTimeout, useIntervalFn} from '@vueuse/core'
import useFollowRooms from '@/hooks/useRoomsByTag';
import SvgIcon from '@/components/SvgIcon/index.vue';
import PopoverCard from '@/components/PopoverCard.vue';
const { followRoomList, loadRoomsByTag, loading, error } = useFollowRooms(
  
  { tag: '收藏', type: 0, page: 1, limit: 20 },
  true
  );

  // 解构props，让currentTab为响应式
const {currentTab} = defineProps<{
  currentTab: string;
}>();
// 监听currentTab变化，加载对应数据
watch(() => currentTab, (newVal, oldVal) => {
  console.log('currentTab changed:', newVal, oldVal);
  if (newVal === 'second2') {
    resume();
  } else {
    pause();
  }
});

// 定时任务，标签页切换时立即执行一次回调
const {pause, resume, isActive} = useIntervalFn(() => {

  console.log('@@loadFollowRoomsByTag', new Date().toLocaleString());
  loadRoomsByTag({tag: '收藏', type: 0, page: 1, limit: 20});
  
}, 15000, {immediateCallback: true});
</script>
<style scoped lang="scss">
.follow-rooms-view {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  // padding: 10px;
  padding: 5px 0 10px 0;
  justify-content: space-around;
}
.room-item {
  height: 80px;
  width: 240px;
  display: flex;
  align-items: center;
  background-color: #4949491a;
  border-radius: 10px;
  padding-left: 10px;
  box-shadow: 0px 0px 5px 0px rgba(252, 252, 252, 0.616);
}
.room-cover {
  width: 60px;
  height: 60px;
  
}
.room-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  padding-left: 10px;
  text-align: start;
  > div {
    height: 20px;
  }
  .line-1 {
    width: 150px;
    font-size: 1.05rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line-2 {
    display: flex;
    white-space: nowrap;
    font-size: .9rem;
    color: #a7a7a7;
    fill: #a7a7a7;
    transform: translateY(3px);
  }
  .line-3 {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
