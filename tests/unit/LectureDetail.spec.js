import { shallowMount } from "@vue/test-utils";
import LecDetail from "@/views/LecDetail.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
import MyMixin from "@/views/mixins/lec_course_detail.ts";
import store from "@/store/index.ts";
const VueCookies = require("vue-cookies");
describe("강의 상세페이지", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.prototype.$cookies = VueCookies;
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
        name: "lecDetail",
        id: 1,
      },
    });
    wrapper = shallowMount(LecDetail, {
      mixins: [MyMixin],
      store,
      router,
    });
  });
  test("강의 || 코스 상세 조회", () => {
    jest.spyOn(wrapper.vm, "getDetail");
    wrapper.vm.getDetail();
    expect(wrapper.vm.getDetail).toHaveBeenCalled();
  });
  test("강의 바구니 담기", () => {
    const data = {
      error: false,
    };
    axios.post = jest.fn().mockResolvedValue({ data: data });
    axios
      .post({
        action: "add_cart",
        type: "lecDetail",
        id: 1,
      })
      .then((result) => {});
    expect(axios.post).toHaveBeenCalled();
    jest.spyOn(wrapper.vm, "cartAdd");
    wrapper.vm.cartAdd();
    expect(wrapper.vm.cartAdd).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith({
      action: "add_cart",
      type: "lecDetail",
      id: 1,
    });
  });
});
