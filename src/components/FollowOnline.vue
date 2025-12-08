<template>
  <el-scrollbar>
    <div class="follow-online-view">
      <!-- <h2>关注在线视图</h2> -->
      <!-- <el-button type="primary" @click="loadFollowOnline()">获取关注在线</el-button> -->
      <div v-for="data in followOnlineList" :key="data.id" class="item" 
      :class="{'female':data.gender === 2, 'male':data.gender !== 2}">
        <div class="avatar">
          <PopoverCard 
            :id="data.uid"
            :img="data.avatar"
            card-type="user"
            size="medium"
          />
          <div class = "mode">
            {{ data.mode }}
          </div>
        </div>
        <div class="nickname" >{{ data.nickname }}</div>
        <div class="desc"><div class="desc-text" :data-text="data.desc">{{ data.desc }}</div></div>
        <div v-if="data.has_password" class="lock">
          <svg-icon icon-class="lock" size="1.2em" color="gray" />
        </div>
        <div class="enter-room">
          <!-- <svg-icon icon-class="enter-room" /> -->
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useFollowOnline } from '@/hooks/useFollow';
import PopoverCard from '@/components/PopoverCard.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import {useTimeout, useIntervalFn} from '@vueuse/core'

const { followOnlineList, loadFollowOnline, loading, error } = useFollowOnline();
// 解构props，让currentTab为响应式
const {currentTab} = defineProps<{
  currentTab: string;
}>();
// 监听currentTab变化，加载对应数据
watch(() => currentTab, (newVal, oldVal) => {
  console.log('currentTab changed:', newVal, oldVal);
  if (newVal === 'first2') {
    resume();
  } else {
    pause();
  }
});

// 定时任务，标签页切换时立即执行一次回调
const {pause, resume, isActive} = useIntervalFn(() => {

  console.log('@@loadFollowOnline', new Date().toLocaleString());
  loadFollowOnline({page: 1},true);
  
}, 15000, {immediateCallback: true});
</script>

<style scoped lang="scss">

.item {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 10px;
  margin:20px 0;
  
  .avatar {
    position: relative;
    grid-row: span 2 / span 2;
    z-index: 10;
    user-select: none;
  }
  .mode {
    z-index: 11;
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 50px;
    font-size: .8rem;
    background: rgb(0, 0, 0);
    border-radius: .9rem;
    user-select: none;

  }
  .nickname {
    
    text-align: left;
    grid-column: span 2 / span 2;
    white-space: nowrap;
  }
  &.female {
    .mode {
      background: #e761b2;
    }
    .nickname {
      color: #E87BBD;
    }
  }
  &.male {
    .mode {
      background: #5BC2D9;
    }
    .nickname {
      color: #4bc1db;
    }
  }
  .desc {
    // width: 100%;
    grid-column: span 3 / span 3;
    grid-column-start: 2;
    grid-row-start: 2;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    // width: 200px;
    border-bottom: 1px solid #797979;
    
    .desc-text {
      
      float: left;
      min-width: 100%;
      text-align: center;
      // display: inline-block;
      animation: desc-scroll 5s linear infinite;
      will-change: transform; // 优化动画性能
      
      &:after {
        user-select: auto;
        position: absolute;

        content: attr(data-text);
        padding-left: calc(2rem);
      }
    }
    
  }
}
@keyframes desc-scroll {
	
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-100% - 32px));
  }
}
</style>
