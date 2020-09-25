import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import VueMq from "vue-mq";
import CKEditor from "ckeditor4-vue";
import axios from "axios";
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
    mobile_noti: 600,
    tablet: 900,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
