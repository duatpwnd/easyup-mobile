import { shallowMount } from "@vue/test-utils";
import ReissuePw from "@/views/ReissuePw.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
const VueCookies = require("vue-cookies");
describe("비밀번호 재발급", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ReissuePw, {
      mocks: {
        $route: {
          query: { token: "abcdefg" },
        },
        $EventBus: {
          $on: jest.fn(),
          $off: jest.fn(),
          $emit: jest.fn(),
        },
        $axios: axios,
        $cookies: VueCookies,
        $ApiUrl: ApiUrl,
      },
    });
  });
  test("토큰 정보가 있으면 카운트 다운", () => {
    axios.post = jest.fn().mockResolvedValue({ data: { error: false } });
    expect(wrapper.vm.$route.query.token).toBeTruthy();
    if (wrapper.vm.$route.query.token) {
      jest.spyOn(wrapper.vm, "countdown");
      wrapper.vm.countdown();
      expect(wrapper.vm.countdown).toHaveBeenCalled();
    }
  });
  test("카운트 다운 00:00 일때", () => {
    wrapper.setData({ time: "00:00" });
    expect(wrapper.vm.time).toMatch("00:00");
    axios.post = jest.fn().mockResolvedValue({ data: { error: true } });
  });
});
