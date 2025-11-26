<template>
  <div class="broadcast-view">
    <h2>广播视图</h2>
    <el-button type="primary" @click="loadBroadcasts()">获取广播</el-button>
    <div v-for="(data, index) in broadcastList" :key="data.id" class="row">
      <div class="row-left">
      <!-- 使用新的UserAvatar组件替换原来的img标签 -->
        <PopoverCard 
          :id="data.uid"
          :img="data.avatar"
          card-type="user"
          size="large"
        />
        <div>这里是播放</div>
      <!-- <img :src="data.avatar" alt="用户头像" style="width: 20px; height: 20px; border-radius: 50%;"> -->
       </div>
       <div class="row-center">
        <div class="user-info">
          <p><strong class="text-alpha">广播ID:</strong> {{ data.id }}</p>
          <p><strong class="text-alpha">用户ID:</strong> {{ data.uid }}</p>
        </div>
        <div class="message">
          <p class="">{{ data.message }}</p>
        </div>
       </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useBroadcast from '@/hooks/useBroadcast';

import PopoverCard from '@/components/PopoverCard.vue';

const { broadcastList, loadBroadcasts, loading, error } = useBroadcast();





</script>

<style scoped lang="scss">

.row {
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 10px;
  height: 120px;
  border: 2px solid #6b6b6b;
  margin: 10px 5px 4px 5px;
  border-radius: 15px;
  background-color: var(--surfaceColor) !important;
  color: var(--textColor) ;
}
.row-left {

}
.row-center {
  display: flex;
  padding-left: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.message {
  padding-left: 20px;
  font-size: 1.2rem;
}
.text-alpha {
  color: var(--accentColor);
}
</style>
