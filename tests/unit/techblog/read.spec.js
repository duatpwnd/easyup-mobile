import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Read from "@/views/techblog/read.vue";
describe.skip("read.vue", () => {
  let wrapper;
  beforeEach(() => {
    const $route = {
      query: { id: 12 },
    };
    wrapper = shallowMount({
      Read,
      $route,
    });
  });
  test("WRITE", () => {
    jest.spyOn(wrapper.vm, "write");
    wrapper.vm.write();
    expect(wrapper.vm.write).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(true);
    expect(wrapper.vm.write_btn).toBe(false);
  });
  // test("WRTIE CANCEL", () => {
  //   jest.spyOn(wrapper.vm, "write_cancel");
  //   wrapper.vm.write_cancel();
  //   expect(wrapper.vm.editor).toBe(false);
  //   expect(wrapper.vm.write_btn).toBe(true);
  //   expect(wrapper.vm.contents).toBe("");
  // });
});
