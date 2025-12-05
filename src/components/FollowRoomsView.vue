<template>
    <div class="follow-rooms-view">
        <h2>收藏房间视图</h2>
        <el-button type="primary" @click="loadRoomsByTag()">获取收藏房间列表</el-button>
        <li v-for="data in followRoomList" :key="data.id">
          <img :src="data.cover_img_url" alt="房间封面" style="width: 20px; height: 20px; border-radius: 50%;">
        </li>
    </div>

</template>
<script lang="ts" setup>
import useFollowRooms from '@/hooks/useRoomsByTag';
const { followRoomList, loadRoomsByTag, loading, error } = useFollowRooms(
  
  { tag: '收藏', type: 0, page: 1, limit: 20 },
  true
  );
</script>
<style scoped>
</style>