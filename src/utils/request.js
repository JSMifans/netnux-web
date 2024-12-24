import axios from 'axios'
import { useUserStore } from '@/store'

const service = axios.create({
    baseURL: '/api', // API base URL
    timeout: 5000, // Request timeout
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers['Authorization'] = `Bearer ${userStore.token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // 处理 HTTP 错误
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('未授权，请重新登录')
                    // 可以在这里处理登录过期逻辑
                    break
                case 403:
                    console.error('拒绝访问')
                    break
                case 404:
                    console.error('请求错误，未找到该资源')
                    break
                case 500:
                    console.error('服务器内部错误')
                    break
                default:
                    console.error(error.response.data.message || '请求失败')
            }
        }
        return Promise.reject(error)
    }
)

export default service
