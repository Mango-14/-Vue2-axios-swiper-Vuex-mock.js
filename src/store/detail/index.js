import { reqDetailList, reqAddShopToCart } from "@/api"
import { getNanoid } from '@/utils/nanoid'
export default {
  namespaced: true,
  state: {
    detailList: {},
    nanoid_token: getNanoid(),
  },
  mutations: {
    DETAILLIST(state, detailList) {
      state.detailList = detailList
    },
  },
  actions: {
    //商品详情
    async detailList({ commit }, skuId) {
      let result = await reqDetailList(skuId);
      if (result.code === 200) {
        commit('DETAILLIST', result.data)
      }
    },
    //添加购物车
    async addShopToCart({ commit }, params) {
      let result = await reqAddShopToCart(params);
      if (result.code === 200) {
        //console.log('加购物车成功');
        return "ok"
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
  },
  getters: {
    categoryView(state) {
      return state.detailList.categoryView || {}
    },
    skuInfo(state) {

      return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.detailList.spuSaleAttrList || []
    }
  }
}