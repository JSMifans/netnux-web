import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(params) {
    return request({
        url: '/ums-menu/page',
        method: 'get',
        params,
    })
}

// 保存菜单
export function saveMenu(data) {
    return request({
        url: '/ums-menu/save',
        method: 'post',
        data,
    })
}

// 删除菜单
export function deleteMenu(params) {
    return request({
        url: '/ums-menu/delete',
        method: 'get',
        params,
    })
}

// 根据用户查找菜单
export function getMenuByUser(params) {
    return request({
        url: '/ums-menu/getUserMenuList',
        method: 'get',
        params,
    })
}

// 更新角色菜单
export function updateRoleMenus(params, data) {
    return request({
        url: '/ums-role-menu/update',
        method: 'post',
        params,
        data,
    })
}

// 新增菜单
export function addMenu(data) {
    return request({
        url: '/ums-menu/insert',
        method: 'post',
        data,
    })
}
