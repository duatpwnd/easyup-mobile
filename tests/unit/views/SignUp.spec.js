import { shallowMount } from "@vue/test-utils";
import SignUp from "@/views/SignUp.vue";
import Axios from "axios";

describe("SignUp.vue", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(SignUp, {
      mocks: {
        $axios: Axios,
        $ApiUrl: jest.fn(),
        $noticeMessage: jest.fn(),
      },
    });
  });
  test("성을 입력 안했을경우", () => {
    const lastName = wrapper.vm.lastname;
    expect(lastName.trim().length).toBe(0);
  });
  test("이름을 입력 안했을경우", () => {
    const firstName = wrapper.vm.firstname;
    expect(firstName.trim().length).toBe(0);
  });
  test("이메일을 입력 안했을경우", () => {
    const email = wrapper.vm.email;
    expect(email.trim().length).toBe(0);
  });
  test("비밀번호를 입력 안했을경우", () => {
    const pw1 = wrapper.vm.pw1;
    expect(pw1.trim().length).toBe(0);
  });
  test("비밀번호확인을 입력 안했을경우", () => {
    const pw2 = wrapper.vm.pw2;
    expect(pw2.trim().length).toBe(0);
  });
  test("비밀번호가 서로 다를 경우", () => {
    wrapper.setData({ pw1: "pw111", pw2: "pw222" });
    expect(wrapper.vm.pw1 == wrapper.vm.pw2).toBeFalsy();
  });
  test("약관 내용에 동의 안했을경우", () => {
    expect(wrapper.vm.agree1).toBeFalsy();
    expect(wrapper.vm.agree2).toBeFalsy();
  });
  test("연락처 전송버튼 클릭시", () => {
    const submitBtn = wrapper.find(".submit-btn");
    submitBtn.trigger("click");
    expect(wrapper.vm.isTimer).toBeTruthy();
  });
  test("연락처 재전송 버튼 클릭시", () => {
    const submitBtn = wrapper.find(".submit-btn");
    submitBtn.trigger("click");
    submitBtn.trigger("click");
    expect(wrapper.vm.isWait).toBeTruthy();
  });
  test("인증번호 입력 시간이 만료되었을경우", () => {
    jest.spyOn(wrapper.vm, "stop");
    wrapper.vm.stop();
    expect(wrapper.vm.time).toBe(0);
    expect(wrapper.vm.isTimer).toBeFalsy();
  });
  test("유효성 체크 통과", () => {
    wrapper.setData({
      lastname: "염",
      firstname: "세중",
      email: "duatpwnd1@naver.com",
      pw1: "123",
      pw2: "123",
      agree1: true,
      agree2: true,
    });
    const lastName = wrapper.vm.lastname;
    const firstName = wrapper.vm.firstname;
    const email = wrapper.vm.email;
    const pw1 = wrapper.vm.pw1;
    const pw2 = wrapper.vm.pw2;
    expect(lastName.trim().length).toBeGreaterThan(0);
    expect(firstName.trim().length).toBeGreaterThan(0);
    expect(email.trim().length).toBeGreaterThan(0);
    expect(pw1.trim().length).toBeGreaterThan(0);
    expect(pw2.trim().length).toBeGreaterThan(0);
    expect(wrapper.vm.pw1 == wrapper.vm.pw2).toBeTruthy;
    expect(wrapper.vm.agree1).toBeTruthy();
  });
});
