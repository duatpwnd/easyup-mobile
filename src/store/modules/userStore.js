const userStore = {
  namespaced: true,
  state: {
    userinfo: {
      access_token: null,
      info: "",
    },
  },
  getters: {
    isToken(state) {
      return state.userinfo.access_token;
    },
  },
  mutations: {
    loginToken(state, param) {
      state.userinfo = param;
    },
  },
};

export default userStore;
