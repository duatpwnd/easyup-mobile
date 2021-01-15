import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import Apiurl from "@/assets/js/api_url.js";
import { Route } from "vue-router";
import GlobalPlugin from "@/plugin/global_plugin.ts"
import VueCookies, { VueCookies } from "vue-cookies";
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
// Expansion
const EventBus = new Vue();
declare module "vue/types/vue" {
  interface Vue {
    $numberWithCommas, $confirmMessage, $noticeMessage:GlobalPlugin;
    $router: VueRouter;
    $route: Route;
    $axios: Axios;
    $ApiUrl: Apiurl;
    $EventBus: EventBus;
    $cookies:VueCookies;
  }
}
