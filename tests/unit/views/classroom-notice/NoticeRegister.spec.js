import { shallowMount } from "@vue/test-utils";
import NoticeRegister from "@/views/notice/NoticeRegister.vue";
import axios from "axios";
import store from "@/store/index.ts";
describe("내강의실 공지사항 등록", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(NoticeRegister, {
      store,
      mocks: {
        $ApiUrl: jest.fn(),
        $route: {
          query: {
            type: "modify",
          },
        },
        $axios: axios,
      },
    });
  });
  //   test("글작성인경우", () => {
  //   });
  test("글수정인경우", () => {
    jest.spyOn(wrapper.vm, "read");
    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          content: "내용",
          course_name: "코스",
          date: "2021.04.30 06:07",
          subject: "제목",
          writer: "admin",
          writer_id: 59,
        },
      },
    });
    wrapper.vm.read();
    // 글 수정인경우에는 강의선택 셀렉트 박스가 존재하지 않음
    expect(wrapper.find(".select").exists()).toBe(false);
    expect(wrapper.vm.read).toHaveBeenCalled();
  });
});
