import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
describe("created jest", () => {
  beforeEach(() => {});
  // call 직접호출, inovke 간접호출
  test("getLectureList call", async () => {
    const wrapper = mount(Main, {
      propsData: {
        list: [],
      },
    });
    // const mock = new MockAdapter(axios);
    // const data = {
    //   list: [
    //     {
    //       popular_lecture: [
    //         {
    //           id: "50",
    //           image_url:
    //             "http://develop.hell0world.net/courses/MLT01/course-pic.png",
    //           title: "CS229: 스탠포드 머신 러닝",
    //           isfree: "Y",
    //           ranking: 4.5,
    //           teachers: "이지업",
    //         },
    //       ],
    //     },
    //   ],
    // };
    // mock.onPost("/main/mobileAPI/v1.php").reply(200, {
    //   action: "main_page_list",
    // });
    jest.spyOn(wrapper.vm, "getLectureList");
    wrapper.vm.getLectureList();
    expect(wrapper.vm.getLectureList).toHaveBeenCalled();
  });
});
