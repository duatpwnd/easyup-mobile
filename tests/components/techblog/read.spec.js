import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Read from "@/views/techblog/read.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import ApiUrl from "@/assets/js/api_url.js";
const data = {
  data: {
    info: {
      id: "10",
      user_id: "1",
      title: '"인공지능의 대가" 앤드류 응',
      intro_txt:
        "인공지능 분야에서 이른바 ‘AI 사대천왕’ 중 한 명인 앤드류 응 박사의 인터뷰",
      contents: "내용",
      thumbnail: "thumb83cce7ef1971cdc69b396fb3d122ee13.jpg",
      wdate: "2020.09.14",
      mdate: "2020-09-24 04:30:23",
      view_cnt: "0",
      writer: "정호 장",
      neiborLink: {
        prevInfo: {
          title: "[테스트2_에디터] 스마트폰을 건전지로 충전하는 법",
          id: "9"
        },
        nextInfo: {
          title: "선형대수학 왜 배워야 할가요?",
          id: "12"
        }
      },
      thumbnail_link:
        "http://develop.hell0world.net/app/upload/techblog/thumb83cce7ef1971cdc69b396fb3d122ee13.jpg"
    },
    comment: [
      {
        id: "22",
        blog_id: "10",
        parent_id: null,
        user_id: "13",
        contents:
          "동해물과 백두산이  마르고 닳으려면 몇천년의 세월이 가면 가슴이 터질 듯한 그리운 마음이야 잊었니 우린 행복하지 마요 행복하려면 그 사람 나만 볼 수 있어요 내 눈이 내리던 어느 날 봐 날봐 귀순 날봐 날 좀 보소 날좀 보소 날좀 보소~ 동지 섣달력을 넘기도록 너는 결국 오질 않고 새해만",
        wdate: "2020-10-15 09:44:19",
        mdate: "2020-10-15 09:53:23",
        writer: "Cho Sungho",
        wdate_format: "2020.10.15",
        timeAgo: "11일 전",
        is_possible_modify: false,
        is_possible_reple: true,
        child_comment: [
          {
            id: "27",
            blog_id: "10",
            parent_id: "22",
            user_id: "23",
            contents: "test2222",
            wdate: "2020-10-26 02:17:22",
            mdate: null,
            writer: "고 은지",
            wdate_format: "2020.10.26",
            timeAgo: "12시간 전",
            is_possible_modify: true,
            is_possible_delete: true
          }
        ]
      }
    ]
  }
};
describe.skip("read.vue", () => {
  let wrapper;
  const mock = new MockAdapter(axios);

  beforeEach(async () => {
    Vue.use(VueRouter);
    Vue.prototype.$axios = axios;
    Vue.prototype.$EventBus = new Vue();
    Vue.prototype.$ApiUrl = ApiUrl;
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore"
    });
    router.push({
      query: {
        id: 1
      }
    });
    wrapper = shallowMount(Read, {
      store,
      router
    });
    await mock.onPost(ApiUrl.mobileAPI_v1).reply(200, data);
    jest.spyOn(wrapper.vm, "write");
    jest.spyOn(wrapper.vm, "write_cancel");
    jest.spyOn(wrapper.vm, "view");
    jest.spyOn(wrapper.vm, "comment_add");
  });
  test("WRITE", async () => {
    await wrapper.vm.write();
    expect(wrapper.vm.write).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(true);
    expect(wrapper.vm.write_btn).toBe(false);
  });
  test("WRTIE CANCEL", async () => {
    await wrapper.vm.write_cancel();
    expect(wrapper.vm.write_cancel).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(false);
    expect(wrapper.vm.write_btn).toBe(true);
    expect(wrapper.vm.contents).toBe("");
  });
  test("VIEW", async () => {
    await wrapper.vm.view(1);
    expect(wrapper.vm.view).toHaveBeenCalled();
    expect(wrapper.vm.list.info).toHaveProperty("id");
  });
  test("COMMENT ADD", async () => {
    await wrapper.vm.comment_add();
    expect(wrapper.vm.comment_add).toHaveBeenCalled();
  });
});
