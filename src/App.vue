<template >
  <div class="common-layout" style="width:100vw">
    <el-container style="height: 100vh;">
      <el-aside width="300px">Aside1</el-aside>
      <el-container >
        <el-header>Header</el-header>
        <el-main>      
          <ContainerView />
        </el-main>
        
      </el-container>
  
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ContainerView from './components/ContainerView.vue';


</script>