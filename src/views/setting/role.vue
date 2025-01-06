<template>
    <div class="setting-role">
        <Plane title="角色设置"></Plane>
        <div class="table-wrapper">
            <div class="table-content">
                <Table :columns="columns" :data="data" border class="const-table">
                    <template #action="{ row }">
                        <Button type="text" size="small" icon="ios-create" @click="editRole(row)">编辑</Button>
                        <Button type="text" size="small" icon="ios-trash" @click="deleteRoleBtn(row)">删除</Button>
                        <Button type="text" size="small" icon="ios-cog" @click="initRoleMenu(row)">权限</Button>
                    </template>
                </Table>
                <div class="table-footer">
                    <Page :total="total" />
                </div>
            </div>
            <div class="table-edit">
                <div class="edit-header">
                    <Title :level="5" style="width: 150px">{{ roleName || '暂无编辑角色' }}</Title>
                    <Button type="primary" @click="saveRoleMenu">保存全选</Button>
                    <Button type="primary" @click="isAddRole = true">新增角色</Button>
                </div>
                <div class="edit-content">
                    <Tree ref="treeRef" :data="menu" show-checkbox title-key="name" @on-check-change="handleCheckChange"></Tree>
                </div>
            </div>
        </div>
    </div>
    <Modal v-model="isAddRole" :title="roleModal.id ? '编辑角色' : '新增角色'" @on-ok="addRole" @on-cancel="resetRoleModal" :loading="loading" :closable="true" :width="500" ok-text="新增" cancel-text="取消">
        <Form :model="roleModal" :label-width="80">
            <FormItem label="角色名称">
                <Input v-model="roleModal.name" />
            </FormItem>
            <FormItem label="角色描述">
                <Input v-model="roleModal.description" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getRoleList, createRole, updateRole, deleteRole } from '@/api/role'
import { getMenuList, getMenuByUser, updateRoleMenus } from '@/api/menu'
import { arrayToTree } from '@/utils/tree.js'
import { Message, Modal } from 'view-ui-plus'
import Plane from '@/components/Plane.vue'
const columns = ref([
    {
        title: '角色ID',
        key: 'id',
    },
    {
        title: '角色名称',
        key: 'name',
    },
    {
        title: '角色描述',
        key: 'description',
    },
    {
        title: '创建时间',
        key: 'createdAt',
    },
    {
        title: '操作',
        slot: 'action',
        fixed: 'right',
        align: 'center',
    },
])
const data = ref([])
const params = ref({
    page: 1,
    size: 10,
    name: '',
})
const menu = ref([])
const treeRef = ref(null)
const roleId = ref(null)
const roleName = ref('')
const initMenu = async () => {
    try {
        const res = await getMenuList()
        // 确保数据是数组
        const menuList = Array.isArray(res) ? res : res.records || []

        // 转换数据格式
        const formatData = menuList.map((item) => ({
            ...item,
            title: item.name,
            expand: true,
            checked: false,
        }))

        // 转换为树形结构
        menu.value = arrayToTree(formatData)
        console.log('所有菜单树形结构：', menu.value)
    } catch (error) {
        console.error('获取菜单列表失败:', error)
        Message.error('获取菜单列表失败')
    }
}

// 初始化角色菜单
const initRoleMenu = async (row) => {
    if (!row.id) return
    if (row.id == 1) {
        Message.warning('超级管理员角色不能编辑')
        return
    }
    roleId.value = row.id
    roleName.value = row.name

    const res = await getMenuByUser({ roleId: row.id })
    const roleMenus = res.filter((item) => item.type == 1)
    // console.log('角色拥有的菜单:', roleMenus)

    // 递归设置选中状态
    const setCheckedStatus = (nodes) => {
        nodes.forEach((node) => {
            // 检查当前节点是否在角色菜单列表中
            const isChecked = roleMenus.some((menu) => menu.id === node.id)
            // 设置选中状态
            node.checked = isChecked

            // 如果有子节点，继续递归设置
            if (node.children?.length) {
                setCheckedStatus(node.children)
            }
        })
    }

    // 设置选中状态
    setCheckedStatus(menu.value)
    console.log('设置选中状态后的菜单树:', menu.value)
}

// 辅助函数：通过 ID 查找节点
const findNodeById = (menu, id) => {
    for (const node of menu) {
        if (node.id === id) {
            return node
        }
        if (node.children) {
            const found = findNodeById(node.children, id)
            if (found) return found
        }
    }
    return null
}

// 保存角色菜单
const saveRoleMenu = async () => {
    if (!roleId.value) {
        Message.warning('请先选择角色')
        return
    }

    const checkedNodes = treeRef.value.getCheckedNodes()
    const menuIds = checkedNodes
        .filter((node) => node.type === 1) // 只保存菜单，过滤掉目录
        .map((node) => node.id)
    await updateRoleMenus({ roleId: roleId.value }, menuIds)
    Message.success('保存成功')
}

// 处理复选框变化
const handleCheckChange = (nodes) => {
    console.log('选中节点变化:', nodes)
}

// 新增角色
const isAddRole = ref(false)
const roleModal = ref({
    name: '',
    description: '',
})
const loading = ref(true)
const addRole = async () => {
    if (!roleModal.value.name) {
        Message.warning('请输入角色名称')
        loading.value = false
        return
    }
    if (!roleModal.value.description) {
        Message.warning('请输入角色描述')
        loading.value = false
        return
    }
    try {
        const action = roleModal.value.id ? updateRole : createRole
        await action(roleModal.value)
        Message.success('新增成功')
        await initData() // 刷新数据
        isAddRole.value = false
    } finally {
        loading.value = false
        isAddRole.value = false
        resetRoleModal()
        initData()
    }
}

// 编辑角色
const editRole = async (row) => {
    if (row.id == 1) {
        Message.warning('超级管理员角色不能编辑')
        return
    }
    roleModal.value = row
    isAddRole.value = true
}
// 删除角色
const deleteRoleBtn = async (row) => {
    if (row.id == 1) {
        Message.warning('超级管理员角色不能删除')
        return
    }
    Modal.confirm({
        title: '删除角色',
        content: '确定要删除该角色吗？',
        okText: '删除',
        cancelText: '取消',
        onOk: async () => {
            await deleteRole(row.id)
            Message.success('删除成功')
            initData()
        },
    })
}

// 重置角色弹窗
const resetRoleModal = () => {
    roleModal.value = {
        name: '',
        description: '',
    }
}
const total = ref(0)
const initData = async () => {
    const res = await getRoleList(params.value)
    data.value = res.records
    total.value = res.total
}

// 获取角色列表
onMounted(async () => {
    initData()
    initMenu()
})
</script>

<style lang="less" scoped></style>
