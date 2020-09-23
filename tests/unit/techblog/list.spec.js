import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import router from "@/router";
import Vuex from "vuex";
import List from "@/views/techblog/list.vue";
import Read from "@/views/techblog/read.vue";
import store from "@/store/index.js";
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
describe("App", () => {
  it("라우팅을 통해서 자식 컴포넌트를 렌더한다", async () => {
    const wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    router.push("/techBlog/read");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Read).exists()).toBe(true);
  });
});
