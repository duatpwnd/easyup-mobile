import { shallowMount } from "@vue/test-utils";
import Video from "@/components/player/Video.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.ts";
import Store from "@/store/index.ts";
const VueCookies = require("vue-cookies");
function mockFn(action, data) {
  switch (action) {
    case "get_srt_file":
      return jest.fn().mockResolvedValue(data);
    default:
      return jest.fn().mockResolvedValue();
  }
}
describe("비디오 플레이어 컴포넌트", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Video, {
      mocks: {
        $store: Store,
        $EventBus: {
          $on: jest.fn(),
          $off: jest.fn(),
          $emit: jest.fn(),
        },
        $axios: axios,
        $ApiUrl: ApiUrl,
        $cookies: VueCookies,
      },
    });
  });
  test("자막파일 있는경우", () => {
    jest.spyOn(wrapper.vm, "srtParsing");
    const isSrtFile = mockFn("get_srt_file", "asdasd");
    isSrtFile().then((result) => {
      wrapper.vm.srtParsing(result);
      expect(result).toBeNull();
      expect(wrapper.vm.srtParsing).toHaveBeenCalled();
    });
  });
});
