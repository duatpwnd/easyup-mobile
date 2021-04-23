import { shallowMount } from "@vue/test-utils";
import mixin from "@/components/mixins/check_event.js";
import Tab from "@/views/data_share/Tab.vue";
import VueRouter from "vue-router";

describe.skip("자료공유 페이지", () => {
  let wrapper;
  beforeEach(() => {
    Vue.use(VueRouter);
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      duplicateNavigationPolicy: "ignore",
    });
    router.push({
      name: "resume",
      meta: {
        type: "sent",
      },
      query: {
        pageCurrent: 1,
        keyword: "",
      },
    });
    wrapper = shallowMount(Tab, {
      mixins: [mixin],
      router,
    });
  });
  test("all check event", () => {
    jest.spyOn(wrapper.vm, "all_check");
    wrapper.vm.all_check();
    expect(wrapper.vm.all_check).toHaveBeenCalled();
    if (wrapper.vm.allCheck) {
      expect(wrapper.vm.checked_list).toBe(wrapper.vm.dataShare_list);
    } else {
      expect(wrapper.vm.checked_list).toStrictEqual([]);
    }
  });
  test("partial check event", () => {
    jest.spyOn(wrapper.vm, "partial_check");
    wrapper.vm.partial_check();
    expect(wrapper.vm.partial_check).toHaveBeenCalled();
    if (wrapper.vm.dataShare_list.length != wrapper.vm.checked_list.length) {
      expect(wrapper.vm.allCheck).toBeFalsy();
    } else {
      expect(wrapper.vm.allCheck).toBeTruthy();
    }
  });
});
