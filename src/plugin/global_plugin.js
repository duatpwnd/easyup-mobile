import VueCookies from "vue-cookies";
import store from "@/store/index.js";
import { router } from "@/router/index.js";
export default {
  install(Vue, options) {
    Vue.noticeMessage = (msg) => {
      store.commit("toggleStore/Toggle", {
        notice_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    // 전역수준의 로그아웃 (토큰이없을경우 인터셉터로 마지막 url 기억해주고 로그아웃시키기)
    Vue.logOut = () => {
      router.push({
        path: "/",
        query: {
          referer: store.state.userStore.referer,
        },
      });
      VueCookies.remove("user_info");
      store.commit("userStore/loginToken", {
        access_token: null,
        info: "",
      });
    };

    Vue.directive("my-directive", {
      bind(el, binding, vnode, oldVnode) {
        el.style.color = "red";
      },
    });
    Vue.mixin({
      created: function() {},
    });
    // 경고 메시지
    Vue.prototype.$noticeMessage = (msg) => {
      store.commit("toggleStore/Toggle", {
        notice_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    // 안내 메시지
    Vue.prototype.$confirmMessage = (msg) => {
      store.commit("toggleStore/Toggle", {
        confirm_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    // hh.mm.ss to ss
    Vue.prototype.$hms_to_s = (hms) => {
      const a = hms.split(":"); // split it at the colons
      const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      return seconds;
    };
    // hh mm ss
    Vue.prototype.$getTimeStringSeconds = (seconds) => {
      let hour, min, sec;
      hour = parseInt(seconds / 3600);
      min = parseInt((seconds % 3600) / 60);
      sec = seconds % 60;
      if (hour.toString().length == 1) hour = "0" + hour;
      if (min.toString().length == 1) min = "0" + min;
      if (sec.toString().length == 1) sec = "0" + sec;
      return hour + ":" + min + ":" + sec;
    };
    // 로그아웃
    Vue.prototype.$logOut = () => {
      router.push({
        path: "/",
        query: {
          referer: router.currentRoute.fullPath,
        },
      });
      VueCookies.remove("user_info");
      store.commit("userStore/loginToken", {
        access_token: null,
        info: "",
      });
    };
  },
};
