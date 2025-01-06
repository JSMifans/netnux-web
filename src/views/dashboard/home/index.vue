<template>
    <div class="main-wrapper">
        <div class="card-wrapper">
            <div class="card-item">
                <Card>
                    <template #title>
                        <Icon type="md-person" />
                        用户总数
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
// 可以添加数据获取等逻辑
</script>

<style scoped>
.main-wrapper {
    background-color: #fff;
    height: calc(100vh - 120px);
}
</style>
