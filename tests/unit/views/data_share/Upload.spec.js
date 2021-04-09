import { shallowMount } from "@vue/test-utils";
import Upload from "@/views/data_share/Upload.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
describe("자료공유 업로드", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.prototype.$EventBus = new Vue();
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    router.push({
      query: {
        id: 1,
      },
    });
    wrapper = shallowMount(Upload, {
      router,
    });
  });
  test("파일 미선택시", () => {
    const fileName = wrapper.find(".file_name");
    fileName.innerText = "";
    expect(fileName.innerText.length).toBe(0);
  });
  test("파일 선택시", () => {
    const fileName = wrapper.find(".file_name");
    fileName.innerText = "test.png";
    expect(fileName.innerText.length).toBeGreaterThan(0);
  });
  test("공유 받을사람 미선택시", () => {
    expect(wrapper.vm.shared_recipients.length).toBe(0);
  });
  test("공유 받을사람 선택시", () => {
    wrapper.setData({ shared_recipients: [1, 2, 3, 4] });
    expect(wrapper.vm.shared_recipients.length).toBeGreaterThan(0);
  });
});
