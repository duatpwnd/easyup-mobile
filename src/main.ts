import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueMq from "vue-mq";
import CKEditor from "ckeditor4-vue";
import ApiUrl from "@/assets/js/api_url";
import GlobalPlugin from "@/plugin/global_plugin";
import axios from "axios";
import VueRouterBackButton from "vue-router-back-button";
import Clipboard from "v-clipboard";
// 주소찾기 api
import VueDaumPostcode from "vue-daum-postcode";
Vue.use(VueDaumPostcode);
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { router } from "./router";
library.add(faTimes);
const VueCookies = require("vue-cookies");
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouterBackButton, { router });
Vue.use(Clipboard);
Vue.use(VueCookies);
Vue.use(GlobalPlugin);
Vue.use(CKEditor);
Vue.use(VueMq, {
  breakpoints: {
    mobile_768: 768,
    mobile_425: 425,
    mobile_360: 360,
    tablet: 769,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$ApiUrl = ApiUrl;
Vue.prototype.$axios = axios;
Vue.config.productionTip = true;
// NODE_ENV = '앱실행모드'
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://develop.hell0world.net";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://www.easyupclass.com";
}
// 개발서버인경우 Authorization 으로 들어가는데 실서버인경우 authorization으로 들어가있음.
axios.interceptors.request.use(
  (config) => {
    if (VueCookies.get("user_info") != null) {
      config.headers.Authorization =
        "Bearer " + VueCookies.get("user_info").access_token;
      config.headers.common["Authorization"] =
        "Bearer " + VueCookies.get("user_info").access_token;
    }
    return config;
  },
  (err) => {}
);
axios.interceptors.response.use((response) => {
  if (response.data.type == "token") {
    // 토큰이없을경우 마지막 url 기억
    store.commit("userStore/referer", router.currentRoute.fullPath);
    Vue.noticeMessage("로그인을 해주세요.");
    Vue.logOut();
  }
  return response;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
