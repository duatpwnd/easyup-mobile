import { shallowMount, createLocalVue } from "@vue/test-utils";
import Add from "@/views/bookmark_manage/Add.vue";
import axios from "axios";
describe("책갈피 추가", () => {
  let wrapper;
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
  test("책갈피 읽기 함수 호출 성공", () => {
    jest.spyOn(wrapper.vm, "bookmarkRead");
    wrapper.vm.bookmarkRead();
    expect(wrapper.vm.bookmarkRead).toHaveBeenCalled();
  });
  test("책갈피 추가 함수 호출", () => {
    wrapper.vm.$refs.textarea.innerText = "test";
    jest.spyOn(wrapper.vm, "bookmarkAdd");
    wrapper.vm.bookmarkAdd();
    expect(wrapper.vm.bookmarkAdd).toHaveBeenCalled();
  });
});
