import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import Cookie from "js-cookie";
describe("Main.vue", () => {
  beforeEach(() => {
    Cookie.set("search_title", "test");
  });
  // call 직접호출, inovke 간접호출
  test("getLectureList call", async () => {
    if (Cookie.get("search_title") != null) {
      // jest.spyOn(wrapper.vm, "getLectureList");
      // wrapper.vm.getLectureList();
      // expect(wrapper.vm.getLectureList).toHaveBeenCalled();
    }
  });
});
