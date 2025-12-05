<template>
  <el-scrollbar>
    <div class="broadcast-view">
      <!-- <h2>广播视图</h2> -->
      <el-button type="primary" @click="loadBroadcasts({ page: 1, pia: 0 })">获取广播</el-button>
      <div 
        v-for="(data, index) in broadcastList" :key="data.id" 
        class="row" 
        :class="{'male': data.gender !== 2, 'female': data.gender === 2, 'select': data.id === selectNode,'expand': data.room_id === expandRoomId}"
        @mouseenter="handleMouseEnter(data.id)" @mouseleave="handleMouseLeave(data.id)"
      >
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
            <div v-if="uidSoundCardMap[data.uid]?.result?.voice[0]?.name" ><strong class="text-alpha">声音属性:</strong> {{ uidSoundCardMap[data.uid]?.result?.voice[0]?.name  }}</div>
            <audio 
              style="width: 150px; height: 30px" 
              v-if="uidSoundCardMap[data.uid]?.result?.voice_url" 
              :src="uidSoundCardMap[data.uid]?.result?.voice_url" 
              controls volume="0.3"></audio>
          </div>
          <div class="message">
            <p class="message-text">{{ data.message }}</p>
            <div class="tag">{{ data.tag }} {{ data.room_mode }}</div>
            
          </div>
        </div>
        <div class="row-right">
          <div class="seats">
            <div v-for="(seat, index) in data.role" :key="index" >
              <svg-icon icon-class="seat" size="2em" :color="seat === 1 ? '#5BC2D9' : '#E87BBD'" />
            </div>
          </div>
          
        </div>
        <div class="expand-container" :class="{'select': data.id === selectNode, 'expand': data.room_id === expandRoomId}">
          <div class="expand-arrow">
            <svg-icon @click="handleExpandClick(data.room_id)" icon-class="expand" size="2em" color="#009bbd" class="arrow"/>
          </div>
          <div class="expand-content"  >
            <div v-if="expandRoomId === data.room_id">
              <MiniRoomView :roomId="data.room_id" :roomMode="data.room_mode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useBroadcast from "@/hooks/useBroadcast";
import PopoverCard from "@/components/PopoverCard.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {type BroadcastResponseData} from "@/types/broadcast";
import MiniRoomView from "@/components/MiniRoomView.vue";
let currentPage = ref(1);
let broadcastMap = ref(new Map<number, BroadcastResponseData>());
const { broadcastList, loadBroadcasts, uidSoundCardMap } = useBroadcast({ page: currentPage.value, pia: 0 }, true, true);




// let uidSoundCardMap: UidSoundCard = reactive({});
/** 选中的节点ID */
let selectNode = ref<number>(0)
/** 展开的房间ID */
let expandRoomId = ref<number>(0)

const handleMouseEnter = (id: number) => {
  selectNode.value = id;
  // console.log("@@mouse enter", id);
}
const handleMouseLeave = (id: number) => {
  selectNode.value = 0;
  // console.log("@@mouse leave", id);
}
const handleExpandClick = (id: number) => {
  if (expandRoomId.value === id) {
    expandRoomId.value = 0;
    return;
  }
  expandRoomId.value = id;

  console.log("@@expand click room_id", id);
}


</script>

<style scoped lang="scss">
.row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 30px;
  height: 120px;
  
  // border: 2px solid #6b6b6b;
  margin: 10px 5px 10px 5px;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  background: linear-gradient(90deg, #615f5f6e 0%, rgba(255, 255, 255, 0) 100%) !important;
  background-size: 200% 200%;
  // 为所有状态添加过渡效果，确保移出时也有平滑过渡
  transition:  0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
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
  .expand-container {
    // position: absolute;
    // width: 100%;
    // bottom: 1em;
    
    .expand-arrow {
      position: absolute;
      left: 50%;
      bottom: 0;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;

    }
    
    &.select {
      .expand-arrow {
        animation: expand-floating 2s infinite;        
        opacity: 1;
      }
    }
    
    &.expand {
      .arrow {
        transform: rotate(180deg);
      }
    }
  }
  
  .arrow {
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }
  &.select:not(.expand) {
    transition: all 0.3s ease-in-out;
    transform: translatey(-3px);
  }
  &.select {
      background: linear-gradient(90deg, #615f5f6e 60%, rgba(255, 255, 255, 0) 100%) !important;
  }
  &.expand {
    margin-bottom: 310px;
    background: linear-gradient(90deg, #615f5f6e 80%, rgba(255, 255, 255, 0) 100%) !important;
    .arrow {
      transform: rotate(180deg);
    }
    .expand-content {
      clip-path: polygon(0 65px, 100% 65px, 100% 100%, 0 100%);
      transition: clip-path 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  }
  .expand-content {
    z-index: 0;
    width: calc(100% - 65px);
    height: 360px;
    position: absolute;
    border-bottom-left-radius: 10px;
    left: 65px;
    clip-path: polygon(0 65px, 100% 65px, 100% 65px, 0 65px);
    // background: #000000c7 !important;
    transition: clip-path 0.3s ease-in-out;
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
@keyframes expand-floating {
	0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
	100% { transform: translateY(0px); }
}



</style>
