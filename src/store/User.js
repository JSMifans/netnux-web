import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import { getMenuByUser } from '@/api/menu'
import { arrayToTree } from '@/utils/tree'

// 生成存储key
const getStorageKey = (userId, key) => {
    return userId ? `${key}_${userId}` : key
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: sessionStorage.getItem('token') || '',
        userInfo: JSON.parse(sessionStorage.getItem('userInfo') || 'null'),
        menus: [],
        menuTree: [],
    }),

    actions: {
        // 登录
        async login(loginForm) {
            // 1. 清除旧数据
            this.clearState()

            // 2. 执行登录
            const res = await login(loginForm)
            this.token = res
            sessionStorage.setItem('token', res)
        },

        // 获取用户信息
        async getUserInfo() {
            if (!this.token) throw new Error('Token不存在')
            const data = await getUserInfo()
            this.userInfo = data

            // 使用用户ID存储用户信息
            sessionStorage.setItem(getStorageKey(data.id, 'userInfo'), JSON.stringify(data))
            return data
        },

        // 获取菜单列表
        async getAsyncMenuList() {
            const res = await getMenuByUser({ roleId: this.userInfo.roleId })
            this.menus = res
            this.menuTree = arrayToTree(this.menus)

            // 使用用户ID存储菜单数据
            if (this.userInfo?.id) {
                sessionStorage.setItem(getStorageKey(this.userInfo.id, 'menus'), JSON.stringify(res))
                sessionStorage.setItem(getStorageKey(this.userInfo.id, 'menuTree'), JSON.stringify(this.menuTree))
            }
            return this.menuTree
        },

        // 清除状态
        clearState() {
            // 如果有用户信息，清除该用户的数据
            if (this.userInfo?.id) {
                sessionStorage.removeItem(getStorageKey(this.userInfo.id, 'userInfo'))
                sessionStorage.removeItem(getStorageKey(this.userInfo.id, 'menus'))
                sessionStorage.removeItem(getStorageKey(this.userInfo.id, 'menuTree'))
            }

            this.token = ''
            this.userInfo = null
            this.menus = []
            this.menuTree = []
            sessionStorage.removeItem('token')
        },

        // 登出
        async logout() {
            this.clearState()
        },

        // 重置 token
        resetToken() {
            this.clearState()
        },
    },

    getters: {
        hasUserInfo: (state) => !!state.userInfo,
        isMenuList: (state) => state.menus.length > 0,
        isLoggedIn: (state) => !!state.token,
    },
})
