import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/User'
import { generateAsyncRoutes } from '@/utils/route'
import { LoadingBar } from 'view-ui-plus'

// 白名单路由
const whiteList = ['/login', '/register', '/404']

// 创建静态路由
const constantRoutes = [
    {
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/register',
        meta: {
            title: '注册',
        },
        component: () => import('@/views/login/register.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '404',
        },
        component: () => import('@/views/error/404.vue'),
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
})

// 检查是否已添加动态路由
const hasLoadAsyncRoutes = () => {
    // 检查关键路由是否存在，只要有一个存在就返回true
    const checkRoutes = ['/dashboard/user', '/dashboard/home']
    return checkRoutes.some((path) => {
        const route = router.getRoutes().find((r) => r.path === path)
        // console.log('检查路由:', path, !!route)
        return !!route
    })
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title + ' - 后台管理系统'
    const userStore = useUserStore()

    // 1. 白名单直接放行
    if (whiteList.includes(to.path)) {
        return next()
    }

    // 2. 检查是否有token
    if (!userStore.token) {
        return next('/login')
    }

    try {
        // 3. 获取用户信息（如果没有）
        if (!userStore.hasUserInfo) {
            await userStore.getUserInfo()
        }

        // 4. 如果没有路由，重新生成路由
        const isHasLoadAsyncRoutes = hasLoadAsyncRoutes()
        console.log('isHasLoadAsyncRoutes', isHasLoadAsyncRoutes)
        console.log('userStore.isMenuList', userStore.isMenuList)
        if (!isHasLoadAsyncRoutes || !userStore.isMenuList) {
            // 获取菜单数据
            await userStore.getAsyncMenuList()

            // 移除现有路由
            removeExistingRoutes()

            // 生成新的路由配置
            const asyncRoutes = generateAsyncRoutes(userStore.menuTree)

            // 添加新路由
            asyncRoutes.forEach((route) => router.addRoute(route))
            // 重新导航
            return next({ ...to, replace: true })
        }

        // 5. 已登录且访问登录页，跳转首页
        if (to.path === '/login') {
            return next('/')
        }

        // 6. 路由不存在跳转404
        if (to.matched.length === 0) {
            return next('/404')
        }

        return next()
    } catch (error) {
        console.error('路由守卫错误:', error)
        userStore.clearState()
        return next('/login')
    }
})

router.afterEach(() => {
    LoadingBar.finish()
})

// 移除现有的动态路由
const removeExistingRoutes = () => {
    router.getRoutes().forEach((route) => {
        if (route.name && !constantRoutes.find((r) => r.path === route.path)) {
            router.removeRoute(route.name)
        }
    })
}

export default router
