import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'


export default {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [],
    floorList: [],
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
      state.floorList = floorList
    },
  },
  actions: {
    //三级联动列表数据
    async categoryList({ commit }) {
      let result = await reqCategoryList();
      if (result.code === 200) {
        commit('CATEGORYLIST', result.data)
      }
    },
    //banner轮播图图片
    async bannerList({ commit }) {
      let result = await reqBannerList();
      if (result.code === 200) {
        commit('BANNERLIST', result.data)
      }
    },
    //floor轮播图图片
    async floorList({ commit }) {
      let result = await reqFloorList();
      if (result.code === 200) {
        commit('FLOORLIST', result.data)
      }
    },
  },
  getters: {}
}