<template>
    <div class="error-container">
        <div class="error-content">
            <div class="error-image">
                <Icon type="ios-bug" size="160" />
            </div>
            <h1 class="error-title">404</h1>
            <div class="error-desc">抱歉，您访问的页面不存在</div>
            <div class="error-actions">
                <Button type="primary" @click="goHome">返回首页</Button>
                <Button @click="goBack" style="margin-left: 16px">返回上一页</Button>
            </div>
            <div class="error-back-time">
                <span>{{ countdown }}秒后自动返回首页</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
let timer = null

const goHome = () => {
    router.push('/')
}

const goBack = () => {
    router.back()
}

onMounted(() => {
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
            goHome()
        }
    }, 1000)
})

onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})
</script>

<style scoped>
.error-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f2f5;
}

.error-content {
    text-align: center;
    padding: 40px;
}

.error-image {
    color: #2d8cf0;
    margin-bottom: 24px;
}

.error-title {
    font-size: 72px;
    font-weight: 600;
    margin: 0;
    color: #515a6e;
}

.error-desc {
    font-size: 20px;
    color: #808695;
    margin: 16px 0 24px;
}

.error-actions {
    margin-bottom: 16px;
}

.error-back-time {
    font-size: 14px;
    color: #808695;
}
</style>
