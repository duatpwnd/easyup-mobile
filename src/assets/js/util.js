import axios from "axios";
import ApiUrl from "./api_url.js";
import VueCookies from "vue-cookies";
import store from "@/store/index.js";
import { router } from "@/router/index.js";

class App {
  static test() {
    console.log("test");
  }
  static getLectureDetail(id) {
    console.log("정적메소드");
    // 강의 상세 조회
    const data = {
      action: "get_course_info",
      course_id: id,
    };
    axios.post(ApiUrl.main_list, JSON.stringify(data)).then((result) => {
      console.log("강의상세:", result.data.data);
      this.detail = result.data.data;
    });
  }
  static logOut() {
    VueCookies.remove("user_info");
    store.commit("userStore/loginToken", {
      access_token: null,
      info: "",
    });
    router.push("/").catch(() => {});
  }
}

export default App;
