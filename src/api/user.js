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

export function getUserList(params) {
    return request({
        url: '/ums-users/pageByUser',
        method: 'get',
        params,
    })
}

// 管理用户表
export function getUserListByUser(params) {
    return request({
        url: '/ums-users/pageByAdmin',
        method: 'get',
        params,
    })
}

// 编辑用户
export function updateUser(data) {
    return request({
        url: '/ums-users/update',
        method: 'post',
        data,
    })
}

// 删除用户
export function deleteUser(id) {
    return request({
        url: `/ums-users/delete/${id}`,
        method: 'GET',
    })
}

// 新增管理用户
export function addUserManager(data) {
    return request({
        url: '/ums-users/insertManager',
        method: 'post',
        data,
    })
}
