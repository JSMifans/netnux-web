import axios from 'axios'
import { useUserStore } from '@/store/User'
import { Message } from 'view-ui-plus'
import router from '@/router'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 白名单接口不需要token
        const whiteList = ['/login', '/register']
        const userStore = useUserStore()

        // 如果不是白名单接口，才添加token
        if (!whiteList.includes(config.url)) {
            config.headers['Authorization'] = `Bearer ${userStore.token}`
        }
        return config
    },
    (error) => {
        Message.error('请求错误')
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data
        // 这里根据你的后端接口规范判断请求是否成功
        if (res.code === 200) {
            return res.data
        } else {
            Message.error(res.message || '请求失败')
            return Promise.reject(new Error(res.message || '请求失败'))
        }
    },
    (error) => {
        const userStore = useUserStore()

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Message.error('登录已过期，请重新登录')
                    userStore.logout()
                    router.push('/login')
                    break
                case 403:
                    Message.error('没有权限访问')
                    break
                case 404:
                    Message.error('请求的资源不存在')
                    break
                case 500:
                    Message.error('服务器错误')
                    break
                default:
                    Message.error(error.response.data?.message || '请求失败')
            }
        } else if (error.code === 'ECONNABORTED') {
            Message.error('请求超时，请重试')
        } else {
            Message.error('网络错误，请检查网络连接')
        }
        return Promise.reject(error)
    }
)

export default service
