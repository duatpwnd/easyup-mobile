import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.js";
import MockAdapter from "axios-mock-adapter";
const VueCookies = require("vue-cookies");
describe("Main.vue", () => {
  let wrapper;
  beforeAll(() => {
    const data = {
      data: [
        {
          id: 11542,
          price: {
            discount: 0,
            discount_price: 0,
            discount_type: "total",
            final: 0,
            final_already: 0,
            format_final: "-",
            format_final_already: "",
            format_original: "-",
            is_discount: false,
            is_free: true,
            original: 0,
          },
          image_url:
            "http://develop.hell0world.net:5580/main/img/session_default.png",
          ranking: 3,
          teachers: "이지업",
          title: "234",
        },
      ],
    };
    const mock = new MockAdapter(axios);
    mock.onPost(ApiUrl.mobileAPI_v1).reply(200, data);
  });
  beforeEach(() => {
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    Vue.prototype.$cookies = VueCookies;
    wrapper = mount(Main);
  });

  // call 직접호출, inovke 간접호출
  test("메인페이지 인기강의, 추천강의, 이지채널, 최신강의, 인기코스 리스트 가져오기", () => {
    jest.spyOn(wrapper.vm, "getLectureList");
    wrapper.vm.getLectureList();
    expect(wrapper.vm.getLectureList).toHaveBeenCalled();
  });
});
