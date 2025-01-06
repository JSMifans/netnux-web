<template>
    <div class="tags-nav">
        <div class="tags-wrapper">
            <div v-for="tag in visitedTags" :key="tag.path" class="tag-item" :class="{ active: isActive(tag) }" @click="handleClick(tag)">
                <span class="tag-content">
                    <Icon :type="tag.icon" v-if="tag.icon" />
                    <span class="tag-title">{{ tag.title }}</span>
                </span>
                <Icon v-if="!isHomePage(tag)" type="md-close" class="close-icon" @click.stop="handleClose(tag)" />
            </div>
        </div>
        <Dropdown class="tags-dropdown" trigger="click">
            <Button size="small">
                <Icon type="ios-arrow-down" />
            </Button>
            <template #list>
                <DropdownMenu placement="bottom-start">
                    <DropdownItem @click="closeOthers">关闭其他</DropdownItem>
                    <DropdownItem @click="closeAll">关闭所有</DropdownItem>
                </DropdownMenu>
            </template>
        </Dropdown>
    </div>
</template>

<style lang="less" scoped>
.tags-nav {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #f0f0f0;
    background: #f5f7f9;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tags-wrapper {
        flex: 1;
        overflow-x: auto;
        white-space: nowrap;
        padding-right: 16px;
        display: flex;
        gap: 10px;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .tag-item {
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
        background: #fff;
        border-radius: 3px;
        font-size: 13px;
        display: flex;
        font-weight: bold;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        color: #808695;

        &:hover {
            color: #2d8cf0;
        }

        &.active {
            color: #2d8cf0;
            .close-icon {
                margin-left: 4px;
                font-size: 14px;
            }
        }

        .tag-content {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .tag-title {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .close-icon {
            margin-left: 4px;
            font-size: 14px;
        }
    }

    .tags-dropdown {
        margin-right: 10px;
    }
}
:deep('.ivu-select-dropdown') {
    // right: 0 !important;
    margin-left: -30px !important;
}
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 根据角色获取首页配置
const homePage = computed(() => {
    const { roleId } = userStore.userInfo
    const roleHomePages = {
        1: {
            title: '超管首页',
            path: '/dashboard/home',
        },
        2: {
            title: '管理员首页',
            path: '/dashboard/home',
        },
        10: {
            title: '账户总览',
            path: '/dashboard/user',
        },
    }
    return roleHomePages[roleId] || roleHomePages[3]
})

// 访问过的标签页
const visitedTags = ref([])

// 添加标签
const addTag = (route) => {
    const { path, name, meta } = route

    // 如果标签列表为空，添加首页标签
    if (visitedTags.value.length === 0) {
        visitedTags.value.push(homePage.value)
        if (path === homePage.value.path) return
    }

    // 在扁平菜单中查找当前路由对应的菜单项
    const currentMenu = userStore.menus.find((menu) => menu.path === path)

    if (!visitedTags.value.find((tag) => tag.path === path)) {
        visitedTags.value.push({
            title: currentMenu?.title || meta.title,
            path: path,
            icon: currentMenu?.icon,
        })
    }
}

// 判断是否是首页
const isHomePage = (tag) => {
    return tag.path === homePage.value.path
}

// 判断是否是当前激活的标签
const isActive = (tag) => {
    return tag.path === route.path
}

// 点击标签
const handleClick = (tag) => {
    router.push(tag.path)
}

// 关闭标签
const handleClose = (tag) => {
    // 如果是首页，不允许关闭
    if (isHomePage(tag)) return

    const tags = visitedTags.value
    const index = tags.findIndex((item) => item.path === tag.path)

    if (isActive(tag) && tags.length > 1) {
        const nextTag = tags[index + 1] || tags[index - 1]
        router.push(nextTag.path)
    }

    visitedTags.value = tags.filter((item) => item.path !== tag.path)
}

// 刷新当前页面
const refreshPage = () => {
    router.replace({
        path: '/redirect' + route.fullPath,
    })
}

// 关闭其他标签
const closeOthers = () => {
    visitedTags.value = visitedTags.value.filter((tag) => isHomePage(tag) || tag.path === route.path)
}

// 关闭所有标签
const closeAll = () => {
    visitedTags.value = [homePage.value]
    router.push(homePage.value.path)
}

// 监听路由变化
watch(
    () => route.path,
    (newPath) => {
        addTag(route)
    },
    { immediate: true }
)
</script>
