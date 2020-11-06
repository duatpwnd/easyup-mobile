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

Vue.use(VueCookies);
import axios from "axios";
// NODE_ENV = '앱실행모드'
console.log("앱실행모드:", process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://develop.hell0world.net";
  ApiUrl.main_list = "http://develop.hell0world.net/main/mobileAPI/v1.php";
}
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

let error_queue = false;
axios.interceptors.response.use(
  (response) => {
    if (response.data.type == "token") {
      if (error_queue) {
        console.log("토큰없음★", router.currentRoute.fullPath);
        Util.default.noticeMessage("로그인을 해주세요.");
        Util.default.logOut();
      }
      error_queue = true;
    }
    return response;
  },
  (error) => {
    console.log("에러일 경우", error.config);
    return Promise.reject(error);
  }
);
import Fragment from "vue-fragment";
import * as Util from "@/assets/js/util.js";
Vue.use(Fragment.Plugin);
Vue.prototype.$Util = Util;
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$ApiUrl = ApiUrl;
Vue.prototype.$axios = axios;
Vue.use(CKEditor);
Vue.use(VueMq, {
  breakpoints: {
    mobile: 768,
    tablet: 769,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
