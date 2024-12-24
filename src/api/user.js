import request from '@/utils/request'

//  注册
export function register(data) {
    return request({
        url: '/register',
        method: 'post',
        data,
    })
}

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data,
    })
}

export function getUserInfo() {
    return request({
        url: '/ums-users/userInfo',
        method: 'get',
    })
}
