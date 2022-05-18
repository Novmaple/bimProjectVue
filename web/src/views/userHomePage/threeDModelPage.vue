<!-- 
各星级占比
-->
<template>
  <div class="com-page"><threeDModel></threeDModel></div>
</template>

<script>
import threeDModel from '../../components/userHome/threeDModel.vue'
export default {
    data () {
        return {}
    },
    methods: {

    },
    components: {
        // A:B，A表示在上方中所展示的组件名
        // B表示在components文件夹下对应的组件名
        threeDModel: threeDModel
    }
}
</script>

<style lang="less" scoped>
</style>