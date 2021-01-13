const userStore = {
  namespaced: true,
  state: {
    userinfo: {
      access_token: null,
      info: ""
    },
    referer: ""
  },
  getters: {
    isToken(state) {
      return state.userinfo.access_token;
    },
    status(state) {
      return state.userinfo.info.status;
    }
  },
  mutations: {
    loginToken(state, param) {
      state.userinfo = param;
    },
    referer(state, param) {
      if (param.indexOf("referer") <= 0) {
        if (param != "/") {
          console.log("마지막url:", param);
          state.referer = param;
        }
      }
    }
  }
};

export default userStore;
