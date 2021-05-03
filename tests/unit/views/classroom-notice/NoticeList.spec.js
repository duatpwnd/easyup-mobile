import { shallowMount } from "@vue/test-utils";
import NoticeList from "@/views/notice/List.vue";
import axios from "axios";
import store from "@/store/index.ts";
describe("내강의실 공지사항 리스트", () => {
  let wrapper;
  beforeAll(() => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          list: [
            {
              c_id: 157,
              code: "PROGRAMMING",
              course_name: "스크래치 3.0 초보 강의",
              id: 53,
              insert_date: "2021-04-30 02:23:26",
              insert_user_id: 59,
              title: "등록등록등록",
              user_id: 59,
            },
          ],
        },
      },
    });
    wrapper = shallowMount(NoticeList, {
      store,
      mocks: {
        $ApiUrl: jest.fn(),
        $route: {
          query: {
            pageCurrent: 1,
            order: "",
            keyword: "",
            view: "teacher",
          },
        },
        $axios: axios,
      },
    });
  });
  test("강사버전 공지사항 리스트일경우", () => {
    // 강사 버전인 경우에만 등록과,삭제버튼 노출
    const registerBtn = wrapper.find(".btn_wrap");
    registerBtn.exists();
    expect(wrapper.vm.$route.query.view).toBe("teacher");
  });
});
