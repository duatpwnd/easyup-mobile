import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import routes from "@/router/index.js";
import List from "@/views/techblog/list.vue";
const localVue = createLocalVue();
localVue.use(VueRouter);
describe("App", () => {
  it("라우팅을 통해서 자식 컴포넌트를 렌더한다", async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, {
      localVue,
      router,
    });
    router.push("/techBlog/read");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(List).exists()).toBe(true);
  });
});
