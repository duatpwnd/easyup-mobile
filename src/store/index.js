import Vue from "vue";
import Vuex from "vuex";
import toggleStore from "./modules/toggle";
import userStore from "./modules/userStore";
import playerStore from "./modules/playerStore";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        toggleStore,
        userStore,
        playerStore,
    },
});
//# sourceMappingURL=index.js.map