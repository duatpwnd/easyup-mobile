import { shallowMount } from "@vue/test-utils";
import Tab from "@/views/unijob/Tab.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";
describe("Tab.vue", () => {
  let wrapper;
  // beforeEach는 test 전 후로 호출
  beforeEach(async () => {
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
    axios.post = jest.fn().mockResolvedValue({ data: data });
    wrapper = shallowMount(Tab, { router });
  });
  test("유니잡 이력서 조회", async () => {
    expect(wrapper.vm.list.length).toBeGreaterThan(0);
  });
});
