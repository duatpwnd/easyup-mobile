import { shallowMount, mount } from "@vue/test-utils";
import Read from "@/views/techblog/read.vue";
describe("Read Component", () => {
  const wrapper = shallowMount(Read);
  test("write", () => {
    jest.spyOn(wrapper.vm, "write");
    wrapper.vm.write();
    expect(wrapper.vm.write).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(true);
    expect(wrapper.vm.write_btn).toBe(false);
  });
  test("write_cancel", () => {
    jest.spyOn(wrapper.vm, "write_cancel");
    wrapper.vm.write_cancel();
    expect(wrapper.vm.write).toHaveBeenCalled();
    expect(wrapper.vm.editor).toBe(false);
    expect(wrapper.vm.write_btn).toBe(true);
  });
});
