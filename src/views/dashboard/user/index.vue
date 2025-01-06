<template>
    <div class="main-wrapper user-wrapper">
        <Title title="代理总览" />
        <div class="card-wrapper">
            <div class="card-item">
                <div class="card-title">
                    <Text strong class="card-title-text">静态住宅代理</Text>
                    <Button size="small" type="info">购买新代理</Button>
                </div>
                <div class="card-content">
                    <div class="card-step">
                        <Text strong class="card-step-title">独享静态住宅</Text>
                        <Text underline class="card-herf">查看详情</Text>
                    </div>
                    <div class="card-step">
                        <Text strong>
                            <span class="card-step-num">0</span>
                            <span>个</span>
                        </Text>
                        <Text>
                            <Pinot color="#38B976" />
                            目前可用
                        </Text>
                    </div>
                    <div class="card-step">
                        <Text strong>
                            <span class="card-step-num">0</span>
                            <span>个</span>
                        </Text>
                        <Text>
                            <Pinot color="#FFB000" />
                            即将过期
                        </Text>
                    </div>
                </div>
            </div>
            <div class="card-item">
                <div class="card-title">
                    <Text strong class="card-title-text">静态数据中心代理</Text>
                    <Button size="small" type="info">购买新代理</Button>
                </div>
                <div class="card-content">
                    <div class="card-step">
                        <Text strong class="card-step-title">独享静态住宅</Text>
                        <Text underline class="card-herf">查看详情</Text>
                    </div>
                    <div class="card-step">
                        <Text strong>
                            <span class="card-step-num">0</span>
                            <span>个</span>
                        </Text>
                        <Text>
                            <Pinot color="#38B976" />
                            目前可用
                        </Text>
                    </div>
                    <div class="card-step">
                        <Text strong>
                            <span class="card-step-num">0</span>
                            <span>个</span>
                        </Text>
                        <Text>
                            <Pinot color="#FFB000" />
                            即将过期
                        </Text>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-wrapper" style="margin-top: 20px">
            <div class="card-item">
                <div class="card-title">
                    <Text strong class="card-title-text">动态住宅代理</Text>
                    <Button size="small" type="info">购买流量包</Button>
                </div>
                <div class="card-content">
                    <div class="card-step">
                        <Text strong class="card-step-title">独享静态住宅</Text>
                        <Text underline class="card-herf">查看详情</Text>
                    </div>
                    <div class="card-step">
                        <Text strong>
                            <span class="card-step-num">20</span>
                            <span>G</span>
                        </Text>
                    </div>
                </div>
            </div>
            <div class="card-item" style="visibility: hidden"></div>
        </div>
        <Title title="动态住宅流量使用趋势" style="margin-top: 20px" />
        <div class="chart-wrapper">
            <div class="chart-header">
                <Clipboard :value="textToCopy" @on-success="handleSuccess">
                    <Button>点击复制</Button>
                </Clipboard>
                <DatePicker v-model="dateValue" type="daterange" placeholder="请选择日期范围" style="width: 300px" @on-change="handleDateChange" />
            </div>
            <LineChart />
        </div>
    </div>
</template>

<script setup>
import Pinot from '@/components/common/Pinot.vue'
import Title from '@/components/common/Title.vue'
import LineChart from '@/components/echarts/LineChart.vue'
import { ref } from 'vue'
import { DatePicker, Clipboard, Button, Text } from 'view-ui-plus'

const dateValue = ref(null)
const textToCopy = ref('这是要复制的内容')

const handleDateChange = (date) => {
    console.log('选择的日期：', date)
}

const handleSuccess = () => {
    // 复制成功的回调
    console.log('复制成功')
}
</script>
<style scoped lang="less">
.user-wrapper {
    padding: 20px;
}
.card-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}
.card-wrapper-last {
    gap: 100px;
    .card-item {
        flex: 0.5 !important;
    }
}
.card-item {
    height: 250px;
    flex: 1;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 70px;
    background-color: #fff;
    .card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .card-title-text {
            font-size: 18px;
            color: #333;
        }
    }
    .card-content {
        display: flex;
        height: 100px;
        align-items: center;
        gap: 150px;
    }
    .card-step {
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 20px;
        .card-herf {
            cursor: pointer;
            &:hover {
                color: #17233d;
            }
        }
        .card-step-title {
            font-size: 16px;
            color: #2c2f41;
        }
        .card-step-num {
            font-size: 20px;
            color: #2c2f41;
            padding: 0 10px;
        }
    }
}

.chart-wrapper {
    position: relative;
    border-radius: 10px;
    margin-top: 20px;
    .chart-header {
        position: absolute;
        top: 20px;
        right: 100px;
        z-index: 10;
    }
}
</style>
