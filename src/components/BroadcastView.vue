<template>
  <el-scrollbar>
    <div class="broadcast-view">
      <!-- <h2>广播视图</h2> -->
      <el-button type="primary" @click="loadBroadcasts()">获取广播</el-button>
      <div v-for="(data, index) in broadcastList" :key="data.id" class="row" :class="{'male': data.gender !== 2, 'female': data.gender === 2}">
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
            <div><strong class="text-alpha">广播ID:</strong> {{ data.id }}</div>
            <div><strong class="text-alpha">用户ID:</strong> {{ data.uid }}</div>
            <div v-if="uidSoundCardMap[data.uid]" ><strong class="text-alpha">声音属性:</strong> {{ uidSoundCardMap[data.uid]?.result?.voice[0]?.name  }}</div>
            <audio 
              style="width: 150px; height: 30px" 
              v-if="uidSoundCardMap[data.uid]" 
              :src="uidSoundCardMap[data.uid]?.result?.voice_url" 
              controls volume="0.3"></audio>
          </div>
          <div class="message">
            <p class="message-text">{{ data.message }}</p>
            <div class="tag">{{ data.tag }}</div>
            
          </div>
        </div>
        <div class="row-right">
          <div class="seats">
            <div v-for="(seat, index) in data.role" :key="index" >
              <svg-icon icon-class="seat" size="2em" :color="seat === 1 ? '#5BC2D9' : '#E87BBD'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>

import useBroadcast from "@/hooks/useBroadcast";

import PopoverCard from "@/components/PopoverCard.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
const { broadcastList, loadBroadcasts, uidSoundCardMap } = useBroadcast({ page: 1, pia: 0 }, true, true);


// let uidSoundCardMap: UidSoundCard = reactive({});



</script>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 30px;
  height: 120px;
  // border: 2px solid #6b6b6b;
  margin: 10px 5px 10px 5px;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  background: linear-gradient(90deg, #615f5f6e 0%, rgba(255, 255, 255, 0) 100%) !important;
  
  &.male  {
    .text-alpha, .tag {
      color: #5BC2D9;
    }
  }
  &.female  {
    .text-alpha, .tag {
      color: #E87BBD;
    }
  }
  
}

.row-left {
  flex: 1;
}

.row-center {
  display: flex;
  padding-left: 20px;
  flex: 3;
}
.row-right {
  flex: 3;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 150px;
  
  > div {
    text-align: start;
  }
}



.message {
  flex: 1.5;
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
  // color: var(--linkColor);
  border: 1px solid;
  border-radius: .3rem;
  text-align: center;
  padding: 5px .74em;
  display: inline-block;
}
.seats {
  display: flex;
  
  > div {
    margin: 5px;
  }
}

</style>
