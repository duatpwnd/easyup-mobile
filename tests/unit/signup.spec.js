import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import SignUp from "@/views/SignUp.vue";
describe("sign up", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SignUp);
  });
  test("validation check", () => {
    console.log(wrapper.html());
    jest.spyOn(wrapper.vm, "validationCheck");
    wrapper.vm.validationCheck();
    expect(wrapper.vm.validationCheck).toHaveBeenCalled();
  });
});
