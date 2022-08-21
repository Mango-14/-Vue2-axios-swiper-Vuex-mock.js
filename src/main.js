import Vue from 'vue'
import App from './App.vue'
import router from './router'
//三级联动注册全局组件
import TypeNav from '@/components/TypeNav'
import store from '@/store'
//引入mock
import './mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//分页器注册全局组件
import Pagination from '@/components/Pagination'
//统一引入接口内的函数
import * as API from '@/api'
import { MessageBox, Message } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
import image from './assets/1.gif'
Vue.use(VueLazyload, {
  loading: image,
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  },
}).$mount('#app')
