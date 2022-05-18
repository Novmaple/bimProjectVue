<!-- 
各星级占比
-->
<template>
  <div class="com-page"><circleChartTwo></circleChartTwo></div>
</template>

<script>
import circleChartTwo from '../../components/userHome/circleChartTwo.vue'
export default {
    data () {
        return {}
    },
    methods: {

    },
    components: {
        // A:B，A表示在上方中所展示的组件名
        // B表示在components文件夹下对应的组件名
        circleChartTwo: circleChartTwo
    }
}
</script>

<style lang="less" scoped>
</style>