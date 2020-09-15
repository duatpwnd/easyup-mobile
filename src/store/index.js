import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFooter: true, // 푸터
    login_modal: false, // 로그인 모달
    before_login: true, // 로그인 전 모달
    gnb_bottom_menu: false, // 내강좌/코스, 과제게시판, 공지사항, 자료공유 메뉴
    profile_msg_tab: false, // 프로필 편집 ,메세지 탭
  },
  // getters: {
  //   getIsFooter(state) {
  //     console.log("state:", state);
  //     return state.isFooter;
  //   },
  // },
  mutations: {
    isFooter(state, boolean) {
      if (boolean == false) {
        state.isFooter = false;
      } else {
        state.isFooter = true;
      }
    },
    // 로그인 메뉴 토글
    LoginMenuToggle(state) {
      state.login_modal = !state.login_modal;
    },
    // 로그인 후 모달
    LoginModalChange(state, boolean) {
      if (boolean == false) {
        state.before_login = false;
      } else {
        state.before_login = true;
      }
    },
    GnbBottomMenu(state, boolean) {
      if (boolean == false) {
        state.gnb_bottom_menu = false;
      } else {
        state.gnb_bottom_menu = true;
      }
    },
    ProfileMsgTab(state, boolean) {
      if (boolean == false) {
        state.profile_msg_tab = false;
      } else {
        state.profile_msg_tab = true;
      }
    },
  },
  actions: {},
  modules: {},
});
