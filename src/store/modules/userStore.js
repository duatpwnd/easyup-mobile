const userStore = {
  namespaced: true,
  state: {
    token: null,
    userinfo: "",
  },
  mutations: {
    loginToken(state, param) {
      state.token = param.access_token;
      state.userinfo = param.info;
    },
  },
};

export default userStore;
