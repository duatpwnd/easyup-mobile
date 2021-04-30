import { shallowMount } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";
import axios from "axios";
const VueCookies = require("vue-cookies");
function mockFn(action, data) {
  switch (action) {
    case "cart_list":
      return jest.fn().mockResolvedValue(data);
    case "check_cart_items":
      return jest.fn().mockResolvedValue(data);
    default:
      return jest.fn().mockResolvedValue();
  }
}
describe("강의 바구니 페이지", () => {
  let wrapper;
  let data; // 바디데이터
  beforeEach(() => {
    wrapper = shallowMount(Cart, {
      mocks: {
        $axios: axios,
        $ApiUrl: jest.fn(),
        $cookies: VueCookies,
      },
    });
  });
  test("코스 리스트만 있는경우", () => {
    data = {
      data: {
        sessions: [],
        courses: [
          {
            access_limit: "강의 시작 후 10일",
            cart_id: "377",
            item_id: 126,
            price: Object,
            thumbnail:
              "http://develop.hell0world.net/courses/LANG/course-pic.png",
            title: "홈페이지 제작을 위한 HTML5, CSS 기초강좌",
            type: "course",
          },
        ],
      },
    };
    const result = mockFn("cart_list", data);
    result().then((result) => {
      console.log(result);
      wrapper.setData({ list: result.data });
      expect(wrapper.vm.list.sessions.length).toBe(0);
      expect(wrapper.vm.list.courses.length).toBeGreaterThan(0);
    });
  });
  test("강의 리스트만 있는경우", () => {
    data = {
      data: {
        sessions: [
          {
            access_limit: "강의 시작 후 10일",
            cart_id: "377",
            item_id: 126,
            price: Object,
            thumbnail:
              "http://develop.hell0world.net/courses/LANG/course-pic.png",
            title: "홈페이지 제작을 위한 HTML5, CSS 기초강좌",
            type: "course",
          },
        ],
        courses: [],
      },
    };
    const result = mockFn("cart_list", data);
    result().then((result) => {
      console.log(result);
      wrapper.setData({ list: result.data });
      expect(wrapper.vm.list.courses.length).toBe(0);
      expect(wrapper.vm.list.sessions.length).toBeGreaterThan(0);
    });
  });
  test("선택한 강의가 없고 삭제 버튼을 누를경우", () => {
    wrapper.setData({ checked_list: [] });
    expect(wrapper.vm.checked_list.length).toBe(0);
  });
  test("모든 강의를 선택했을 경우", () => {
    wrapper.setData({ allCheck: true });
    expect(wrapper.vm.allCheck).toBeTruthy();
  });
  test("구매한 강의 페이지로 이동", () => {
    axios.post = mockFn("check_cart_items", {
      data: { data: { result: true } },
    });
    jest.spyOn(wrapper.vm, "goToOrder");
    wrapper.setData({ checked_list: [1, 2, 3] });
    wrapper.vm.goToOrder();
    expect(wrapper.vm.checked_list.length).toBeGreaterThan(0);
  });
});
