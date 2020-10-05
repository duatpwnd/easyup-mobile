import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueMq from "vue-mq";
import CKEditor from "ckeditor4-vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(
  async (config) => {
    console.log(config);
    config.headers.access_token = VueCookies.get("access_token");
    config.headers.refresh_token = VueCookies.get("refresh_token");
    // if (
    //   VueCookies.get("access_token") === null &&
    //   VueCookies.get("refresh_token") === null
    // ) {
    //   // 로그아웃 분기
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  async (error) => {
    console.log("에러일 경우", error.config);
    // const errorAPI = error.config;
    // if (error.response.data.status === 401 && errorAPI.retry === undefined) {
    //   errorAPI.retry = true;
    //   console.log("토큰이 이상한 오류일 경우");
    //   await refreshToken();
    //   return await axios(errorAPI);
    // }
    return Promise.reject(error);
  }
);
import ApiUrl from "@/assets/js/api_url.js";
import Fragment from "vue-fragment";
import * as Util from "@/assets/js/util.js";
Vue.use(Fragment.Plugin);
Vue.prototype.$Util = Util;
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$Apiurl = ApiUrl;
Vue.prototype.$axios = axios;
Vue.use(CKEditor);
Vue.use(VueMq, {
  breakpoints: {
    mobile: 768,
    tablet: 769,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
