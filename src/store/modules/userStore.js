const userStore = {
  namespaced: true,
  state: {
    token: null,
  },
  mutations: {
    loginToken(state, param) {
      state.token = param;
    },
  },
};

export default userStore;
