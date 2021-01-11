import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import Apiurl from "@/assets/js/api_url.js"
import {Route} from 'vue-router'
declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}
// Expansion
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $axios:Axios,
    $ApiUrl:Apiurl
  }
}