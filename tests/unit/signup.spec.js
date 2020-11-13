import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import SignUp from "@/views/SignUp.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";
describe("sign up", () => {
  let wrapper;
  function validationCheck(param) {
    if (param.trim().length == 0) {
      throw new Error("enter your firstname");
    }
  }
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
  test("validation check", () => {
    jest.spyOn(wrapper.vm, "register");
    expect(() => validationCheck(wrapper.vm.lastname).toThrow());
  });
});
