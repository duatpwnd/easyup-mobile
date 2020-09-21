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
    path: "/findByEmail",
    name: "이메일로 비밀번호 임시 발급",
    component: () => import("../views/FindByEmail.vue"),
    meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
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
        component: () => import("@/views/service_center/notice_list.vue"),
        name: "고객센터 공지사항 리스트",
        meta: { isFooter: true },
      },
      {
        path: "notice/read",
        component: () => import("@/views/service_center/notice_read.vue"),
        name: "고객센터 공지사항 리스트",
        meta: { isFooter: true },
      },
      {
        path: "faq",
        component: () => import("@/views/service_center/faq.vue"),
        name: "faq",
        // redirect: "/help/faq/all",
        // children: [
        //   {
        //     path: "all",
        //     component: () => import("@/views/service_center/faq/all.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        //   {
        //     path: "info",
        //     component: () => import("@/views/service_center/faq/info.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        //   {
        //     path: "register",
        //     component: () => import("@/views/service_center/faq/register.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        //   {
        //     path: "subscribe",
        //     component: () => import("@/views/service_center/faq/subscribe.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        //   {
        //     path: "view",
        //     component: () => import("@/views/service_center/faq/view.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        //   {
        //     path: "ex",
        //     component: () => import("@/views/service_center/faq/ex.vue"),
        //     name: "고객센터 공지사항 리스트",
        //     meta: { isFooter: true },
        //   },
        // ],
      },
      {
        path: "qna",
        component: () => import("@/views/service_center/qna.vue"),
        name: "qna",
        meta: { isFooter: true },
      },
    ],
  },

  {
    path: "/lecDetail",
    name: "강의상세페이지",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
    meta: { isFooter: true },
  },

  {
    path: "/courseDetail",
    name: "코스상세페이지",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CourseDetail.vue"),
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
    redirect: "/teskboard/list",
    component: () => import("../views/TeskBoard.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/views/teskboard/list.vue"),
        name: "리스트",
        meta: { gnbBottomMenu: true },
      },
      {
        path: "read",
        name: "읽기",
        component: () => import("@/views/teskboard/read.vue"),
        meta: { gnbBottomMenu: true },
      },
      {
        path: "teskregister",
        name: "과제등록",
        component: () => import("@/views/teskboard/TeskRegister.vue"),
        meta: { gnbBottomMenu: true, notice: false },
      },
    ],
  },

  {
    path: "/notice",
    name: "공지사항",
    redirect: "/notice/list",
    component: () => import("../views/Notice.vue"),
    children: [
      {
        path: "list",
        component: () => import("@/views/notice/list.vue"),
        name: "공지사항 리스트",
        meta: { gnbBottomMenu: true },
      },
      {
        path: "read",
        name: "공지사항 읽기",
        component: () => import("@/views/notice/read.vue"),
        meta: { gnbBottomMenu: true },
      },
      {
        path: "noticeRegister",
        name: "공지사항 등록",
        component: () => import("../views/notice/NoticeRegister.vue"),
        meta: { gnbBottomMenu: true, notice: false },
      },
    ],
  },

  {
    path: "/dataShare",
    name: "자료공유",
    component: () => import("../views/DataShare.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/dataShare/upload",
    name: "업로드",
    component: () => import("@/views/data_share/upload.vue"),
    meta: { gnbBottomMenu: true },
  },
  {
    path: "/bookmark_manage",
    name: "책갈피 관리",
    redirect: "/bookmark_manage/list",
    component: () => import("@/views/BookmarkManage.vue"),
    children: [
      {
        path: "list",
        name: "책갈피 리스트",
        component: () => import("@/views/bookmark_manage/list.vue"),
        meta: { gnbBottomMenu: true },
      },
      {
        path: "read",
        name: "책갈피 메모읽기",
        component: () => import("@/views/bookmark_manage/read.vue"),
        meta: { gnbBottomMenu: true },
      },
      {
        path: "add",
        name: "책갈피 메모추가",
        component: () => import("@/views/bookmark_manage/add.vue"),
        meta: { gnbBottomMenu: true },
      },
    ],
  },
  {
    path: "/techBlog",
    name: "기술블로그",
    redirect: "/techBlog/list",
    component: () => import("@/views/TechBlog.vue"),
    children: [
      {
        path: "list",
        name: "기슬블로그 리스트",
        component: () => import("@/views/techblog/list.vue"),
        meta: { isFooter: false, gnbBottomMenu: false, profileMsgTab: false },
      },
      {
        path: "read",
        name: "기슬블로그 읽기",
        component: () => import("@/views/techblog/read.vue"),
        meta: { isFooter: true },
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
    redirect: "/msg/list",
    component: () => import("../views/Message.vue"),
    children: [
      {
        path: "list",
        name: "메세지 리스트",
        component: () => import("@/views/message/list.vue"),
        meta: { profileMsgTab: true },
      },
      {
        path: "read",
        name: "메세지 읽기",
        component: () => import("@/views/message/read.vue"),
        meta: { profileMsgTab: true },
      },
      {
        path: "newMessage",
        name: "새메시지",
        component: () => import("@/views/message/new_message.vue"),
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
