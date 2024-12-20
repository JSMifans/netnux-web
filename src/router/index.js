import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '../views/login/register.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 在这里添加路由配置
        {
            path: '/register',
            name: 'register',
            component: RegisterComponent,
        },
    ],
})

export default router
