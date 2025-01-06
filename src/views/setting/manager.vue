<template>
    <div class="setting-user">
        <Plane title="用户设置"></Plane>
        <div class="table-wrapper">
            <div class="table-content">
                <Table :columns="columns" :data="data" border class="const-table">
                    <template #status="{ row }">
                        <Tag v-if="row.status === 1" color="green">正常</Tag>
                        <Tag v-else color="red">禁用</Tag>
                    </template>
                    <template #action="{ row }">
                        <Button type="text" size="small" icon="ios-create" @click="edit(row)">编辑</Button>
                        <Button type="text" size="small" icon="ios-trash" @click="deleteUserBtn(row)">删除</Button>
                    </template>
                </Table>
                <div class="table-footer">
                    <Page :total="total" />
                </div>
            </div>
            <div class="table-edit">
                <div class="edit-header">
                    <Title :level="5">{{ editForm.id ? '编辑管理用户' : '新增管理用户' }}</Title>
                    <Button icon="md-add" type="primary" @click="resetEditForm()">新增管理用户</Button>
                </div>
                <div class="edit-content">
                    <Form :model="editForm" :label-width="80">
                        <FormItem label="管理昵称">
                            <Input v-model="editForm.nickname" />
                        </FormItem>
                        <FormItem label="手机号码">
                            <Input v-model="editForm.phone" />
                        </FormItem>
                        <FormItem label="电子邮箱">
                            <Input v-model="editForm.email" />
                        </FormItem>
                        <FormItem label="流量">
                            <Input v-model="editForm.flow" :disabled="editForm.id" />
                        </FormItem>
                        <FormItem label="管理角色">
                            <Select v-model="editForm.roleId" :disabled="editForm.id">
                                <Option v-for="item in roleOptions" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="角色状态">
                            <RadioGroup v-model="editForm.status">
                                <Radio :label="1">正常</Radio>
                                <Radio :label="0">禁用</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style="width: 100%" @click="saveEdit">保存</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Plane from '@/components/Plane.vue'
import { Message, Modal } from 'view-ui-plus'
import { getUserListByUser, updateUser, deleteUser, addUserManager } from '@/api/user'
import { getRoleList } from '@/api/role'
const columns = ref([
    {
        title: '昵称',
        key: 'nickname',
        width: 100,
    },
    {
        title: '手机号',
        key: 'phone',
        width: 150,
    },
    {
        title: '邮箱',
        key: 'email',
    },
    {
        title: '流量',
        key: 'flow',
    },
    {
        title: '余额',
        key: 'balance',
    },
    {
        title: '角色',
        key: 'roleName',
        width: 150,
    },
    {
        title: '状态',
        slot: 'status',
        width: 150,
    },
    {
        title: '创建时间',
        key: 'createdAt',
        width: 250,
    },
    {
        title: '操作',
        slot: 'action',
        fixed: 'right',
        width: 200,
    },
])
const data = ref([])
const params = ref({
    page: 1,
    size: 10,
})
const total = ref(0)
// 初始化数据
const initData = async () => {
    const res = await getUserListByUser(params.value)
    data.value = res.records
    total.value = res.total
}
// 编辑表单
const editForm = ref({
    nickname: '',
    phone: '',
    email: '',
    flow: '',
    balance: '',
    roleName: '',
    status: '',
})
// 编辑
const edit = (row) => {
    editForm.value = row
}
// 保存编辑
const saveEdit = async () => {
    if (!editFormRules()) return
    const action = editForm.value.id ? updateUser : addUserManager
    const res = await action(editForm.value)
    Message.success('操作成功')
    initData()
}

// 删除
const deleteUserBtn = async (row) => {
    Message.warning('暂不支持删除,请联系管理员')
    return
    Modal.confirm({
        title: '提示',
        content: '确定要删除吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
            const res = await deleteUser(row.id)
            Message.success('删除成功')
            initData()
        },
    })
}

// 重置编辑表单
const resetEditForm = () => {
    editForm.value = {
        nickname: '',
        phone: '',
        email: '',
        flow: 0,
        balance: 0,
        roleId: '',
        status: 1,
    }
}

// 表单的验证
const editFormRules = () => {
    if (!editForm.value.nickname) {
        Message.error('昵称不能为空')
        return false
    }
    if (!editForm.value.phone) {
        Message.error('手机号不能为空')
        return false
    }
    if (!editForm.value.email) {
        Message.error('邮箱不能为空')
        return false
    }
    if (!editForm.value.roleId) {
        Message.error('角色不能为空')
        return false
    }
    if (!editForm.value.status) {
        Message.error('状态不能为空')
        return false
    }
    return true
}

// 初始化角色列表
const roleOptions = ref([])
const initRoleList = async () => {
    const res = await getRoleList()
    roleOptions.value = res.records
}

onMounted(async () => {
    initData()
    initRoleList()
})
</script>
