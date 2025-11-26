<template>
  <div 
    style="height: 90%; box-shadow: var(--el-border-color-light) 0px 0px 10px;"
  >
    <el-splitter>
      <el-splitter-panel size="60%">
        <div class="demo-panel">
            <el-tabs v-model="activeName" ref="tabRef" class="demo-tabs">
                <el-tab-pane label="广播" name="first" class="tab-pane">
                    <BroadcastView />
                </el-tab-pane>
                <el-tab-pane label="广场" name="second" class="tab-pane" :lazy="true">
                    <SquareView />
                </el-tab-pane>
            </el-tabs>
            
        </div>
      </el-splitter-panel>
      <el-splitter-panel :min="200">
        <div class="demo-panel">
            <el-tabs v-model="activeName2" ref="tabRef" class="demo-tabs" >
                <el-tab-pane label="好友在玩" name="first2" class="tab-pane">
                    <FollowOnline />
                </el-tab-pane>
                <el-tab-pane label="收藏房间" name="second2" class="tab-pane" :lazy="true">
                    <FollowRoomsView />
                </el-tab-pane>
            </el-tabs>
        </div>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import BroadcastView from '@/components/BroadcastView.vue'
import SquareView from '@/components/SquareView.vue';
import FollowOnline from '@/components/FollowOnline.vue';
import FollowRoomsView from '@/components/FollowRoomsView.vue';
let activeName = ref('first');
let activeName2 = ref('first2');
</script>
<style scoped>
.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}
.demo-tabs {
  margin: 15px;
  width: 100%;
  height: 100%;
}
.tab-pane {
  height: 100%;
  overflow: auto;
}
</style>