import Vue from "vue";
import Vuex from "vuex";
import toggleStore from "./modules/toggle";
import userStore from "./modules/userStore.js";
import playerStore from "./modules/playerStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    toggleStore,
    userStore,
    playerStore
  }
});
