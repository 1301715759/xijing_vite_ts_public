<template>
  <div class="media-viewer">
    <div v-for="(media, index) in mediaList" :key="index" class="media-item">
      <!-- 图片类型 -->
      <img 
        v-if="isImage(media)" 
        :src="media.url" 
        :alt="`Image ${index + 1}`"
        class="media-image"
        @load="onImageLoad"
        @error="onImageError"
      />
      
      <!-- 视频类型 -->
      <video 
        v-else-if="isVideo(media)" 
        :src="media.url" 
        controls
        class="media-video"
        @loadeddata="onVideoLoad"
        @error="onVideoError"
      >
        您的浏览器不支持视频播放。
      </video>
      
      <!-- 其他类型或无法识别的类型 -->
      <div v-else class="media-unsupported">
        <p>不支持的媒体类型</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义媒体对象的类型
interface MediaItem {
  id: number
  type: number
  url: string
  width?: number
  height?: number
}

// 定义组件属性
const props = defineProps<{
  mediaList: MediaItem[]
}>()

// 判断是否为图片
const isImage = (media: MediaItem): boolean => {
  // type为1表示图片，或者根据URL后缀判断
  if (media.type === 1) return true
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
  return imageExtensions.some(ext => media.url.toLowerCase().endsWith(ext))
}

// 判断是否为视频
const isVideo = (media: MediaItem): boolean => {
  // type为6表示视频，或者根据URL后缀判断
  if (media.type === 6) return true
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']
  return videoExtensions.some(ext => media.url.toLowerCase().endsWith(ext))
}

// 事件处理函数
const onImageLoad = (event: Event) => {
  console.log('图片加载成功', event)
}

const onImageError = (event: Event) => {
  console.error('图片加载失败', event)
}

const onVideoLoad = (event: Event) => {
  console.log('视频加载成功', event)
}

const onVideoError = (event: Event) => {
  console.error('视频加载失败', event)
}
</script>

<style scoped>
.media-viewer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.media-item {
  width: 200px;
  max-width: 100%;
}

.media-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.media-video {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.media-unsupported {
  padding: 20px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
}
</style>