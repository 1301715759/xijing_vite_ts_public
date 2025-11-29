<template>
  <div class="home-container">
    <el-container style="height: 100vh;">
      <el-header class="header">
        <div class="header-content">
          <h1 class="title"></h1>
          <div class="user-info">
            <el-button type="primary" @click="logout">退出登录</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
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
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BroadcastView from '@/components/BroadcastView.vue'
import SquareView from '@/components/SquareView.vue';
import FollowOnline from '@/components/FollowOnline.vue';
import FollowRoomsView from '@/components/FollowRoomsView.vue';
import { ElMessage } from 'element-plus';
import { deleteCookie } from '@/utils/cookie';

const router = useRouter();
let activeName = ref('first');
let activeName2 = ref('first2');

// 退出登录
const logout = () => {
  deleteCookie('Authorization');
  ElMessage.success('已退出登录');
  router.push('/login');
};
</script>
<style scoped>
.home-container {
  width: 100%;
  min-width: 1200px;
  height: 100vh;

}
.el-header {
  height: 60px !important;

}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.title {
  font-size: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}


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