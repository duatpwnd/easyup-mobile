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
    name: "main-detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LecDetail.vue"),
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
