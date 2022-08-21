import { reqCode, reqRegisterUser, reqLogin, reqLoginOut } from '@/api'

export default {
  namespaced: true,
  state: {
    code: '',
    message: '',
    token: localStorage.getItem('token'),
  },
  mutations: {
    CODE(state, code) {
      state.code = code
    },
    REGISTERUSER(state, message) {
      state.message = message
    },
    GOTOLOGIN(state, token) {
      state.token = token
    },
    LOGINOUT(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    //获取验证码
    async getCode({ commit }, phone) {
      let result = await reqCode(phone);
      if (result.code == 200) {
        commit('CODE', result.data)
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    //注册
    async registerUser({ commit }, data) {
      let result = await reqRegisterUser(data);
      if (result.code == 200) {
        return "ok";
      } else if (result.code != 200) {
        commit('REGISTERUSER', result.message)
        return;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    //登陆
    async goToLogin({ commit }, data) {
      let result = await reqLogin(data)
      if (result.code == 200) {
        commit('GOTOLOGIN', result.data.token)
        localStorage.setItem('token', result.data.token)
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    /* async getUserInfo() {
      let result = await reqGetUserInfo()
      console.log(result);
      if (result.code == 200) {
        return 'ok'
      }
    } */
    //退出登陆
    async loginOut({ commit }) {
      let result = await reqLoginOut()
      if (result.code == 200) {
        commit('LOGINOUT')
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    }
  },
  getters: {}
}