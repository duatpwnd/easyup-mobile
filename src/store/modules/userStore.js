const userStore = {
  namespaced: true,
  state: {
    userinfo: {
      access_token: null,
      info: "",
    },
  },
  mutations: {
    loginToken(state, param) {
      state.userinfo = param;
    },
  },
};

export default userStore;
