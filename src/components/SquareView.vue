<template>
    <el-scrollbar >
        <div class="square-view">

            <div class="square-header">
                <el-button type="primary" @click="loadSquareNews(squareObject.follow)">关注动态</el-button>
                <el-button type="primary" @click="loadSquareNews(squareObject.recommend)">推荐动态</el-button>
                <el-button type="primary" @click="loadSquareNews(squareObject.latest)">最新动态</el-button>
            </div>
            
            <div v-if="loading">加载中...</div>
            <div v-if="error">加载失败: {{ error }}</div>
            <ul v-else class="square-content">
                <li v-for="data in squareNewsList" :key="data.id" class="news-item">
                    <div class="news-header">
                        <PopoverCard 
                          :id="data.author.uid"
                          :img="data.author.avatar"
                          card-type="user"
                          size="medium"
                        />
                        <span class="author-name">{{ data.author.nickname }}</span>
                        <span>{{ data.create_time }}</span>
                    </div>
                    <p class="news-content">{{ data.content }}</p>
                    <MediaViewer :media-list="data.media" />
                </li>
            </ul>
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import useSquareNews from '@/hooks/useSquareNews';
import MediaViewer from '@/components/MediaViewer.vue';
import PopoverCard from '@/components/PopoverCard.vue';
let squareObject = {
    /** 关注动态参数 */
    follow: {
        type: '1', id: '0', page: '1', size: '30'
    },
    /** 推荐动态参数 */
    recommend: {
        type: '2', id: '0', page: '1', size: '30'
    },
    
    latest: {
        type: '7', id: '0', page: '1', size: '30'
    }
}
const { squareNewsList, loadSquareNews, loading, error } = useSquareNews(
  { type: '1', id: '0', page: '1', size: '30' },
  true
);


</script>

<style scoped lang="scss">
.square-view {
    overflow-y: auto;   
    padding: 5px 10px 5px 10px;
    height: 100%;
}

.news-item {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    list-style: none;
}

.news-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.author-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.author-name {
    font-weight: bold;
}

.news-content {
    margin-bottom: 10px;
    text-align: left;
}
.square-header {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    transform: translateY(-6px);
    background: linear-gradient(to bottom,#242424,95%,  transparent); ;
    padding-bottom: 8px;
    
    
}
</style>