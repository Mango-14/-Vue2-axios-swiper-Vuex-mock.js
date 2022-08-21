import { reqSearchList } from "@/api"
export default {
  namespaced: true,
  state: {
    searchList: {},
  },
  mutations: {
    SEARCHLIST(state, searchList) {
      state.searchList = searchList
    },
  },
  actions: {
    async searchList({ commit }, params) {
      let result = await reqSearchList(params);
      if (result.code === 200) {
        commit('SEARCHLIST', result.data)
      }
    },
  },
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    }
  }
}