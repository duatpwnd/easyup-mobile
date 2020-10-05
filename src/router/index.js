import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import VueCookies from "vue-cookies";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Main.vue"),
    meta: { isFooter: true, unauthorized: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp.vue"),
    meta: { isFooter: false, unauthorized: true },
  },
  {
    path: "/signupComplete",
    name: "signupComplete",
    component: () => import("../views/SignUpComplete.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/pwChange",
    name: "pwChange",
    component: () => import("../views/PwChange.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/lostPassword",
    name: "lostPassword",
    component: () => import("../views/LostPassword.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/policy",
    name: "policy",
    component: () => import("../views/Policy.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/help",
    name: "help",
    redirect: "/help/notice",
    component: () => import("../views/ServiceCenter.vue"),
    children: [
      {
        path: "notice",
        component: () => import("@/views/service_center/NoticeList.vue"),
        name: "helpNoticeList",
        meta: { isFooter: true },
      },
      {
        path: "notice/read",
        component: () => import("@/views/service_center/NoticeRead.vue"),
        name: "helpNoticeRead",
        meta: { isFooter: true },
      },
      {
        path: "faq",
        component: () => import("@/views/service_center/Faq.vue"),
        name: "helpFaq",
        meta: { isFooter: true },
      },
      {
        path: "qna",
        component: () => import("@/views/service_center/Qna.vue"),
        name: "helpQna",
        meta: { isFooter: true },
      },
    ],
  },

  {
    path: "/lecDetail",
    name: "lecDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
    meta: { isFooter: true },
  },

  {
    path: "/courseDetail",
    name: "courseDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CourseDetail.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../views/CategoryLecList.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/teacherClassRoom",
    name: "teacherClassRoom",
    component: () => import("../views/TeacherRoom.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/studentClaasRoom",
    name: "studentClaasRoom",
    component: () => import("../views/StudentRoom.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/myClass",
    name: "myClass",
    component: () => import("../views/MyLecCouse.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/teskboard",
    name: "teskBoard",
    redirect: "/teskboard/list",
    component: () => import("../views/TeskBoard.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/views/teskboard/list.vue"),
        name: "teskBoardList",
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "teskBoardRead",
        component: () => import("@/views/teskboard/read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "teskregister",
        name: "teskRegister",
        component: () => import("@/views/teskboard/TeskRegister.vue"),
        meta: { GnbBottomMenu: true, notice: false },
      },
    ],
  },

  {
    path: "/notice",
    name: "내강의실 공지사항",
    redirect: "/notice/list",
    component: () => import("../views/Notice.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/views/notice/List.vue"),
        name: "noticeList",
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "noticeRead",
        component: () => import("@/views/notice/Read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "noticeRegister",
        name: "noticeRegister",
        component: () => import("../views/notice/NoticeRegister.vue"),
        meta: { GnbBottomMenu: true, notice: false },
      },
    ],
  },

  {
    path: "/dataShare",
    name: "dataShare",
    component: () => import("../views/DataShare.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/dataShare/upload",
    name: "dataShareUpload",
    component: () => import("@/views/data_share/Upload.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/bookmarkManage",
    name: "bookmarkManage",
    redirect: "/bookmarkManage/list",
    component: () => import("@/views/BookmarkManage.vue"),
    children: [
      {
        path: "list",
        name: "bookmarkList",
        component: () => import("@/views/bookmark_manage/List.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "bookmarkRead",
        component: () => import("@/views/bookmark_manage/Read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "add",
        name: "bookmarkAdd",
        component: () => import("@/views/bookmark_manage/Add.vue"),
        meta: { GnbBottomMenu: true },
      },
    ],
  },
  {
    path: "/techBlog",
    name: "techBlog",
    redirect: "/techBlog/list",
    component: () => import("@/views/TechBlog.vue"),
    children: [
      {
        path: "list",
        name: "techBlogList",
        component: () => import("@/views/techblog/List.vue"),
        meta: { isFooter: false },
      },
      {
        path: "read",
        name: "techBlogRead",
        component: () => import("@/views/techblog/Read.vue"),
        meta: { isFooter: true },
      },
    ],
  },
  {
    path: "/play",
    name: "play",
    component: () => import("../views/Player.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/profileModify",
    name: "profileModify",
    component: () => import("../views/ProfileModify.vue"),
    meta: { ProfileMsgTab: true },
  },
  {
    path: "/msg",
    name: "msg",
    redirect: "/msg/list",
    component: () => import("../views/Message.vue"),
    children: [
      {
        path: "list",
        name: "msgList",
        component: () => import("@/views/message/List.vue"),
        meta: { ProfileMsgTab: true },
      },
      {
        path: "read",
        name: "msgRead",
        component: () => import("@/views/message/Read.vue"),
        meta: { ProfileMsgTab: true },
      },
      {
        path: "newMessage",
        name: "newMessage",
        component: () => import("@/views/message/NewMessage.vue"),
        meta: { ProfileMsgTab: true },
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

router.beforeEach(async (to, from, next) => {
  console.log("beforeEach");
  if (
    VueCookies.get("access_token") === null &&
    VueCookies.get("refresh_token") !== null
  ) {
    if (to.matched.some((record) => record.meta.unauthorized)) {
      if (to.path !== "/") {
        console.log("인증됬으니 가면 안됨", from);
        next("/");
      } else {
        next();
      }
    } else {
      console.log("엑세스 토큰 발급요청");
      next();
    }
  } else if (
    VueCookies.get("access_token") === null &&
    VueCookies.get("refresh_token") == null
  ) {
    if (to.matched.some((record) => record.meta.unauthorized)) {
      console.log("인증필요없음");
      next();
    } else {
      console.log("인증해주세요");
      next("/");
    }
  } else {
    console.log("엑세스토큰, 리프레시토큰 둘다있음");
    if (to.path !== "/") {
      console.log("인증됬으니 가면 안됨", from);
      next("/");
    } else {
      next();
    }
  }

  const arr = ["GnbBottomMenu", "isFooter", "ProfileMsgTab"];
  const result = arr.reduce((acc, el) => {
    if (el == Object.keys(to.meta)[0]) {
      acc[el] = Object.values(to.meta)[0];
    } else {
      acc[el] = false;
    }
    return acc;
  }, {});
  store.commit("toggleStore/Toggle", result);
});
export { router, routes };
