<template>
    <div class="setting-role">
        <Plane :title="editData.id ? '编辑菜单' : '新增菜单'"></Plane>
        <div class="table-wrapper">
            <div class="table-content">
                <Table
                    border
                    :columns="columns"
                    row-key="id"
                    :tree-props="{
                        children: 'children',
                        hasChildren: 'hasChildren',
                    }"
                    :data="data"
                    class="const-table">
                    <template #type="{ row }">
                        <Tag :color="row.type == 0 ? 'primary' : 'success'">
                            {{ row.type == 0 ? '目录' : '菜单' }}
                        </Tag>
                    </template>
                    <template #action="{ row }">
                        <div class="action-wrapper">
                            <Button type="text" size="small" icon="ios-create" @click="edit(row)">编辑</Button>
                            <Button type="text" size="small" icon="ios-trash" @click="deleted(row)">删除</Button>
                            <Button v-if="row.type == 0" type="text" size="small" icon="ios-add" @click="addMenuBtn(row)">添加</Button>
                        </div>
                    </template>
                </Table>
                <div class="table-footer">
                    <Page :total="total" />
                </div>
            </div>
            <div class="table-edit">
                <Title :level="5">编辑菜单</Title>
                <Form :model="editData" :label-width="80" style="margin-top: 20px">
                    <FormItem label="菜单名称" prop="name">
                        <Input v-model="editData.name" />
                    </FormItem>
                    <FormItem label="菜单路径" prop="path">
                        <Input v-model="editData.path" />
                    </FormItem>
                    <FormItem label="菜单组件" prop="component">
                        <Input v-model="editData.component" />
                    </FormItem>
                    <FormItem label="菜单图标" prop="icon">
                        <Input v-model="editData.icon" />
                    </FormItem>
                    <FormItem label="排序" prop="sort">
                        <Input v-model="editData.sort" />
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <RadioGroup v-model="editData.type">
                            <Radio :label="0">目录</Radio>
                            <Radio :label="1">菜单</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="父级菜单" prop="parentId">
                        <Input v-model="editData.parentId" />
                    </FormItem>
                    <Button style="width: 100%; margin-top: 20px" type="primary" @click="save">保存</Button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getMenuList, saveMenu, deleteMenu, addMenu } from '@/api/menu'
import { arrayToTree } from '@/utils/tree'
import Plane from '@/components/Plane.vue'
import { Message, Modal } from 'view-ui-plus'
const columns = ref([
    {
        title: 'ID',
        key: 'id',
        width: 100,
    },
    {
        title: '菜单名称',
        key: 'name',
        tree: true, // 添加这个属性，表示在这一列显示树形结构
    },
    {
        title: '组件',
        key: 'component',
    },
    {
        title: '路径',
        key: 'path',
    },
    {
        title: '图标',
        key: 'icon',
    },
    {
        title: '排序',
        key: 'sort',
    },
    {
        title: '类型',
        slot: 'type',
    },
    {
        title: '操作',
        slot: 'action',
        fixed: 'right',
    },
])
const data = ref([])
const params = ref({
    page: 1,
    size: 100,
})
const total = ref(0)
const editData = ref({
    name: '',
    path: '',
    component: '',
    icon: '',
    sort: '',
    type: 0,
    parentId: 0,
})
const edit = (row) => {
    editData.value = row
}
const save = async () => {
    // 根据是否有 id 决定调用哪个方法
    const res = editData.value.id
        ? await saveMenu(editData.value) // 编辑
        : await addMenu(editData.value) // 新增

    Message.success('保存成功')
    await initData()
}

const deleted = async (row) => {
    Modal.confirm({
        title: '删除菜单',
        content: '确定要删除该菜单吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
            await deleteMenu({ id: row.id })
            await initData()
            Message.success('删除成功')
        },
    })
}

// 新增菜单
const addMenuBtn = (row) => {
    editData.value = {}
    editData.value.parentId = row.id
    editData.value.type = 1
}

const initData = async () => {
    const res = await getMenuList(params.value)
    data.value = arrayToTree(res.records)
    total.value = res.total
}
onMounted(async () => {
    initData()
})
watch(params, async () => {
    initData()
})
</script>

<style lang="less" scoped>
:deep(.ivu-table-cell-tree) {
    margin-right: 20px;
}
</style>
