<template>
    <div class="layout-container">
        <!-- 左右布局 -->
        <div class="layout">
            <!-- 左侧边栏 -->
            <div class="layout-left">
                <Sidebar v-model:isCollapsed="isCollapsed" />
            </div>

            <!-- 右侧内容区 -->
            <div class="layout-right">
                <!-- 右侧上下布局 -->
                <div class="right-header">
                    <HeaderBar v-model:isCollapsed="isCollapsed" />
                </div>
                <div class="right-nav">
                    <Navbar />
                </div>
                <div class="right-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import HeaderBar from './components/Header.vue'
import Navbar from './components/Navbar.vue'
const isCollapsed = ref(false)
</script>

<style scoped>
.layout-container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

.layout {
    height: 100%;
    display: flex;
}

/* 左侧布局 */
.layout-left {
    height: 100%;
    border-right: 1px solid #dcdee2;
}

/* 右侧布局 */
.layout-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.right-header {
    height: 64px;
    background: #fff;
    position: relative;
    z-index: 2;
}

.right-content {
    flex: 1;
    background: #f5f7f9;
    overflow: auto;
    position: relative;
    z-index: 1;
}
</style>
