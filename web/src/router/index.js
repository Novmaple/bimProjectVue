import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue'

import userHomePage from '../views/userHomePage/userHomePage.vue'
import barChartPage from  '../views/userHomePage/barChartPage.vue'
import circleChartOnePage from  '../views/userHomePage/circleChartOnePage.vue'
import circleChartTwoPage from  '../views/userHomePage/circleChartTwoPage.vue'
import threeDModelPage from  '../views/userHomePage/threeDModelPage.vue'
import totalQuestionPage from  '../views/userHomePage/totalQuestionPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  }, {
    path: '/login',
    component: login
  }, {
    path: '/userHomePage',
    component: userHomePage
  }, {
    path: '/barChartPage',
    component: barChartPage
  }, {
    path: '/circleChartOnePage',
    component: circleChartOnePage
  }, {
    path: '/circleChartTwoPage',
    component: circleChartTwoPage
  }, {
    path: '/totalQuestionPage',
    component: totalQuestionPage
  }, {
    path: '/threeDModelPage',
    component: threeDModelPage
  }
]

const router = new VueRouter({
  routes
})

// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //     next()  放行    next('/login')  强制跳转

//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
