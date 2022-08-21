import { reqCartList, reqChangeSkuNum, reqDeleteShop } from "@/api";

export default {
  namespaced: true,
  state: {
    cartList: {},
    isShopData: []
  },
  mutations: {
    CARTLIST(state, cartList) {
      state.cartList = cartList
    },
    ISSHOPDATA(state, isShopData) {
      state.isShopData = isShopData
    }
  },
  actions: {
    //购物车商品信息
    async cartList({ commit }) {
      let result = await reqCartList();
      if (result.code === 200) {
        commit('CARTLIST', result.data)
      }
    },
    //修改商品数量
    async changeSkuNum({ commit }, params) {
      let result = await reqChangeSkuNum(params);
      if (result.code === 200) {
        //console.log(result.message);
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //删除购物车商品
    async deleteShop({ commit }, params) {
      let result = await reqDeleteShop(params);
      if (result.code === 200) {
        //console.log(result.message);
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
  },
  getters: {
    cartList(state) {
      return state.cartList || {}
    },
    isShopData(state) {
      return state.isShopData || []
    }
  }
}