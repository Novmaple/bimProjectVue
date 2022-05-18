import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import './libs/install'
// import echarts from 'echarts'

import './assets/css/global.less'

axios.defaults.baseURL = 'http://localhost:8888/api/'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$echarts = window.echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
