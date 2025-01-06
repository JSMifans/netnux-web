<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="logo">
            <div class="logo-wrapper" :class="{ collapsed: isCollapsed }">
                <img src="@/assets/images/logo.png" alt="logo" class="logo-img" />
            </div>
        </div>
        <!-- 展开时的菜单 -->
        <Menu v-show="!isCollapsed" theme="dark" width="auto" class="menu" :active-name="activeName" :open-names="openedMenus" @on-open-change="(val) => (openedMenus = val)">
            <template v-for="menu in menuList" :key="menu.id">
                <Submenu v-if="menu.children?.length" :name="menu.id">
                    <template #title>
                        <Icon :type="menu.icon" />
                        <span>{{ menu.name }}</span>
                    </template>
                    <MenuItem v-for="subMenu in menu.children" :key="subMenu.id" :name="subMenu.id" :to="subMenu.path">
                        <Icon :type="subMenu.icon" />
                        <span>{{ subMenu.name }}</span>
                        <span v-if="subMenu.path === '/combo/staticro'" class="staticro-text">普通住宅</span>
                        <span v-if="subMenu.path === '/combo/staticrn'" class="staticrn-text">原生住宅</span>
                    </MenuItem>
                </Submenu>
                <MenuItem v-else :name="menu.id" :to="menu.path">
                    <Icon :type="menu.icon" />
                    <span>{{ menu.name }}</span>
                </MenuItem>
            </template>
        </Menu>

        <!-- 收缩时的菜单 -->
        <div v-show="isCollapsed" class="collapsed-menu">
            <template v-for="menu in menuList" :key="menu.id">
                <div class="menu-item" @mouseenter="handleMouseEnter(menu)" @mouseleave="handleMouseLeave">
                    <Icon :type="menu.icon" size="20" />
                    <transition name="slide-up">
                        <div v-if="menu.children?.length" class="submenu-popup" v-show="activeSubmenu === menu.id">
                            <div v-for="subMenu in menu.children" :key="subMenu.id" class="submenu-item" :class="{ active: activeName === subMenu.id }" @click="handleMenuClick(subMenu)">
                                <Icon :type="subMenu.icon" />
                                <span>{{ subMenu.name }}</span>
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/User'
const userStore = useUserStore()
const menuList = computed(() => userStore.menuTree || [])

const route = useRoute()
const router = useRouter()
const activeSubmenu = ref(null)
const openedMenus = ref([]) // 存储展开的菜单

const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
})

// 查找当前路径对应的父级菜单
const findParentMenus = (path) => {
    const parents = []
    // 遍历一级菜单
    for (const menu of menuList.value) {
        if (menu.children?.length) {
            // 检查子菜单中是否有匹配的路径
            const hasMatchChild = menu.children.some((child) => child.path === path)
            if (hasMatchChild) {
                parents.push(menu.id)
            }
        }
    }
    return parents
}

// 当前激活的菜单名称
const activeName = computed(() => {
    const { path } = route
    // 确保 menuList.value 是数组
    if (!Array.isArray(menuList.value)) {
        return null
    }

    // 遍历所有菜单项查找匹配的路径
    for (const menu of menuList.value) {
        if (menu.children?.length) {
            const child = menu.children.find((item) => item.path === path)
            if (child) {
                return child.id
            }
        } else if (menu.path === path) {
            return menu.id
        }
    }
    return null
})

// 监听路由变化，自动展开对应的菜单
watch(
    () => route.path,
    (newPath) => {
        if (!props.isCollapsed) {
            const parents = findParentMenus(newPath)
            console.log('Current path:', newPath)
            console.log('Parent menus:', parents)
            console.log('Active menu:', activeName.value)
            openedMenus.value = parents
        }
    },
    { immediate: true }
)

// // 监听折叠状态变化
watch(
    () => props.isCollapsed,
    (newValue) => {
        if (!newValue) {
            // 展开时恢复打开的菜单
            openedMenus.value = findParentMenus(route.path)
        }
    }
)

// 处理鼠标悬浮
const handleMouseEnter = (menu) => {
    activeSubmenu.value = menu.id
}

const handleMouseLeave = () => {
    activeSubmenu.value = null
}

// 处理菜单点击
const handleMenuClick = (menu) => {
    router.push(menu.path)
    activeSubmenu.value = null
}
</script>

<style scoped lang="less">
.sidebar {
    width: 240px;
    height: 100%;
    background: #001529;
    transition: width 0.3s ease;
}

.sidebar.collapsed {
    width: 78px;
}

.logo {
    height: 64px;
    color: white;
    overflow: hidden;
}

.logo-wrapper {
    height: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.logo-wrapper.collapsed {
    padding: 0;
    justify-content: center;
}

.logo-img {
    height: 70px;
    flex-shrink: 0;
    padding: 10px;
}

.logo-text {
    font-size: 18px;
    margin-left: 12px;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.collapsed .logo-text {
    opacity: 0;
    width: 0;
    margin-left: 0;
}

.menu {
    border-right: none;
    .staticro-text {
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
        background: #34a95f;
        padding: 2px 5px;
        border-radius: 4px;
    }
    .staticrn-text {
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
        background: #f0834d;
        padding: 2px 5px;
        border-radius: 4px;
    }
}

/* 收缩菜单样式 */
.collapsed-menu {
    width: 100%;
}

.menu-item {
    padding: 14px 0;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: rgba(255, 255, 255, 0.65);
    transition: all 0.3s;
    height: 48px;
    line-height: 48px;
}

.menu-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
}

.submenu-popup {
    position: absolute;
    left: 100%;
    top: 0;
    min-width: 160px;
    background: #001529;
    border-radius: 4px;
    padding: 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transform-origin: 0 0;
    margin-left: 4px;
}

.popup-title {
    padding: 8px 16px;
    color: rgba(255, 255, 255, 0.45);
    font-size: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.submenu-item {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.65);
    transition: all 0.3s;
}

.submenu-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
}

.submenu-item.active {
    color: #fff;
    background: #2d8cf0;
}

.submenu-item .ivu-icon {
    margin-right: 8px;
    font-size: 14px;
}

/* 收缩菜单过渡效果 */
.submenu-enter-active,
.submenu-leave-active {
    transition: all 0.3s ease;
    transform-origin: 0 0;
}

.submenu-enter-from,
.submenu-leave-to {
    opacity: 0;
    transform: scaleX(0);
}

:deep(.ivu-menu) {
    background: #001529;
    .ivu-menu-submenu-title {
        background: transparent !important;
    }
    .ivu-menu-opened {
        background: transparent !important;
    }

    .ivu-menu-item-selected {
        background: #2d8cf0 !important;
        color: #fff !important;
    }
}
</style>
