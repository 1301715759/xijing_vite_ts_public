<template>
  <el-scrollbar>
    <div class="broadcast-view">
      <!-- <h2>广播视图</h2> -->
      <el-button type="primary" @click="loadBroadcasts()">获取广播</el-button>
      <div v-for="(data, index) in broadcastList" :key="data.id" class="row">
        <div class="row-left">
          <!-- 使用新的UserAvatar组件替换原来的img标签 -->
          <PopoverCard
            :id="data.uid"
            :img="data.avatar"
            :gender="data.gender"
            card-type="user"
            size="large"
            placeholder="broadcast"
          />
          <!-- <div class="play-sound">这里是播放</div> -->
          <!-- <img :src="data.avatar" alt="用户头像" style="width: 20px; height: 20px; border-radius: 50%;"> -->
        </div>
        <div class="row-center">
          <div class="user-info">
            <p><strong class="text-alpha">广播ID:</strong> {{ data.id }}</p>
            <p><strong class="text-alpha">用户ID:</strong> {{ data.uid }}</p>
          </div>
          <div class="message">
            <p class="message-text">{{ data.message }}</p>
            <div class="tag">{{ data.tag }}</div>
            
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import useBroadcast from "@/hooks/useBroadcast";

import PopoverCard from "@/components/PopoverCard.vue";

const { broadcastList, loadBroadcasts, loading, error } = useBroadcast();
</script>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 30px;
  height: 120px;
  border: 2px solid #6b6b6b;
  margin: 10px 5px 4px 5px;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  background-color: var(--surfaceColor) !important;
  color: var(--textColor);
}

.row-left {
}

.row-center {
  display: flex;
  padding-left: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.play-sound {
  cursor: pointer;
  position: absolute;
  left: 50px;
  top: 50%;
  text-align: center;
}

.message {
  display: block;
  flex-direction: column;
  padding-left: 20px;
  text-align: start;
}
.message-text {
  font-size: 1.1rem;
  color: var(--onMainColor);
}
.tag {
  color: var(--linkColor);
  border: 1px solid;
  border-radius: .3rem;
  text-align: center;
  padding: 5px .74em;
  display: inline-block;
}

.text-alpha {
  color: var(--accentColor);
}
</style>
