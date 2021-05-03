import { shallowMount } from "@vue/test-utils";
import SettleList from "@/views/settlement_payment/SettleList.vue";
import axios from "axios";
describe("정산 리스트 페이지", () => {
  let wrapper;
  beforeAll(() => {
    /* 현재 정산리스트에 v-if=list가 잡혀있어서 wrapper가 생성되기전에 호출해줘야함, 안그러면 list가 없는걸로
    인식되어 wrapper.find로 찾을수가 없음
    */
    axios.post = jest.fn().mockResolvedValue({
      data: {
        data: {
          list: [
            {
              hold_reason: "",
              price: Object,
              settlement_date: "2021-05-27",
              type: "hold",
            },
          ],
        },
      },
    });
  });
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
  test("정산상태가 대기일 경우", () => {
    const holdingBtn = wrapper.find(".waiting-btn");
    expect(holdingBtn.exists()).toBeTruthy();
    expect(holdingBtn.text()).toBe("정산대기");
  });
  test("날짜필터 이벤트 버스 받기 ", () => {
    const emitted = wrapper.emitted();
    wrapper.vm.$emit("settleList_datePick");
    expect(emitted.settleList_datePick).toBeTruthy();
  });
  test("정산 리스트가 없는 경우", () => {
    wrapper.setData({
      list: {
        list: [],
      },
    });
    expect(wrapper.vm.list.list.length).toBe(0);
  });
});
