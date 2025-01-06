<template>
    <div class="title-wrapper">
        <Text strong>{{ title }}</Text>
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

<style scoped>
.title-wrapper {
    font-size: 18px;
    font-weight: 600;
    padding-left: 10px;
    color: #2c2f41;
    /* margin-bottom: 20px; */
}
</style>
