import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/login/LoginForm.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
const VueCookies = require("vue-cookies");
describe("로그인 FORM", () => {
  let wrapper;
  const id = "test";
  const pw = "test";
  const mockStore = { commit: jest.fn() };
  beforeEach(() => {
    wrapper = shallowMount(LoginForm, {
      mocks: {
        $EventBus: new Vue(),
        $axios: axios,
        $cookies: VueCookies,
        $ApiUrl: ApiUrl,
        $store: mockStore,
        $router: VueRouter,
      },
    });
  });
  test("아이디 및 비밀번호 미입력시", () => {
    expect(wrapper.vm.userid.trim().length).toBe(0);
    expect(wrapper.vm.userpw.trim().length).toBe(0);
  });
  test("패스워드가 일치하지 않을경우", () => {
    wrapper.setData({ userpw: "test" });
    expect(wrapper.vm.userpw).toEqual(pw);
  });
  test("로그인 성공", async () => {
    jest.spyOn(wrapper.vm, "login");
    wrapper.setData({ userid: "test", userpw: "test" });
    expect(wrapper.vm.userid).toEqual(id);
    expect(wrapper.vm.userpw).toEqual(pw);
    axios.post = jest.fn().mockResolvedValue({
      data: {
        error: false,
        data: [{ token: "test", userinfo: { name: "test" } }], // 커밋할때 커밋할데이터도 같이보내줘야 호출이됨. 같이 안뿌려줘서 계속 호출이 안됨
      },
    });
    wrapper.vm.login();
  });
  test("userStore/loginToken 커밋 호출 여부 확인", () => {
    expect(mockStore.commit.mock.calls).toHaveLength(1);
    expect(mockStore.commit).toHaveBeenCalledWith("userStore/loginToken", {
      token: "test",
      userinfo: { name: "test" },
    });
  });
});
