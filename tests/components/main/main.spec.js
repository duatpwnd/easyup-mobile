import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
describe("Main.vue", () => {
  beforeEach(() => {});
  // call 직접호출, inovke 간접호출
  test("getLectureList call", async () => {
    const wrapper = mount(Main, {
      propsData: {
        list: [],
      },
    });
    jest.spyOn(wrapper.vm, "getLectureList");
    wrapper.vm.getLectureList();
    expect(wrapper.vm.getLectureList).toHaveBeenCalled();
  });
});
