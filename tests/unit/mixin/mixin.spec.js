import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import mixin from "@/components/mixins/check_event.js";
import TestComponent from "@/components/data_share/tab1.vue";
// const localVue = createLocalVue();
// localVue.use(mixin);
describe("mixin test", () => {
  const wrapper = shallowMount(TestComponent, {
    mixins: [mixin],
  });
  test("all check event", () => {
    jest.spyOn(wrapper.vm, "all_check");
    wrapper.vm.all_check();
    expect(wrapper.vm.all_check).toHaveBeenCalled();
    if (wrapper.vm.allCheck) {
      expect(wrapper.vm.checked_list).toBe(wrapper.vm.arr);
    } else {
      expect(wrapper.vm.checked_list).toStrictEqual([]);
    }
  });
  test("partial check event", () => {
    jest.spyOn(wrapper.vm, "partial_check");
    wrapper.vm.partial_check();
    expect(wrapper.vm.partial_check).toHaveBeenCalled();
    if (wrapper.vm.arr.length != wrapper.vm.checked_list.length) {
      expect(wrapper.vm.allCheck).toBeFalsy();
    } else {
      expect(wrapper.vm.allCheck).toBeTruthy();
    }
  });
});
