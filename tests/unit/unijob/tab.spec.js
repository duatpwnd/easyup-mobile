import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Tab from "@/views/unijob/Tab.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";

describe("Tab.vue", () => {
  // beforAll은 describe 전후로 호출
  beforeAll(async () => {
    console.log("beforeall 호출");
    const data = {
      data: [
        {
          id: 11542,
          title: "삭제된 게시물입니다.",
          writer: "정호 장",
          created_at: "2020-09-23 13:20:14",
          is_notice: "yes",
          is_reple: "no",
          is_possible: "normal",
          is_delete: "yes",
        },
      ],
    };
    const mock = new MockAdapter(axios);
    await mock.onPost(ApiUrl.mobileAPI_v1).reply(200, data);
  });
  let wrapper;
  // beforeEach는 test 전 후로 호출
  beforeEach(async () => {
    console.log("before each 호출");
    Vue.use(VueRouter);
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    router.push({
      name: "resume",
      query: {
        pageCurrent: 1,
        keyword: "",
      },
    });
    wrapper = shallowMount(Tab, { router });

    // await wrapper.vm.getList();
  });
  test("유니잡 이력서 조회", async () => {
    expect(wrapper.vm.list.length).toBeGreaterThan(0);
  });
});
