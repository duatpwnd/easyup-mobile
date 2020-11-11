import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
describe("created jest", () => {
  test("테스트", async () => {
    const wrapper = shallowMount(Main);
    wrapper.vm.getLectureList();
    const data = {
      action: "main_page_list",
    };
    const mock = new MockAdapter(axios);
    await mock.onPost("/main/mobileAPI/v1.php").reply(200);
    // mock
    //   .onPost("http://develop.hell0world.net/main/mobileAPI/v1.php")
    //   .reply(function(config) {
    //     console.log(config);
    //   });
  });
});
