import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import { routes } from "@/router/index.js";
import Vuex from "vuex";
import Read from "@/views/techblog/read.vue";
import store from "@/store/index.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueAwesomeSwiper);
describe("App", () => {
  it("라우팅을 통해서 자식 컴포넌트를 렌더한다", async () => {
    const router = new VueRouter({ routes });
    // router.push("/techBlog/read");
    const wrapper = mount(App, {
      localVue,
      router,
      store,
    });

    await wrapper.vm.$nextTick();
    console.log(wrapper.html());
  });
});
