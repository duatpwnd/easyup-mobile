import { shallowMount } from "@vue/test-utils";
import LostPassword from "@/views/LostPassword.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";
import GlobalUrl from "@/plugin/global_plugin.js";
describe("LostPassword.vue", () => {
  let wrapper;
  // 이메일 정규식
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    Vue.prototype.$GlobalUrl = GlobalUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    wrapper = shallowMount(LostPassword, { router });
  });
  test("이메일 주소를 입력할 경우", () => {
    wrapper.vm.email = "duatpwnd1@naver.com";
    expect(wrapper.vm.email.length).toBeGreaterThan(0);
    expect(wrapper.vm.email).toMatch(regExp);
  });
});
