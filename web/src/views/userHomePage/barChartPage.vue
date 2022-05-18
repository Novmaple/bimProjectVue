<!-- 
评价专家组成情况柱状图
-->
<template>
  <div class="com-page"><barChart></barChart></div>
</template>

<script>
import barChart from '../../components/userHome/barChart.vue'
export default {
    data () {
        return {}
    },
    methods: {

    },
    components: {
        // A:B，A表示在上方中所展示的组件名
        // B表示在components文件夹下对应的组件名
        barChart: barChart
    }
}
</script>

<style lang="less" scoped>
</style>