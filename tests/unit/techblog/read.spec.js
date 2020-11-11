import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Read from "@/views/techblog/read.vue";
describe("read.vue", () => {
  let wrapper;
  beforeEach(() => {
    const $route = {
      query: { id: "test" },
    };
    wrapper = mount({
      Read,
      $route,
    });
  });
  test("글쓰기", () => {
    jest.spyOn(wrapper.vm, "write");
    wrapper.vm.write();
    expect(wrapper.vm.write).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(true);
    expect(wrapper.vm.write_btn).toBe(false);
  });
  test("글쓰기 취소", () => {
    jest.spyOn(wrapper.vm, "write_cancel");
    wrapper.vm.write_cancel();
    expect(wrapper.vm.editor).toBe(false);
    expect(wrapper.vm.write_btn).toBe(true);
    expect(wrapper.vm.contents).toBe("");
  });
});
