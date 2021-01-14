"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VueCookies = require("vue-cookies");
var store = require("@/store").default;
var router = require("@/router/index.js").router;
exports.default = {
  install: function(Vue) {
    Vue.noticeMessage = function(msg) {
      store.commit("toggleStore/Toggle", {
        notice_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    Vue.logOut = function() {
      router
        .push({
          path: "/",
        })
        .catch(function() {});
      VueCookies.remove("user_info");
      store.commit("userStore/loginToken", {
        access_token: null,
        info: "",
      });
    };
    // Vue.directive("my-directive", {
    //   bind(el, binding, vnode, oldVnode) {
    //     el.style.color = "red";
    //   },
    // });
    Vue.mixin({
      created: function() {},
    });
    // 로그인 모달 닫기
    Vue.prototype.$loginModalClose = function() {
      store.commit("toggleStore/Toggle", {
        login_modal: false,
      });
    };
    // 경고 메시지
    Vue.prototype.$noticeMessage = function(msg) {
      store.commit("toggleStore/Toggle", {
        notice_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    // 안내 메시지
    Vue.prototype.$confirmMessage = function(msg) {
      store.commit("toggleStore/Toggle", {
        confirm_modal: true,
      });
      store.commit("toggleStore/noticeMessage", msg);
    };
    // hh.mm.ss to ss
    Vue.prototype.$hms_to_s = function(hms) {
      var a = hms.split(":"); // split it at the colons
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      return seconds;
    };
    // hh mm ss
    Vue.prototype.$getTimeStringSeconds = function(seconds) {
      var hour, min, sec;
      hour = Math.floor(seconds / 3600);
      min = Math.floor((seconds % 3600) / 60);
      sec = seconds % 60;
      if (hour.toString().length == 1) hour = "0" + hour;
      if (min.toString().length == 1) min = "0" + min;
      if (sec.toString().length == 1) sec = "0" + sec;
      return hour + ":" + min + ":" + sec;
    };
    // Number comma
    Vue.prototype.$numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    // 로그아웃
    Vue.prototype.$logOut = function() {
      router
        .push({
          path: "/",
        })
        .catch(function() {});
      VueCookies.remove("user_info");
      store.commit("userStore/referer", "");
      store.commit("userStore/loginToken", {
        access_token: null,
        info: "",
      });
    };
    // 데이트 포맷
    Vue.prototype.$dateFormat = function(a) {
      var date = new Date(a);
      if (a == undefined) {
        date = new Date();
      }
      var year = date.getFullYear();
      var month = new String(date.getMonth() + 1);
      var day = new String(date.getDate());
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    };
  },
};
