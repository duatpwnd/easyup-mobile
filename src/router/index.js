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
    beforeEnter(to, from, next) {
      if (VueCookies.get("access_token")) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/signupComplete",
    name: "signupComplete",
    component: () => import("../views/SignUpComplete.vue"),
    meta: { isFooter: false },
    // beforeEnter(to, from, next) {
    //   if (VueCookies.get("access_token")) {
    //     next("/");
    //   } else {
    //     next();
    //   }
    // },
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
    meta: { isFooter: true, unauthorized: true },
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
        meta: { isFooter: true, unauthorized: true },
      },
      {
        path: "notice/read",
        component: () => import("@/views/service_center/NoticeRead.vue"),
        name: "helpNoticeRead",
        meta: { isFooter: true, unauthorized: true },
      },
      {
        path: "faq",
        component: () => import("@/views/service_center/Faq.vue"),
        name: "helpFaq",
        meta: { isFooter: true, unauthorized: true },
      },
      {
        path: "qna",
        component: () => import("@/views/service_center/Qna.vue"),
        name: "helpQna",
        meta: { isFooter: true, unauthorized: true },
      },
    ],
  },

  {
    path: "/lecDetail",
    name: "lecDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
    meta: { isFooter: true, unauthorized: true },
  },

  {
    path: "/courseDetail",
    name: "courseDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CourseDetail.vue"),
    meta: { isFooter: true, unauthorized: true },
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../views/LectureList.vue"),
    meta: { isFooter: true, unauthorized: true },
  },
  {
    path: "/course",
    name: "course",
    component: () => import("../views/LectureList.vue"),
    meta: { isFooter: true, unauthorized: true },
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
    redirect: "/myClass/lecture",

    component: () => import("../views/MyLecCouse.vue"),
    children: [
      {
        path: "lecture",
        component: () => import("../views/myclass/Lecture.vue"),
        name: "myClassLecture",
        meta: { GnbBottomMenu: true },
      },
      {
        path: "course",
        name: "myClassCourse",
        component: () => import("@/views/myclass/Course.vue"),
        meta: { GnbBottomMenu: true },
      },
    ],
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
    redirect: "/dataShare/sent",
    component: () => import("../views/DataShare.vue"),
    children: [
      {
        path: "sent",
        name: "dataShareSentList",
        component: () => import("@/views/data_share/Tab.vue"),
        meta: { GnbBottomMenu: true, type: "sent" },
      },
      {
        path: "received",
        name: "dataShareReceivedList",
        component: () => import("@/views/data_share/Tab.vue"),
        meta: { GnbBottomMenu: true, type: "received" },
      },
    ],
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
    path: "/uniJob",
    name: "uniJob",
    component: () => import("../views/UniJob.vue"),
    redirect: "/uniJob/resume",
    children: [
      {
        path: "resume",
        name: "resume",
        component: () => import("@/views/unijob/Tab.vue"),
        meta: { isFooter: true },
      },
      {
        path: "jobmatching",
        name: "jobmatching",
        component: () => import("@/views/unijob/Tab.vue"),
        meta: { isFooter: true },
      },
      {
        path: "read",
        name: "uniJobRead",
        component: () => import("@/views/unijob/UniJobRead.vue"),
        meta: { isFooter: true },
      },
      {
        path: "register",
        name: "uniJobRegister",
        component: () => import("@/views/unijob/UniJobRegister.vue"),
        meta: { isFooter: true },
      },
    ],
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
    redirect: "/msg/receivedList",
    component: () => import("../views/Message.vue"),
    children: [
      {
        path: "receivedList",
        name: "received",
        component: () => import("@/views/message/Tab.vue"),
        meta: { ProfileMsgTab: true },
      },
      {
        path: "sentList",
        name: "sent",
        component: () => import("@/views/message/Tab.vue"),
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
  {
    path: "/ReissuePw",
    name: "ReissuePw",
    component: () => import("../views/ReissuePw.vue"),
    meta: { isFooter: false },
  },
  {
    path: "/settlementAndPayment",
    name: "settlementAndPayment",
    redirect: "/settlementAndPayment/settleList",
    component: () => import("../views/SettlementAndPayment.vue"),
    children: [
      {
        path: "settleList",
        name: "settleList",
        component: () => import("@/views/settlement_payment/SettleList.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "detail", //상세내역
        name: "detail",
        component: () => import("@/views/settlement_payment/Detail.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "paymentDetail", //결제내역
        name: "paymentDetail",
        component: () => import("@/views/settlement_payment/PaymentDetail.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "payList",
        name: "payList",
        components: {
          Search: () => import("@/components/SettlementAndPayment/Search.vue"),
          PayList: () => import("@/views/settlement_payment/PayList.vue"),
        },
        meta: { GnbBottomMenu: true },
      },
    ],
  },
  {
    path: "/purchase",
    name: "purchase",
    redirect: "/purchase/list",
    component: () => import("@/views/PurchaseDetail.vue"),
    children: [
      {
        path: "list",
        name: "purchaseDetailList",
        component: () => import("@/views/purchase_detail/List.vue"),
        meta: { GnbBottomMenu: true },
      },
      {
        path: "detail",
        name: "purchaseDetail",
        component: () => import("@/views/purchase_detail/Detail.vue"),
        meta: { GnbBottomMenu: true },
      },
    ],
  },
  // 쿠폰관리 학생
  {
    path: "/couponManage/student",
    name: "couponManageStudent",
    component: () => import("@/views/CouponManageStudent.vue"),
    meta: { GnbBottomMenu: true },
  },
  // 쿠폰관리 강사
  {
    path: "/couponManageTeacher/list",
    name: "couponManageTeacherList",
    component: () => import("@/views/couponManageTeacherList.vue"),
    meta: { GnbBottomMenu: true },
  },
  // 쿠폰 내역
  {
    path: "/couponManageTeacher/detail",
    name: "couponManageTeacherDetail",
    component: () => import("@/views/couponManageTeacherDetail.vue"),
    meta: { GnbBottomMenu: true },
  },
  // 쿠폰 등록
  {
    path: "/couponManageTeacher/register",
    name: "couponManageTeacherRegister",
    component: () => import("@/views/couponManageTeacherRegister.vue"),
    meta: { GnbBottomMenu: true },
  },
  // 강의 바구니
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
    meta: { isFooter: true, unauthorized: true },
  },
  // 강의 바구니 에서 결제하기
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order.vue"),
    meta: { isFooter: true, unauthorized: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: "ignore",
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from);
    if (to.name == "lecDetail" && from.name == "myClassLecture") {
      return { x: 0, y: 9999 };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (VueCookies.get("user_info")) {
    store.commit("userStore/loginToken", VueCookies.get("user_info"));
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
  next();
});
export { router, routes };
