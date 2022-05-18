<!-- 
评价专家团队占比圆环图
-->
<template>
  <div class="com-page"><circleChartOne></circleChartOne></div>
</template>

<script>
import circleChartOne from '../../components/userHome/circleChartOne.vue'
export default {
    data () {
        return {}
    },
    methods: {

    },
    components: {
        // A:B，A表示在上方中所展示的组件名
        // B表示在components文件夹下对应的组件名
        circleChartOne: circleChartOne
    }
}
</script>

<style lang="less" scoped>
</style>