import { shallowMount } from "@vue/test-utils";
import SignUp from "@/views/SignUp.vue";
import Axios from "axios";

describe("회원가입페이지", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(SignUp, {
      mocks: {
        $axios: Axios,
        $ApiUrl: jest.fn(),
        $noticeMessage: jest.fn(),
      },
    });
    jest.spyOn(wrapper.vm, "phoneAuth");
    jest.spyOn(wrapper.vm, "reSend");
    jest.spyOn(wrapper.vm, "start");
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
  test("연락처 전송버튼 클릭시", async () => {
    const submitBtn = wrapper.find(".submit-btn");
    wrapper.setData({ phone: "01089511569" });
    Axios.post = jest
      .fn()
      .mockResolvedValue({ data: { data: { cert_number: "123456" } } });
    submitBtn.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isTimer).toBeTruthy();
  });
  test.only("연락처 재전송 버튼 클릭시", async () => {
    const submitBtn = wrapper.find(".submit-btn");
    wrapper.setData({ phone: "01089511569" });
    Axios.post = jest
      .fn()
      .mockResolvedValue({ data: { data: { cert_number: "123456" } } });
    // 처음 전송하기 누른 시점 :: S //
    await submitBtn.trigger("click");
    /* phoneAuth가 계속 호출이 안되었다고 오류가 나온이유는 template에서 phoneAuth()가 아닌 phoneAuth로 실행되고있었음
    그래서 클릭을해도 phoneAuth함수가 실행된게 아니기때문에 tohavebeencalled로 감지를 할수 없음
    */
    expect(wrapper.vm.phoneAuth).toHaveBeenCalled();
    expect(wrapper.vm.start).toHaveBeenCalled();
    // 처음 전송하기 누른 시점 :: E //
    await wrapper.vm.$nextTick();
    expect(submitBtn.text()).toBe("재전송");
    // 처음 재전송하기 누른 시점 :: S //
    submitBtn.trigger("click");
    expect(wrapper.vm.reSend).toHaveBeenCalled();
    // 처음 재전송하기 누른 시점 :: E //

    // 1분이내에 재전송버튼 누를경우 1분후에 전송이 가능하다는 문구를 넣어야함
    if (wrapper.vm.time > 120) {
      expect(wrapper.vm.isWait).toBeTruthy();
    } else {
      expect(wrapper.vm.isWait).toBeFalsy();
    }
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
