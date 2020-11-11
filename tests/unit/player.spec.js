import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Player from "@/views/Player.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import ApiUrl from "@/assets/js/api_url.js";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import store from "@/store";

describe("getPlayInfo", () => {
  let wrapper;
  beforeEach(async () => {
    Vue.use(VueRouter);
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    Vue.prototype.$EventBus = new Vue();
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    router.push({
      query: {
        course_id: 1,
        lp_id: 1,
        linkType: undefined,
      },
    });
    wrapper = shallowMount(Player, {
      store,
      router,
    });
    const mock = new MockAdapter(axios);
    const data = {
      data: {
        player_info: {
          course_id: 54,
          course_code: "PY05",
          title: "혼자 공부하는 파이썬 (하)",
          lp_mode: "embedded",
          percent: [
            //진도율 퍼센터
            "27",
            "%",
          ],
          total_items: 26, //총 강의수
          complete_items: 7, //현재까지 진행한 강의 수
          is_possible_review: false, //강의평가 가능여부
          progress_date: "무제한", //기간
        },
        list: [
          //둘다 데이터가 있을수도있고 하나만 있을수도 있음.
          {
            are_parents: "섹션으로 구성된 강의리스트",
            not_parents: "섹션없이 일반으로 등록된 강의",
          },
        ],
        current_item: [
          //처음세팅될 아이템
          {
            item_id: "625",
            lp_type: "document",
            bookmark_count: 0,
            link:
              "https://www.youtube.com/embed/A7d1mMdhePY?rel=0&amp;autoplay=1",
            iframe_src:
              "http://develop.hell0world.net/courses/PY05/document/7-1..html?&session_id=0",
            custom_type: "",
            note_contents: "'강의노트에 해당하는 파라미터",
          },
        ],
      },
    };
    await mock.onPost(ApiUrl.main_list).reply(200, data);
    jest.spyOn(wrapper.vm, "getPlayInfo");
    await wrapper.vm.getPlayInfo();
  });
  test("getPlayInfo call", async () => {
    expect(wrapper.vm.info).toBeDefined();
    expect(wrapper.vm.getPlayInfo).toHaveBeenCalled();
  });
});
