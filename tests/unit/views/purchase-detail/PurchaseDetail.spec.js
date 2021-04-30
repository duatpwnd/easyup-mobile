import { shallowMount } from "@vue/test-utils";
import PurchaseDetail from "@/views/purchase_detail/Detail.vue";
import axios from "axios";
import store from "@/store";

describe("구매내역 상세 페이지", () => {
  let wrapper;
  let data = {
    cancel: {
      bank_account_name: "",
      bank_account_number: "",
      bank_name: "",
      cancel_price: "4500",
      cancel_reason: "구매 의사 취소",
      cdate: "2021-04-09 12:44:27",
      id: "9",
      manager_id: "1",
      method: "1",
      order_id: "C020210401135826",
    },
    is_possible_cancel: {
      button_type: "ing",
      false_reason: "",
      result: "",
    },
    lecture_info: [
      {
        id: 9,
        price: Object,
        state: 3,
        teacher_name: "고 은지2",
        title: "생활코딩의 JAVA 기초과정",
        type: "course",
      },
    ],
    order_id: "C9320210427174623",
    pay_info: {
      cash_tid: "",
      is_possible_receipt: false,
      method: "card",
      pay_date: "2021-04-27 17:47:34",
      price: Object,
      product_name: "생활코딩의 JAVA 기초과정",
      required_refund: null,
      show_card_receipt: true,
      show_cash_receipt: false,
      tid: "177900115068",
    },
    pay_user_info: Object,
    status: "결제완료",
    status_code: 5,
  };
  beforeAll(() => {
    axios.post = jest.fn().mockResolvedValue({
      data: { data: data },
    });
  });
  beforeEach(() => {
    wrapper = shallowMount(PurchaseDetail, {
      store,
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
  test("구매영수증이 존재하는 경우", () => {
    const receiptBtn = wrapper.find(".purchase_receipt");
    expect(receiptBtn.exists()).toBeTruthy();
    expect(receiptBtn.text()).toBe("구매영수증");
  });
  test("취소 진행 버튼(취소 신청 내역을 확인중인경우)", () => {
    expect(data.is_possible_cancel.result).toBe("");
    expect(data.status_code).toBe(5);
  });
  test("취소 요청 버튼인경우", () => {
    data.status_code = 1;
    expect(data.is_possible_cancel.result).toBe("");
    expect(data.status_code).toBe(1);
  });
  test("취소 요청이 가능한경우", () => {
    data.status_code = 5;
    data.is_possible_cancel.result = false;
    expect(data.is_possible_cancel.result).toBeFalsy();
    expect(data.status_code).toBe(5);
  });
});
