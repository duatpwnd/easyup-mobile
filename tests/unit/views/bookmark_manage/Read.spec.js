import { shallowMount } from "@vue/test-utils";
import Read from "@/views/bookmark_manage/Read.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
describe("책갈피 읽기", () => {
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
    wrapper = shallowMount(Read, {
      router,
      mocks: {
        $EventBus: new Vue(),
        $axios: axios,
        $ApiUrl: ApiUrl,
      },
    });
  });
  test("책갈피 읽기 함수 호출", () => {
    jest.spyOn(wrapper.vm, "bookmarkRead");
    wrapper.vm.bookmarkRead();
    expect(wrapper.vm.bookmarkRead).toHaveBeenCalled();
  });
  test("책갈피 삭제", () => {
    jest.spyOn(wrapper.vm, "deleteBookmark");
    wrapper.vm.deleteBookmark();
    expect(wrapper.vm.deleteBookmark).toHaveBeenCalled();
  });
});
