import { shallowMount, createLocalVue } from "@vue/test-utils";
import Add from "@/views/bookmark_manage/Add.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
describe("책갈피 추가", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
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
    wrapper = shallowMount(Add, {
      router,
      mocks: {
        $EventBus: new Vue(),
        $axios: axios,
        $ApiUrl: ApiUrl,
      },
    });
  });
  test("책갈피 읽기 함수 호출 성공", () => {
    jest.spyOn(wrapper.vm, "bookmarkRead");
    wrapper.vm.bookmarkRead();
    expect(wrapper.vm.bookmarkRead).toHaveBeenCalled();
  });
  test("책갈피 추가 함수 호출", () => {
    wrapper.vm.$refs.textarea.innerText = "test";
    jest.spyOn(wrapper.vm, "bookmarkAdd");
    wrapper.vm.bookmarkAdd();
    expect(wrapper.vm.bookmarkAdd).toHaveBeenCalled();
  });
});
