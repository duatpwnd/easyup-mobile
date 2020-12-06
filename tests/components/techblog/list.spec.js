import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import { routes } from "@/router/index.js";
import List from "@/views/techblog/list.vue";
import Vuex from "vuex";
import store from "@/store/index.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueAwesomeSwiper);

describe.skip("App", () => {
  test("router push", () => {
    const router = new VueRouter({
      base: process.env.BASE_URL,
      routes,
      mode: "history",
    });
    const ListComponent = shallowMount(List, {
      router,
    });
    ListComponent.vm.goToPath();
    const wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    wrapper.vm.$nextTick();
    expect(router.currentRoute.path).toBe("/techBlog/read");
  });
});
