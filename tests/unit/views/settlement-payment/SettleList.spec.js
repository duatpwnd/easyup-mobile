import { shallowMount } from "@vue/test-utils";
import SettleList from "@/views/settlement_payment/SettleList.vue";
import axios from "axios";
describe("정산 리스트 페이지", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SettleList, {
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
  test("날짜필터 이벤트 버스 받기 ", () => {
    const emitted = wrapper.emitted();
    wrapper.vm.$emit("settleList_datePick");
    expect(emitted.settleList_datePick).toBeTruthy();
  });
});
