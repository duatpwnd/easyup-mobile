const VueCookies = require("vue-cookies");
const store = require("@/store").default;
const router = require("@/router").router;
export default {
    install(Vue) {
        Vue.noticeMessage = (msg) => {
            store.commit("toggleStore/Toggle", {
                notice_modal: true,
            });
            store.commit("toggleStore/noticeMessage", msg);
        };
        Vue.logOut = () => {
            router
                .push({
                path: "/",
            })
                .catch(() => { });
            VueCookies.remove("user_info");
            store.commit("userStore/loginToken", {
                access_token: null,
                info: "",
            });
        };
        // 로그인 모달 닫기
        Vue.prototype.$loginModalClose = () => {
            store.commit("toggleStore/Toggle", {
                login_modal: false,
            });
        };
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
            hour = Math.floor(seconds / 3600);
            min = Math.floor((seconds % 3600) / 60);
            sec = seconds % 60;
            if (hour.toString().length == 1)
                hour = "0" + hour;
            if (min.toString().length == 1)
                min = "0" + min;
            if (sec.toString().length == 1)
                sec = "0" + sec;
            return hour + ":" + min + ":" + sec;
        };
        // Number comma
        Vue.prototype.$numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        // 로그아웃
        Vue.prototype.$logOut = () => {
            router
                .push({
                path: "/",
            })
                .catch(() => { });
            VueCookies.remove("user_info");
            store.commit("userStore/referer", "");
            store.commit("userStore/loginToken", {
                access_token: null,
                info: "",
            });
        };
        // 데이트 포맷
        Vue.prototype.$dateFormat = (a) => {
            let date;
            if (typeof a === "object") {
                date = new Date(a);
            }
            else {
                date = new Date();
            }
            const year = date.getFullYear();
            let month = new String(date.getMonth() + 1);
            let day = new String(date.getDate());
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            console.log(year + "-" + month + "-" + day);
            return year + "-" + month + "-" + day;
        };
    },
};
//# sourceMappingURL=global_plugin.js.map