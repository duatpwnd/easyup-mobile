import { shallowMount } from "@vue/test-utils";
import NoticeRegister from "@/views/notice/NoticeRegister.vue";
import axios from "axios";
import store from "@/store/index.ts";
function getWrapper(query) {
  return shallowMount(NoticeRegister, {
    store,
    mocks: {
      $ApiUrl: jest.fn(),
      $route: {
        query: query,
      },
      $axios: axios,
    },
  });
}
describe("내강의실 공지사항 등록", () => {
  let wrapper;
  test("글수정인경우", async () => {
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
    wrapper = getWrapper({
      type: "modify",
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.title).toBe("제목");
    expect(wrapper.vm.editorData).toBe("내용");
    // 글 수정인경우에는 강의선택 셀렉트 박스가 존재하지 않음
    expect(wrapper.find(".select").exists()).toBeFalsy();
  });
  test("글수정인경우(첨부파일있는경우)", async () => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          content: "내용",
          course_name: "코스",
          date: "2021.04.30 06:07",
          subject: "제목",
          writer: "admin",
          writer_id: 59,
          attachment_list: {
            comment: "",
            download:
              "http://develop.hell0world.net/main/announcements/download.php?&file=608b6a1597854",
            filename: "test.png",
            id: "23",
            path: "608b6a1597854",
          },
        },
      },
    });
    wrapper = getWrapper({
      type: "modify",
    });
    /*$nextTick()을 사용하여 돔에 데이터가 업데이트된후 확인
      만약 없이하면 돔에 데이터가 반영되기전에 테스트하기 때문에 에러발생
    */
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.file_list).toBeDefined();
    expect(wrapper.find(".file_wrap").exists()).toBeTruthy();
  });
  test("글등록인경우", () => {
    wrapper = getWrapper({
      type: "write",
    });
    expect(wrapper.vm.title).toBe("");
    expect(wrapper.vm.editorData).toBe("");
    expect(wrapper.find(".select").exists()).toBeTruthy();
  });
});
