<template>
    <div class="header">
        <div class="header-left">
            <Icon type="md-menu" size="24" class="trigger" @click="toggleCollapse" />
            <Breadcrumb class="breadcrumb">
                <BreadcrumbItem v-for="item in breadcrumbs" :key="item.path" :to="item.path">
                    <Icon :type="item.icon" v-if="item.icon" />
                    <span>{{ item.title }}</span>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="header-right">
            <Dropdown>
                <div class="user-info">
                    <span class="username">{{ userStore.userInfo?.nickname || '未登录' }}</span>
                    <Tag class="role-name">{{ userStore.userInfo?.roleName || '-' }}</Tag>
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <template #list>
                    <DropdownMenu>
                        <DropdownItem>个人信息</DropdownItem>
                        <DropdownItem @click="handleLogout">退出登录</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const route = useRoute()
const userStore = useUserStore()

const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:isCollapsed'])

const toggleCollapse = () => {
    emit('update:isCollapsed', !props.isCollapsed)
}
// 退出登录
const router = useRouter()
const handleLogout = async () => {
    try {
        await userStore.logout()
        router.push('/login')
    } catch (error) {
        console.error('退出登录失败:', error)
    }
}
// 生成面包屑数据
const breadcrumbs = computed(() => {
    const { path } = route
    const result = []

    // 递归查找父级菜单
    const findParentMenu = (currentMenu) => {
        if (!currentMenu) return

        // 如果有父级且不是根级
        if (currentMenu.parentId !== 0) {
            // 在扁平数组中查找父级
            const parentMenu = userStore.menus.find((menu) => menu.id === currentMenu.parentId)
            if (parentMenu) {
                findParentMenu(parentMenu)
            }
        }

        // 将当前菜单添加到结果中
        result.push({
            title: currentMenu.title || currentMenu.name,
            path: currentMenu.path,
            icon: currentMenu.icon,
        })
    }

    // 在扁平数组中查找当前路径对应的菜单
    const currentMenu = userStore.menus.find((menu) => menu.path === path)

    // 开始递归查找
    findParentMenu(currentMenu)

    return result
})
</script>

<style scoped>
.header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 100;
}

.header-left {
    display: flex;
    align-items: center;
}

.trigger {
    cursor: pointer;
    transition: color 0.3s;
    font-size: 20px;
    margin-right: 20px;
}

.trigger:hover {
    color: #2d8cf0;
}

.breadcrumb {
    display: flex;
    align-items: center;
}

:deep(.ivu-breadcrumb) {
    font-size: 14px;

    .ivu-breadcrumb-item-link {
        display: inline-flex;
        align-items: center;

        .ivu-icon {
            margin-right: 4px;
            font-size: 16px;
        }
    }

    .ivu-breadcrumb-item-separator {
        margin: 0 8px;
        color: #808695;
    }
}

.header-right {
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.user-info:hover {
    background: #f8f8f9;
}

.username {
    font-size: 14px;
    color: #515a6e;
}

.role-name {
    font-size: 12px;
}
</style>
