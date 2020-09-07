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
    path: "/main/detail",
<<<<<<< HEAD
    name: "main-detail",
=======
    name: "main_lec_detail",
>>>>>>> 17e0c4e00a191982b530709151c8805f87e86496
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
  },
<<<<<<< HEAD
=======
  {
    path: "/main/list",
    name: "main_lec_list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecList.vue"),
  },
>>>>>>> 17e0c4e00a191982b530709151c8805f87e86496
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
