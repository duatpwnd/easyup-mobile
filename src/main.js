import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueMq from "vue-mq";
import CKEditor from "ckeditor4-vue";
import VueCookies from "vue-cookies";
import ApiUrl from "@/assets/js/api_url.js";
import GlobalPlugin from "@/plugin/global_plugin.js";
import axios from "axios";
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$ApiUrl = ApiUrl;
Vue.prototype.$axios = axios;
Vue.use(VueCookies);
Vue.use(GlobalPlugin);
Vue.use(CKEditor);
Vue.use(VueMq, {
  breakpoints: {
    mobile: 768,
    tablet: 769,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = true;
// NODE_ENV = '앱실행모드'
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://develop.hell0world.net";
  ApiUrl.main_list = "http://develop.hell0world.net/main/mobileAPI/v1.php";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://www.easyupclass.com";
  ApiUrl.main_list = "https://www.easyupclass.com/main/mobileAPI/v1.php";
}
axios.interceptors.request.use((config) => {
  if ($cookies.get("user_info") != null) {
    config.headers.Authorization =
      "Bearer " + $cookies.get("user_info").access_token;
  }
  return config;
});
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
