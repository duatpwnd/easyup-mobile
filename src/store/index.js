import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFooter: true,
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
  },
  actions: {},
  modules: {},
});
