import axios from "axios";
import ApiUrl from "./api_url.js";
import VueCookies from "vue-cookies";
import store from "@/store/index.js";
import { router } from "@/router/index.js";

class App {
  static noticeMessage(msg) {
    store.commit("toggleStore/Toggle", {
      notice_modal: true,
    });
    store.commit("toggleStore/noticeMessage", msg);
  }
  static getTimeStringSeconds(seconds) {
    let hour, min, sec;
    hour = parseInt(seconds / 3600);
    min = parseInt((seconds % 3600) / 60);
    sec = seconds % 60;
    if (hour.toString().length == 1) hour = "0" + hour;
    if (min.toString().length == 1) min = "0" + min;
    if (sec.toString().length == 1) sec = "0" + sec;
    return hour + ":" + min + ":" + sec;
  }
  static logOut() {
    VueCookies.remove("user_info");
    store.commit("userStore/loginToken", {
      access_token: null,
      info: "",
    });
    // router.push("/").catch(() => {});
  }
}

export default App;
