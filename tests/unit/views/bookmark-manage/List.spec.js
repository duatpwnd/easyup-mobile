import { shallowMount } from "@vue/test-utils";
import List from "@/views/bookmark_manage/List.vue";
import axios from "axios";
describe("책갈피 리스트", () => {
  let wrapper;
  beforeEach(() => {
    const data = {
      error: false,
    };
    axios.post = jest.fn().mockResolvedValue({ data: data });
    wrapper = shallowMount(List, {
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
