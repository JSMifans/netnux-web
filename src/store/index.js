import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        userInfo: null,
    }),
    actions: {
        async login({ phone, passwordHash }) {
            const response = await login({ phone, passwordHash })
            this.token = response.data
            debugger
            // Fetch user info after login
            const userInfoResponse = await getUserInfo()
            this.userInfo = userInfoResponse.data
            return userInfoResponse.data
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUserInfo: (state) => state.userInfo,
    },
})
