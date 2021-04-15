import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import SignUp from "@/views/SignUp.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";

describe("SignUp.vue", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    wrapper = shallowMount(SignUp, { router });
  });
  test("성을 입력 안했을경우", () => {
    const lastName = wrapper.vm.lastname;
    expect(lastName.trim().length).toBe(0);
  });
  test("이름을 입력 안했을경우", () => {
    const firstName = wrapper.vm.firstname;
    expect(firstName.trim().length).toBe(0);
  });
  test("이메일을 입력 안했을경우", () => {
    const email = wrapper.vm.email;
    expect(email.trim().length).toBe(0);
  });
  test("비밀번호를 입력 안했을경우", () => {
    const pw1 = wrapper.vm.pw1;
    expect(pw1.trim().length).toBe(0);
  });
  test("비밀번호확인을 입력 안했을경우", () => {
    const pw2 = wrapper.vm.pw2;
    expect(pw2.trim().length).toBe(0);
  });
  test("비밀번호가 서로 다를 경우", () => {
    wrapper.setData({ pw1: "pw111", pw2: "pw222" });
    expect(wrapper.vm.pw1 == wrapper.vm.pw2).toBeFalsy();
  });
  test("약관 내용에 동의 안했을경우", () => {
    wrapper.setData({ agree: false });
    expect(wrapper.vm.agree).toBeFalsy();
  });

  test("유효성 체크 통과", () => {
    wrapper.setData({
      lastname: "염",
      firstname: "세중",
      email: "duatpwnd1@naver.com",
      pw1: "123",
      pw2: "123",
      agree: true,
    });
    const lastName = wrapper.vm.lastname;
    const firstName = wrapper.vm.firstname;
    const email = wrapper.vm.email;
    const pw1 = wrapper.vm.pw1;
    const pw2 = wrapper.vm.pw2;
    expect(lastName.trim().length).toBeGreaterThan(0);
    expect(firstName.trim().length).toBeGreaterThan(0);
    expect(email.trim().length).toBeGreaterThan(0);
    expect(pw1.trim().length).toBeGreaterThan(0);
    expect(pw2.trim().length).toBeGreaterThan(0);
    expect(wrapper.vm.pw1 == wrapper.vm.pw2).toBeTruthy;
    expect(wrapper.vm.agree).toBeTruthy();
  });
});
