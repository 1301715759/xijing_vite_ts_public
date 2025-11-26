<template>
  <div class="follow-online-view">
    <h2>关注在线视图</h2>
    <el-button type="primary" @click="loadFollowOnline()">获取关注在线</el-button>
    <li v-for="data in followOnlineList" :key="data.id">
      <PopoverCard 
        :id="data.uid"
        :img="data.avatar"
        card-type="user"
        size="medium"
      />
    </li>
  </div>
</template>

<script lang="ts" setup>
import useFollowOnline from '@/hooks/useFollowOnline';
import PopoverCard from '@/components/PopoverCard.vue';
const { followOnlineList, loadFollowOnline, loading, error } = useFollowOnline();



</script>

<style scoped>

</style>
