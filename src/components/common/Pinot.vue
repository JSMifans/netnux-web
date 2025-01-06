<template>
    <div class="pinot" :style="{ backgroundColor: color }"></div>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: '#2c2f41',
    },
})
</script>

<style scoped lang="less">
.pinot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background-color: #2c2f41;
}
</style>
