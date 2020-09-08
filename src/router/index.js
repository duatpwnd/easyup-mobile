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
  },
  {
    path: "/lecDetail",
    name: "lecture_detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
  },
  {
    path: "/lecture_type3",
    name: "translation_lecture",
    component: () => import("../views/LecList.vue"),
  },
  {
    path: "/mylecture1",
    name: "my_lecture_room_teacher",
    component: () => import("../views/MyLectureRoom.vue"),
    meta: { isfooter: false },
  },
  {
    path: "/myclass",
    name: "",
    component: () => import("../views/MyLecCouse.vue"),
    meta: { isfooter: false },

    // children: [
    //   {
    //     path: "myclass",
    //     component: () => import("../views/MyClass.vue"),
    //   },
    //   {
    //     path: "board",
    //     component: () => import("../views/Board.vue"),
    //   },
    //   {
    //     path: "notice",
    //     component: () => import("../views/Notice.vue"),
    //   },
    //   {
    //     path: "share",
    //     component: () => import("../views/DataShare.vue"),
    //   },
    // ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: "ignore",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.isfooter == false) {
    store.commit("isFooter", false);
  } else {
    store.commit("isFooter", true);
  }
  next();
});
export default router;
