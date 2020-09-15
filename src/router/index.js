import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: { isFooter: true },
  },
  {
    path: "/signup",
    name: "회원가입",
    component: () => import("../views/SignUp.vue"),
    meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
  },
  {
    path: "/signup_complete",
    name: "회원가입 완료",
    component: () => import("../views/SignUpComplete.vue"),
    meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
  },
  {
    path: "/pw_change",
    name: "비밀번호 변경",
    component: () => import("../views/PwChange.vue"),
    meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
  },
  {
    path: "/lecDetail",
    name: "강의상세페이지",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/lecture_type3",
    name: "번역강의",
    component: () => import("../views/LecList.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/teacherClassRoom",
    name: "내강의실(선생님)",
    component: () => import("../views/TeacherRoom.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/studentClaasRoom",
    name: "내강의실(학생)",
    component: () => import("../views/StudentRoom.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/myclass",
    name: "내강좌/코스",
    component: () => import("../views/MyLecCouse.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/teskboard",
    name: "과제게시판",
    component: () => import("../views/TeskBoard.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/components/teskboard/list.vue"),
        name: "리스트",
        meta: { gnbBottomMenu: true },
      },
      {
        path: "read",
        name: "읽기",
        component: () => import("@/components/teskboard/read.vue"),
        meta: { gnbBottomMenu: true },
      },
    ],
  },
  {
    path: "/teskregister",
    name: "과제등록",
    component: () => import("../views/TeskRegister.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/notice",
    name: "공지사항",
    component: () => import("../views/Notice.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/components/notice/list.vue"),
        name: "공지사항 리스트",
        meta: { gnbBottomMenu: true },
      },
      {
        path: "read",
        name: "공지사항 읽기",
        component: () => import("@/components/notice/read.vue"),
        meta: { gnbBottomMenu: true },
      },
    ],
  },

  {
    path: "/noticeRegister",
    name: "공지사항 등록",
    component: () => import("../views/NoticeRegister.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/dataShare",
    name: "자료공유",
    component: () => import("../views/DataShare.vue"),
    children: [
      {
        path: "list",
        name: "자료공유 리스트",
        component: () => import("@/components/data_share/list.vue"),
        meta: { gnbBottomMenu: true },
      },
      {
        path: "upload",
        name: "업로드",
        component: () => import("@/components/data_share/upload.vue"),
        meta: { gnbBottomMenu: true },
      },
    ],
  },
  {
    path: "/play",
    name: "플레이어",
    component: () => import("../views/Player.vue"),
    meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
  },
  {
    path: "/profileModify",
    name: "프로필편집",
    component: () => import("../views/ProfileModify.vue"),
    meta: { profileMsgTab: true },
  },
  {
    path: "/msg",
    name: "메세지",
    component: () => import("../views/Message.vue"),
    children: [
      {
        path: "list",
        name: "메세지 리스트",
        component: () => import("@/components/message/list.vue"),
        meta: { profileMsgTab: true },
      },
      {
        path: "read",
        name: "메세지 읽기",
        component: () => import("@/components/message/read.vue"),
        meta: { profileMsgTab: true },
      },
      {
        path: "newMessage",
        name: "새메시지",
        component: () => import("@/components/message/new_message.vue"),
        meta: { profileMsgTab: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: "ignore",
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.meta.isFooter == false &&
    to.meta.gnbBottomMenu == false &&
    to.meta.profileMsgTab == false
  ) {
    store.commit("isFooter", false);
    store.commit("GnbBottomMenu", false);
    store.commit("ProfileMsgTab", false);
  } else if (to.meta.isFooter) {
    store.commit("isFooter", true);
    store.commit("GnbBottomMenu", false);
    store.commit("ProfileMsgTab", false);
  } else if (to.meta.gnbBottomMenu) {
    store.commit("GnbBottomMenu", true);
    store.commit("isFooter", false);
    store.commit("ProfileMsgTab", false);
  } else if (to.meta.profileMsgTab) {
    store.commit("ProfileMsgTab", true);
    store.commit("GnbBottomMenu", false);
    store.commit("isFooter", false);
  }
  next();
});
export default router;
