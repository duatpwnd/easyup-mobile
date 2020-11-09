import VueCookies from "vue-cookies";
import store from "@/store/index.js";
import { router } from "@/router/index.js";

class App {
  // 로그아웃
  // static logOut() {
  //   router.push({
  //     path: "/",
  //     query: {
  //       referer: router.currentRoute.fullPath,
  //     },
  //   });
  //   VueCookies.remove("user_info");
  //   store.commit("userStore/loginToken", {
  //     access_token: null,
  //     info: "",
  //   });
  // }
}

export default App;
