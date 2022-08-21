//对api进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动接口
export const reqCategoryList = () => {
  return requests({
    method: 'get',
    url: '/product/getBaseCategoryList'
  })
}

//mock banner数据接口
export const reqBannerList = () => {
  return mockRequests({
    method: 'get',
    url: '/banner'
  })
}

//mock banner数据接口
export const reqFloorList = () => {
  return mockRequests({
    method: 'get',
    url: '/floor'
  })
}

//Search数据接口
export const reqSearchList = (params) => {
  return requests({
    method: 'post',
    url: '/list',
    data: params,
  })
}

//Detail数据接口
export const reqDetailList = (skuId) => {
  return requests({
    method: 'get',
    url: `/item/${skuId}`,
  })
}

//添加到购物车
/* export const reqAddShopToCart = (skuId, skuNum) => {
  return requests({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  })
} */

/* //获取购物车商品信息接口
export const reqCartList = () => {
  return requests({
    method: 'get',
    url: '/cart/cartList',
  })
} */

//mock 添加到购物车接口
export const reqAddShopToCart = (params) => {
  return mockRequests({
    method: 'post',
    url: '/cart/addToCart',
    data: params,
  })
}

//mock 购物车数据接口
export const reqCartList = () => {
  return mockRequests({
    method: 'post',
    url: '/cart/cartList',
    data: {}
  })
}

//mock 修改购物车商品数量接口
export const reqChangeSkuNum = (params) => {
  return mockRequests({
    method: 'post',
    url: '/cart/changeSkuNum',
    data: params
  })
}

//mock 删除购物车商品
export const reqDeleteShop = (params) => {
  return mockRequests({
    method: 'delete',
    url: '/cart/deleteCart',
    data: params
  })
}

//获取注册验证码
export const reqCode = (phone) => {
  return requests({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`,
  })
}

//注册用户
export const reqRegisterUser = (data) => {
  return requests({
    method: 'post',
    url: '/user/passport/register',
    data,
  })
}

//登陆
export const reqLogin = (data) => {
  return requests({
    method: 'post',
    url: '/user/passport/login',
    data,
  })
}

//获取用户信息
/* export const reqGetUserInfo = () => {
  return requests({
    method: 'get',
    url: '/user/passport/auth/getUserInfo',
  })
} */

//退出登陆
export const reqLoginOut = () => {
  return requests({
    method: 'get',
    url: '/user/passport/logout',
  })
}

//mock 获取用户地址
export const reqUserAddress = () => {
  return mockRequests({
    method: 'post',
    url: '/user/userAddress/auth/findUserAddressList',
    data: {}
  })
}