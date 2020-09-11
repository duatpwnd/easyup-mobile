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
    meta: { gnbBottomMenu: false },
  },
  {
    path: "/lecDetail",
    name: "강의상세페이지",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
    meta: { gnbBottomMenu: false },
  },
  {
    path: "/lecture_type3",
    name: "번역강의",
    component: () => import("../views/LecList.vue"),
    meta: { gnbBottomMenu: false },
  },
  {
    path: "/teacherClassRoom",
    name: "내강의실(선생님)",
    component: () => import("../views/TeacherRoom.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/studentClaasRoom",
    name: "내강의실(학생)",
    component: () => import("../views/StudentRoom.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/myclass",
    name: "내강좌/코스",
    component: () => import("../views/MyLecCouse.vue"),
    meta: { isFooter: false },
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
        meta: { isFooter: false },
      },
      {
        path: "read",
        name: "읽기",
        component: () => import("@/components/teskboard/read.vue"),
        meta: { isFooter: false },
      },
    ],
  },
  {
    path: "/teskregister",
    name: "과제등록",
    component: () => import("../views/TeskRegister.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/notice",
    name: "공지사항",
    component: () => import("../views/Notice.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/components/notice/list.vue"),
        name: "리스트",
        meta: { isFooter: false },
      },
      {
        path: "read",
        name: "읽기",
        component: () => import("@/components/notice/read.vue"),
        meta: { isFooter: false },
      },
    ],
  },

  {
    path: "/noticeRegister",
    name: "공지사항 등록",
    component: () => import("../views/NoticeRegister.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/dataShare",
    name: "자료공유",
    component: () => import("../views/DataShare.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/play",
    name: "플레이어",
    component: () => import("../views/Player.vue"),
    meta: { isFooter: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: "ignore",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.isFooter == false) {
    store.commit("isFooter", false);
    store.commit("GnbBottomMenu", true);
  } else {
    store.commit("isFooter", true);
    store.commit("GnbBottomMenu", false);
  }
  next();
});
export default router;
