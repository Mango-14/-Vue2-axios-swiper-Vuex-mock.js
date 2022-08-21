import Mock from 'mockjs'
import banner from './banner'
import floor from './floor'


//mock数据：第一个参数请求地址 第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })

//添加购物车
let cartDatabase = []
Mock.mock('/mock/cart/addToCart', 'post', (option) => {
  let body = JSON.parse(option.body)
  let flag = cartDatabase.findIndex(item => {
    return item.userTempId == body.userTempId
  })
  if (flag == -1) {
    cartDatabase.push(body)
  } else {
    let shopFlag = cartDatabase[flag].shopData.findIndex(item => {
      return item.id == body.shopData[0].id
    })
    if (shopFlag == -1) {
      cartDatabase[flag].shopData.push(body.shopData[0])
    } else {
      cartDatabase[flag].shopData[shopFlag].skuNum = body.shopData[0].skuNum
    }
  }
  return { code: 200, message: '成功', data: null, ok: true }
})

//mock 获取购物车数据
Mock.mock('/mock/cart/cartList', (option) => {
  let body = JSON.parse(option.body)
  let flag = cartDatabase.findIndex(item => {
    return item.userTempId == body.userTempId
  })
  if (flag == -1) {
    return { code: 200, message: '用户未登陆，获取数据失败', data: null, ok: true }
  } else {
    return { code: 200, message: '成功', data: cartDatabase[flag], ok: true }
  }
})

//mock 修改购物车商品数据
Mock.mock('/mock/cart/changeSkuNum', (option) => {
  let body = JSON.parse(option.body)
  let flag = cartDatabase.findIndex(item => {
    return item.userTempId == body.userTempId
  })
  if (flag == -1) {
    return { code: 200, message: '用户未登陆，获取数据失败', data: null, ok: true }
  } else {
    cartDatabase[flag].shopData.forEach(item => {
      if (item.id == body.id) item.skuNum = body.skuNum
    })
    return { code: 200, message: '修改成功', data: null, ok: true }
  }
})

//mock 删除购物车商品数据
Mock.mock('/mock/cart/deleteCart', (option) => {
  let body = JSON.parse(option.body)
  let flag = cartDatabase.findIndex(item => {
    return item.userTempId == body.userTempId
  })
  if (flag == -1) {
    return { code: 200, message: '用户未登陆，删除数据失败', data: null, ok: true }
  } else {
    cartDatabase[flag].shopData.forEach((item, index) => {
      if (item.id == body.id) cartDatabase[flag].shopData.splice(index, 1)
    })
    return { code: 200, message: '删除成功', data: null, ok: true }
  }
})

//mock 获取用户地址
var Random = Mock.Random
Mock.mock('/mock/user/userAddress/auth/findUserAddressList', {
  "code": 200,
  'message': "成功",
  'data': [
    {
      'name': '@cname()',
      'address': '@county(true)',
      'phone': '@id()',
      'isDefault': 1
    },
    {
      'name': '@cname()',
      'address': '@county(true)',
      'phone': '@id()',
      'isDefault': 0
    },
    {
      'name': '@cname()',
      'address': '@county(true)',
      'phone': '@id()',
      'isDefault': 0
    },
    {
      'name': '@cname()',
      'address': '@county(true)',
      'phone': '@id()',
      'isDefault': 0
    },
  ],
  'ok': true
})
/* var Random = Mock.Random
Random.extend({
  color: function (date) {
    var colors = ['红色', '黄色', '天蓝色', '鸭子黄', '恋爱粉', '橘红色', '黑水色', '白到发光色', '紫兰色', '青色', '五颜六色', '七彩菠萝色']
    return this.pick(colors)
  },
  version: function (date) {
    var versions = ['4G+64G', '6G+64G', '8G+128G', '12G+128G', '4G+128G', '8G+256G', '12G+256G', '16G+256G', '6G+128G']
    return this.pick(versions)
  }
}) 
{
    "code": 200,
    'message': "成功",
    'data': [
      {
        "acticityRuleList": null,
        'cartInfoList|10': [
          {
            'id': '@guid()',
            "userId": "E1xXy0uNhpnP1pxkl8SGV",
            "skuId": '@integer(1, 20)',
            "cartPrice": '@integer(2000, 10000)',
            "skuNum": '@integer(1, 99)',
            "imgUrl": '@dataImage()',
            "skuName": '@first()',
            'color': '@color()',
            'version': '@version()',
            "isChecked": 1,
            "skuPrice": '@integer(2000, 10000)'
          }
        ],
        'createTime': null
      }
    ],
    'ok': true
  }
*/
