import { reqUserAddress } from "@/api";

export default {
  namespaced: true,
  state: {
    address: []
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address
    },
  },
  actions: {
    //获取地址信息
    async getUserAddress({ commit }) {
      let result = await reqUserAddress();
      if (result.code === 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
  },
  getters: {
    address(state) {
      return state.address || []
    }
  }
}