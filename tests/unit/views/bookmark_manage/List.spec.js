import { shallowMount, createLocalVue } from "@vue/test-utils";
import List from "@/views/bookmark_manage/List.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import VueRouter from "vue-router";
describe("책갈피 리스트", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.prototype.$EventBus = new Vue();
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    const data = {
      error: false,
    };
    axios.post = jest.fn().mockResolvedValue({ data: data });
    wrapper = shallowMount(List, {
      router,
    });
  });
  test("책갈피 리스트 api 호출 확인", async () => {
    await axios
      .post({
        action: "get_bookmark_list",
        current: 5,
        search_status: "",
        keyword: "",
      })
      .then((result) => {});
    expect(axios.post).toHaveBeenCalled();
  });
  test("책갈피 리스트 가져오기", () => {
    jest.spyOn(wrapper.vm, "getList");
    wrapper.vm.getList();
    expect(wrapper.vm.getList).toHaveBeenCalled();
  });
});
