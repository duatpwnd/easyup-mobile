import { shallowMount, createLocalVue } from "@vue/test-utils";
import Add from "@/views/bookmark_manage/Add.vue";
import axios from "axios";
describe("책갈피 추가", () => {
  let wrapper;
  beforeAll(() => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          info: {
            c_id: "171",
            check_point: "00:10:59",
            contents: null,
            course_name: "[웹] Web2-PHP 뽀개기",
            created_at: "2021-03-22 04:31:41",
            id: "297",
            iframe_src: null,
            iid: "1425",
            lp_id: "159",
            lp_link:
              "http://develop.hell0world.net/main/lp/lp_controller.php?cidReq=PROGRAMMING5&id_session=0&gidReq=0&gradebook=0&origin=&action=view&lp_id=159&linkType=bookmark&iid=1425&start=659",
            section_id: "1423",
            section_name: "lesson_10_1_while",
            status: "1",
            title: "ㅁㄴㅇ",
            updated_at: null,
            user_id: "59",
          },
        },
      },
    });
  });
  beforeEach(() => {
    wrapper = shallowMount(Add, {
      mocks: {
        $route: {
          query: {
            id: 1,
          },
        },
        $EventBus: {
          $on: jest.fn(),
          $off: jest.fn(),
          $emit: jest.fn(),
        },
        $axios: axios,
        $ApiUrl: jest.fn(),
      },
    });
  });

  test("책갈피 추가 함수 호출", () => {
    wrapper.vm.$refs.textarea.innerText = "test";
    jest.spyOn(wrapper.vm, "bookmarkAdd");
    wrapper.vm.bookmarkAdd();
    expect(wrapper.vm.bookmarkAdd).toHaveBeenCalled();
  });
  test("책갈피 읽기 함수 호출 성공", () => {
    jest.spyOn(wrapper.vm, "bookmarkRead");
    wrapper.vm.bookmarkRead();
    expect(wrapper.vm.bookmarkRead).toHaveBeenCalled();
  });
});
