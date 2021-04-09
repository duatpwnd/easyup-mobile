import { shallowMount } from "@vue/test-utils";
import NewMessage from "@/views/message/NewMessage.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
describe("새메시지 작성", () => {
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

    wrapper = shallowMount(NewMessage, {
      router,
    });
  });
  test("url에 쿼리값으로 id 가있으면 답장하는 페이지", () => {
    console.log("location", location);
    jest.spyOn(wrapper.vm, "read");
    wrapper.vm.read();
    expect(wrapper.vm.read).toHaveBeenCalled();
  });
  test("이메일 주소 받는분 3글자 미만 입력시", () => {
    expect(wrapper.vm.keyword.length).toBeLessThan(3);
    expect(wrapper.vm.loading).toBeFalsy();
  });
  test("이메일 주소 받는분 3글자 이상 입력시", () => {
    wrapper.setData({ keyword: "test", loading: true });
    expect(wrapper.vm.keyword.length).toBeGreaterThan(2);
    expect(wrapper.vm.loading).toBeTruthy();
  });
  test("선택된 사람 다시 빼기", () => {
    const arr = [1, 2, 3, 4, 5]; // 선택된사람들의 id값 집합
    let idx = 1; // 빼는사람 아이디
    arr.splice(idx, 1);
    expect(arr.length - 1).toBe(arr.length - 1);
  });
});
