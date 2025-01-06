<template>
    <div class="spread-container main-wrapper">
        <Title title="推广奖励" />
        <div class="spread-award">
            <div class="header">
                <Text strong>分享推广链接，推荐用户使用产品以获取奖励</Text>
                <div class="right">
                    <Text code strong class="link">{{ textToCopy }}</Text>
                    <Button type="primary">复制</Button>
                </div>
            </div>
            <div class="spread-award-list">
                <div class="spread-award-item">
                    <Text class="title">累计邀请用户数(人)</Text>
                    <Text class="number">100</Text>
                </div>
                <div class="spread-award-item">
                    <Text class="title">累计分成总金额 (元)</Text>
                    <Text class="number">100</Text>
                </div>
                <div class="spread-award-item">
                    <Text class="title">剩余可提现金额(元)</Text>
                    <Text class="number">100</Text>
                </div>
                <div class="spread-award-item">
                    <Text class="title">已累计提现金额(元)</Text>
                    <Text class="number">100</Text>
                </div>
            </div>
            <div class="spread-award-table">
                <div class="custom-tabs">
                    <div v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]" @click="currentTab = index">
                        {{ tab.label }}
                    </div>
                </div>
                <div class="tab-content">
                    <transition name="fade" mode="out-in">
                        <div v-if="currentTab === 0" :key="0" class="table-container">
                            <Table border ref="pTable" :columns="pcolumns" :data="pdata"></Table>
                        </div>
                        <div v-else-if="currentTab === 1" :key="1" class="table-container">
                            <Table border ref="aTable" :columns="acolumns" :data="adata"></Table>
                        </div>
                        <div v-else-if="currentTab === 2" :key="2" class="table-container">
                            <Form style="width: 500px">
                                <FormItem label="支付宝账号">
                                    <Input v-model="withdrawAccount" />
                                </FormItem>
                                <FormItem label="支付宝姓名">
                                    <Input v-model="withdrawName" />
                                </FormItem>
                                <FormItem label="提现金额">
                                    <Input v-model="withdrawAmount" />
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" style="width: 100%">提现</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <Title title="推广规则" />
        <div class="spread-rule">
            <div class="spread-rule-item">
                <Text class="title" strong>1.针对所有MiLuproxy注册用户开放!</Text>
                <Text class="title" strong>2.复制【您的推广链接】，使用您擅长的方式推广，通过您的推广链接注册用户并消费，您可以获得消费金额的高比例分成。</Text>
                <Text class="title" strong>3.推广奖励:用户消费金额的 20% 分成!(永久被动收入，不限定期限)</Text>
                <Text class="title" strong>4.可提现金额需要大于等于 200 元 ，同时至少 2个 邀请用户购买过套餐，即可申请提现。</Text>
            </div>
        </div>
    </div>
</template>
<script setup>
import Title from '@/components/common/Title.vue'
import { Message } from 'view-ui-plus'
import { ref } from 'vue'

const textToCopy = ref('https://miluproxy.com?code=78265707')

const handleSuccess = () => {
    Message.success('复制成功')
}
const pcolumns = ref([
    {
        title: '用户ID',
        key: 'nickname',
        minWidth: 100,
    },
    {
        title: '注册时间',
        key: 'createTime',
        minWidth: 120,
    },
    {
        title: '消费金额',
        key: 'amount',
        minWidth: 100,
    },
    {
        title: '分成金额',
        key: 'splitAmount',
        minWidth: 100,
    },
    {
        title: '状态',
        key: 'status',
        minWidth: 80,
    },
])
const pdata = ref([
    {
        nickname: '张三',
        createTime: '2024-01-01',
        amount: '100',
        splitAmount: '100',
        status: '已分成',
    },
    {
        nickname: '张三',
        createTime: '2024-01-01',
        amount: '100',
        splitAmount: '100',
        status: '已分成',
    },
])

const acolumns = ref([
    {
        title: '用户ID',
        key: 'nickname',
        minWidth: 100,
    },
    {
        title: '提现金额',
        key: 'amount',
        minWidth: 100,
    },
    {
        title: '提现时间',
        key: 'createTime',
        minWidth: 120,
    },
    {
        title: '状态',
        key: 'status',
        minWidth: 80,
    },
])
const adata = ref([
    {
        nickname: '张三',
        createTime: '2024-01-01',
        amount: '100',
        status: '已提现',
    },
    {
        nickname: '张三',
        amount: '100',
        createTime: '2024-01-01',
        status: '已提现',
    },
    {
        nickname: '张三',
        amount: '100',
        createTime: '2024-01-01',
        status: '已提现',
    },
])

const currentTab = ref(0)
const tabs = [{ label: '推广详情' }, { label: '提现记录' }, { label: '提现' }]
</script>

<style lang="less" scoped>
.spread-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    .spread-rule {
        height: 300px;
        background-color: #fff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 20px;
        background: url('@/assets/images/links-bg.png') no-repeat center center;
        background-size: 100% 100%;
        .spread-rule-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 30px;

            font-size: 16px;
            font-weight: bold;
            .title {
                color: #ffe63c;
            }
        }
    }
    .spread-award {
        flex: 1;
        background-color: #fff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 20px;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .right {
                display: flex;
                align-items: center;
                gap: 30px;
            }
            .link {
                border-radius: 5px;
            }
        }
    }
}
.spread-award-list {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    .spread-award-item {
        flex: 1;
        background-color: #f3f5f8;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        .title {
            font-size: 16px;
            font-weight: bold;
        }
        .number {
            font-size: 24px;
            font-weight: bold;
        }
    }
}
.spread-award-table {
    border-radius: 10px;
    margin-top: 20px;
    min-height: 500px;

    .custom-tabs {
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 16px;

        .tab-item {
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            color: #666;
            font-weight: bold;
            &.active {
                color: #2d8cf0;
                font-weight: bold;

                &:after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #2d8cf0;
                }
            }

            &:hover {
                color: #2d8cf0;
            }
        }
    }

    .tab-content {
        .table-container {
            width: 100%;
            padding: 16px 0;
            box-sizing: border-box;

            :deep(.ivu-table-wrapper) {
                width: 100%;
                table {
                    width: 100%;
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
