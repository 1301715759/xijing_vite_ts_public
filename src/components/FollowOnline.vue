<template>
  <div class="follow-online-view">
    <h2>关注在线视图</h2>
    <el-button type="primary" @click="loadFollowOnline()">获取关注在线</el-button>
    <li v-for="data in followOnlineList" :key="data.id">
      <img :src="data.avatar" alt="用户头像" style="width: 20px; height: 20px; border-radius: 50%;">
    </li>
  </div>
</template>

<script lang="ts" setup>
import useFollowOnline from '@/hooks/useFollowOnline';
const { followOnlineList, loadFollowOnline, loading, error } = useFollowOnline();



</script>

<style scoped>

</style>
