import { shallowMount, mount } from "@vue/test-utils";
import SubsCribe from "@/components/lecture_detail/Subscribe.vue";

describe("SubsCribe.vue", () => {
  test("스크롤시 구독하기 버튼 나타나기", () => {
    const wrapper = shallowMount(SubsCribe);
    jest.spyOn(wrapper.vm, "subscribe_btn_toggle");
    wrapper.vm.subscribe_btn_toggle();
    expect(wrapper.vm.subscribe_btn_toggle).toHaveBeenCalled();
    const btn = wrapper.findComponent({ ref: "subs_btn" });
    expect(btn.exists()).toBe(true);
    const scroll_top = 300;
    const btn_offset_top = 200;
    const btn_h = 50;
    if (scroll_top > btn_offset_top + btn_h) {
      wrapper.vm.subscribe_btn = true;
    } else {
      wrapper.vm.subscribe_btn = false;
    }
    expect(wrapper.vm.subscribe_btn).toBe(true);
  });
});
