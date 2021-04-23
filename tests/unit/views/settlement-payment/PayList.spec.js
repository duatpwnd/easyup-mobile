import { shallowMount } from "@vue/test-utils";
import PayList from "@/views/settlement_payment/PayList.vue";
import axios from "axios";
describe("결제 리스트 페이지", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PayList, {
      mocks: {
        $route: {
          query: jest.fn(),
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
  test("검색필터, 날짜필터 이벤트 버스 받기 ", () => {
    const emitted = wrapper.emitted();
    wrapper.vm.$emit("payList_datePick");
    wrapper.vm.$emit("search", { order: "", keyword: "test" });
    expect(emitted.payList_datePick).toBeTruthy();
    expect(emitted.search).toBeTruthy();
    expect(emitted.search[0]).toEqual([{ order: "", keyword: "test" }]);
  });
});
