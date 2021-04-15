import { shallowMount } from "@vue/test-utils";
import LostPassword from "@/views/LostPassword.vue";
import Vue from "vue";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";
import GlobalUrl from "@/plugin/global_plugin.js";
describe("LostPassword.vue", () => {
  let wrapper;
  // 이메일 정규식
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  beforeEach(() => {
    wrapper = shallowMount(LostPassword, {
      mocks: {
        $EventBus: new Vue(),
        $axios: axios,
        $ApiUrl: ApiUrl,
        $GlobalUrl: GlobalUrl,
      },
    });
  });
  test("이메일 주소를 미입력할 경우", () => {
    expect(wrapper.vm.email.length).toBe(0);
  });
  test("이메일 주소를 입력할 경우", () => {
    wrapper.vm.email = "duatpwnd1@naver.com";
    expect(wrapper.vm.email.length).toBeGreaterThan(0);
    expect(wrapper.vm.email).toMatch(regExp);
  });
});
