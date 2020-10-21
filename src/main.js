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
// NODE_ENV = '앱실행모드'
console.log("앱실행모드:", process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://develop.hell0world.net";
}
axios.interceptors.request.use(
  (config) => {
    // console.log("http요청전", config);
    // config.headers.Authorization = "Bearer " + VueCookies.get("access_token");

    // config.headers.access_token = VueCookies.get("access_token");
    // config.headers.refresh_token = VueCookies.get("refresh_token");
    // if (
    //   VueCookies.get("access_token") === null &&
    //   VueCookies.get("refresh_token") === null
    // ) {
    //   // 로그아웃 분기
    // }
    return config;
  },
  (error) => {
    console.log(error);
    // Do something with request error
    // return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // console.log("http요청후", response, response.data.error);
    if (response.data.type == "token") {
      console.log("토큰없음");
      Util.default.noticeMessage("로그인을 해주세요.");
      Util.default.logOut();
      router.push({
        path: "/",
        query: {
          referer: router.currentRoute.fullPath,
        },
      });
      // router.push("/");
      // VueCookies.remove("access_token");
      // store.commit("userStore/loginToken", null);
    }
    return response;
  },
  (error) => {
    // 해당토큰이 유효하지 않은경우 access token 발급요청
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
