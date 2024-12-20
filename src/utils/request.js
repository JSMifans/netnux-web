import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
    baseURL: '/api', // 从环境变量获取基础URL
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data

        // 这里根据您的后端接口规范定义响应处理逻辑
        if (res.code === 200) {
            return res.data
        } else {
            ElMessage.error(res.message || '请求失败')
            return Promise.reject(new Error(res.message || '请求失败'))
        }
    },
    (error) => {
        let message = error.message
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = '未授权，请重新登录'
                    // 可以在这里处理登录过期逻辑
                    break
                case 403:
                    message = '拒绝访问'
                    break
                case 404:
                    message = '请求错误，未找到该资源'
                    break
                case 500:
                    message = '服务器内部错误'
                    break
                default:
                    message = error.response.data.message || '请求失败'
            }
        }
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default request
