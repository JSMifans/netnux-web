<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'

// 注册必须的组件
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

// 图表配置
const option = ref({
    title: {
        text: '流量图',
    },
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            type: 'line',
            smooth: true, // 平滑曲线
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                color: '#2d8cf0',
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#ACB9F8', // 渐变起始色
                        },
                        {
                            offset: 1,
                            color: 'rgba(161, 175, 248, 0)', // 渐变结束色（透明）
                        },
                    ],
                },
            },
        },
    ],
})
</script>

<style scoped>
.chart {
    height: 450px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
}
</style>
