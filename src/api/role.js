import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
    return request({
        url: '/ums-roles/page',
        method: 'get',
        params,
    })
}

// 新增角色
export function createRole(data) {
    return request({
        url: '/ums-roles/insert',
        method: 'post',
        data,
    })
}

// 编辑角色
export function updateRole(data) {
    return request({
        url: '/ums-roles/update',
        method: 'post',
        data,
    })
}

// 删除角色
export function deleteRole(id) {
    return request({
        url: `/ums-roles/delete/${id}`,
        method: 'GET',
    })
}
