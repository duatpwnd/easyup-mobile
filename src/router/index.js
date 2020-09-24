import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Main.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/signup",
    name: "회원가입",
    component: () => import("../views/SignUp.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/signupComplete",
    name: "회원가입 완료",
    component: () => import("../views/SignUpComplete.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/pwChange",
    name: "비밀번호 변경",
    component: () => import("../views/PwChange.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/findByEmail",
    name: "이메일로 비밀번호 임시 발급",
    component: () => import("../views/FindByEmail.vue"),
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
        component: () => import("@/views/service_center/notice_list.vue"),
        name: "noticeList",
        meta: { isFooter: true },
      },
      {
        path: "notice/read",
        component: () => import("@/views/service_center/notice_read.vue"),
        name: "noticeRead",
        meta: { isFooter: true },
      },
      {
        path: "faq",
        component: () => import("@/views/service_center/faq.vue"),
        name: "faq",
        meta: { isFooter: true },
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
    name: "category_lecture",
    component: () => import("../views/CategoryLecList.vue"),
    meta: { isFooter: true },
  },
  {
    path: "/teacherClassRoom",
    name: "내강의실(선생님)",
    component: () => import("../views/TeacherRoom.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/studentClaasRoom",
    name: "내강의실(학생)",
    component: () => import("../views/StudentRoom.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/myClass",
    name: "내강좌/코스",
    component: () => import("../views/MyLecCouse.vue"),
    meta: { GnbBottomMenu: true },
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
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "읽기",
        component: () => import("@/views/teskboard/read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "teskregister",
        name: "과제등록",
        component: () => import("@/views/teskboard/TeskRegister.vue"),
        meta: { GnbBottomMenu: true, notice: false },
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
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "공지사항 읽기",
        component: () => import("@/views/notice/read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "noticeRegister",
        name: "공지사항 등록",
        component: () => import("../views/notice/NoticeRegister.vue"),
        meta: { GnbBottomMenu: true, notice: false },
      },
    ],
  },

  {
    path: "/dataShare",
    name: "자료공유",
    component: () => import("../views/DataShare.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/dataShare/upload",
    name: "업로드",
    component: () => import("@/views/data_share/upload.vue"),
    meta: { GnbBottomMenu: true },
  },
  {
    path: "/bookmarkManage",
    name: "책갈피 관리",
    redirect: "/bookmarkManage/list",
    component: () => import("@/views/BookmarkManage.vue"),
    children: [
      {
        path: "list",
        name: "책갈피 리스트",
        component: () => import("@/views/bookmark_manage/list.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "read",
        name: "책갈피 메모읽기",
        component: () => import("@/views/bookmark_manage/read.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "add",
        name: "책갈피 메모추가",
        component: () => import("@/views/bookmark_manage/add.vue"),
        meta: { GnbBottomMenu: true },
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
        meta: { isFooter: false },
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
    meta: { isFooter: false },
  },
  {
    path: "/profileModify",
    name: "프로필편집",
    component: () => import("../views/ProfileModify.vue"),
    meta: { ProfileMsgTab: true },
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
        meta: { ProfileMsgTab: true },
      },
      {
        path: "read",
        name: "메세지 읽기",
        component: () => import("@/views/message/read.vue"),
        meta: { ProfileMsgTab: true },
      },
      {
        path: "newMessage",
        name: "새메시지",
        component: () => import("@/views/message/new_message.vue"),
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
router.beforeEach((to, from, next) => {
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
  next();
});
export { router, routes };
