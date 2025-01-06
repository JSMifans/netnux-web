<template>
    <div class="plane">
        <Title :level="5">{{ title }}</Title>
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})
</script>
<style lang="less" scoped>
.plane {
    height: 100px;
    padding: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
}
</style>
