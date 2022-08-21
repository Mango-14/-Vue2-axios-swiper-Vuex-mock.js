import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
import routes from './routes'
import store from '../store'
//备份原有push、replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push。replace方法，防止方法调用时没有传resolve、reject回调函数报错
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

export default router
let isShopData = store.state.cart.isShopData
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      if (to.path == '/login') {
        next('/home')
      } else if (to.path == '/trade' && !isShopData) {
        alert('请勾选商品或加入商品至购物车')
      } else {
        next()
      }
    } else {
      let toPath = to.path
      next('/login?redirect=' + toPath)
    }
  } else {
    next()
  }
})