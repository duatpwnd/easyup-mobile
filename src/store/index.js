import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFooter: true, // 푸터
    header_menu: false, // 헤더 메뉴
  },
  // getters: {
  //   getIsFooter(state) {
  //     console.log("state:", state);
  //     return state.isFooter;
  //   },
  // },
  mutations: {
    isFooter(state, boolean) {
      if (boolean == false) {
        state.isFooter = false;
      } else {
        state.isFooter = true;
      }
    },
    HeaderMenuToggle(state) {
      state.header_menu = !state.header_menu;
    },
  },
  actions: {},
  modules: {},
});
