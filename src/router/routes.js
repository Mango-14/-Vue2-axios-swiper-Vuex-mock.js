//引入路由组件
/* import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import teamOrder from '@/pages/Center/teamOrder' */

export default [
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/pages/Home'),//路由懒加载
    meta: { show: true }
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    name: 'Register',
    path: '/Register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    name: 'Search',
    path: '/Search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true }
  },
  {
    name: 'Detail',
    path: '/Detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    name: 'AddCartSuccess',
    path: '/AddCartSuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true, isAuth: true }
  },
  {
    name: 'ShopCart',
    path: '/ShopCart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true, isAuth: true }
  },
  {
    name: 'Trade',
    path: '/Trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true, isAuth: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/ShopCart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'Pay',
    path: '/Pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true, isAuth: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/Trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'PaySuccess',
    path: '/PaySuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true, isAuth: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/Pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'Center',
    path: '/Center',
    component: () => import('@/pages/Center'),
    meta: { show: true, isAuth: true },
    children: [
      {
        name: 'myOrder',
        path: 'myOrder',
        component: () => import('@/pages/Center/myOrder'),
      },
      {
        name: 'teamOrder',
        path: 'teamOrder',
        component: () => import('@/pages/Center/teamOrder'),
      },
      {
        path: '',
        redirect: 'myOrder',
      }
    ]


  },
  {
    path: '*',
    redirect: '/home'
  }
]