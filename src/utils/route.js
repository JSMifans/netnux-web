// 生成动态路由
import Layout from '@/layout/index.vue'

// 生成动态路由
export function generateAsyncRoutes(menus) {
    // 预导入所有视图组件
    const modules = import.meta.glob('@/views/**/*.vue')

    const generateRoute = (menu) => {
        const route = {
            path: menu.path,
            // name: menu.name,
            component: null, // 先设置为 null
            meta: {
                title: menu.title || menu.name,
                icon: menu.icon,
                sort: menu.sort,
                hidden: menu.hidden,
                requiresAuth: true,
            },
        }

        // 处理组件
        if (menu.component === 'Layout') {
            route.component = Layout
        } else {
            // 构建完整的组件路径
            const componentPath = `/src/views/${menu.component}.vue`

            // 检查组件是否存在
            if (!modules[componentPath]) {
                // console.error(`组件不存在: ${componentPath}`, menu)
                return null
            }

            route.component = modules[componentPath]
            // console.log('注册路由:', {
            //     path: route.path,
            //     name: route.name,
            //     componentPath,
            // })
        }

        // 处理子路由
        if (menu.children?.length) {
            route.children = menu.children.map((child) => generateRoute(child)).filter(Boolean)
        }

        return route
    }

    return menus.map((menu) => generateRoute(menu)).filter(Boolean)
}
