import Vue from "vue";
import Vuex from "vuex";
import toggleStore from "./modules/toggle.js";
import userStore from "./modules/userStore.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    toggleStore,
    userStore,
  },
});
