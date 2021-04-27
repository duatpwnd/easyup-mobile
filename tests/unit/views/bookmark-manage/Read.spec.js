import { shallowMount } from "@vue/test-utils";
import Read from "@/views/bookmark_manage/Read.vue";
import axios from "axios";
describe("책갈피 읽기", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Read, {
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
  test("책갈피 읽기 함수 호출", () => {
    jest.spyOn(wrapper.vm, "bookmarkRead");
    wrapper.vm.bookmarkRead();
    expect(wrapper.vm.bookmarkRead).toHaveBeenCalled();
  });
  test("책갈피 삭제", () => {
    jest.spyOn(wrapper.vm, "deleteBookmark");
    wrapper.vm.deleteBookmark();
    expect(wrapper.vm.deleteBookmark).toHaveBeenCalled();
  });
});
