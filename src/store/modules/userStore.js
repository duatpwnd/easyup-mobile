const userStore = {
  namespaced: true,
  state: {
    token: null,
  },
  mutations: {
    loginToken(state, param) {
      console.log("토큰옴", param);
      state.token = param;
    },
  },
};

export default userStore;
