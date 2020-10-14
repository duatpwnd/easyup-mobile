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
    VueCookies.remove("access_token");
    store.commit("userStore/loginToken", null);
    router.push("/").catch(() => {});
    return "sc";
  }
}

export default App;
