import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import homeRouter from './home/home.router'
import cityChooseRouter from './cityChoose/city-choose.router'
// import Home from '../components/Home.vue' // 主页
// import Login from '../components/Login.vue' // 登录
// import Register from '../components/Register.vue' // 注册
// import ChangePassword from '../components/ChangePassword.vue' // 更改密码
// import URLs from '../components/URLs.vue' // 所有链接
// import URLShare from '../components/URLShare.vue' // 链接分享
// import Files from '../components/Files.vue' // 所有文件
// import FileDetail from '../components/FileDetail.vue' // 文件详情
// import FileUpload from '../components/FileUpload.vue' // 文件上传
// import MyLikes from '../components/MyLikes.vue' // 我的喜欢
// import MyURLs from '../components/MyURLs.vue' // 我的链接
// import MyFiles from '../components/MyFiles.vue' // 我的文件
// import UserResources from '../components/UserResources.vue' // 他人的资源

const routes: Array<RouteRecordRaw> = [homeRouter, cityChooseRouter]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.getItem('login')
//   if (isLogin === 'yes') { // 之前有存储过从后端传过来的token
//     if (['login', 'register'].indexOf(to.name) >= 0) { // 已经登录了耍心机还想去登录
//       next('/') // 不允许
//     } else {
//       next() // 想去哪就去哪
//     }
//   } else { // 没有token，到login页面登录取token
//     if (to.meta.requireAuth) { // 并且要访问的页面需要token验证
//       next('/login') // 去login登录获取token
//     } else {
//       next() // 并不需要token，直接跳转
//     }
//   }
// })
export default router
