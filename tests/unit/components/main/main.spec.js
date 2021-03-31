import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import Cookie from "js-cookie";
describe("Main.vue", () => {
  beforeEach(() => {});
  // call 직접호출, inovke 간접호출
  test("getLectureList call", async () => {
    const localVue = createLocalVue();
    const wrapper = mount(Main, { Cookie });
    jest.spyOn(wrapper.vm, "getLectureList");
    wrapper.vm.getLectureList();
    expect(wrapper.vm.getLectureList).toHaveBeenCalled();
  });
});
