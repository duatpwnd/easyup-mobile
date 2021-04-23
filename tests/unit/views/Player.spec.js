import { shallowMount } from "@vue/test-utils";
import Player from "@/views/Player.vue";
import axios from "axios";
import store from "@/store";
function mockFn(action, data) {
  switch (action) {
    case "get_player_info":
      return jest.fn().mockResolvedValue(data);
    default:
      return jest.fn().mockResolvedValue();
  }
}
describe("플레이어 컴포넌트", () => {
  let wrapper;
  let data = {
    data: {
      player_info: {
        course_id: 54,
        course_code: "PY05",
        title: "혼자 공부하는 파이썬 (하)",
        lp_mode: "embedded",
        percent: [
          //진도율 퍼센터
          "27",
          "%",
        ],
        total_items: 26, //총 강의수
        complete_items: 7, //현재까지 진행한 강의 수
        is_possible_review: false, //강의평가 가능여부
        progress_date: "무제한", //기간
      },
      list: [
        //둘다 데이터가 있을수도있고 하나만 있을수도 있음.
        {
          are_parents: "섹션으로 구성된 강의리스트",
          not_parents: "섹션없이 일반으로 등록된 강의",
        },
      ],
      current_item: [
        //처음세팅될 아이템
        {
          item_id: "625",
          lp_type: "document",
          bookmark_count: 0,
          link:
            "https://www.youtube.com/embed/A7d1mMdhePY?rel=0&amp;autoplay=1",
          iframe_src:
            "http://develop.hell0world.net/courses/PY05/document/7-1..html?&session_id=0",
          custom_type: "video",
          note_contents: "'강의노트에 해당하는 파라미터",
        },
      ],
    },
  };
  beforeEach(() => {
    wrapper = shallowMount(Player, {
      store,
      mocks: {
        $route: {
          query: {
            course_id: 1,
            lp_id: 1,
            linkType: undefined,
          },
        },
        $EventBus: {
          $on: jest.fn(),
          $off: jest.fn(),
          $emit: jest.fn(),
        },
        $axios: axios,
        $ApiUrl: jest.fn(),
      },
    });
  });
  it("플레이어 정보 호출", () => {
    const getPlayerInfo = mockFn("get_player_info", data);
    getPlayerInfo({ action: "get_player_info", course_id: 1, lp_id: 1 }).then(
      (result) => {
        expect(getPlayerInfo).toHaveBeenCalledWith({
          action: "get_player_info",
          course_id: 1,
          lp_id: 1,
        });
      }
    );
    expect(getPlayerInfo).toHaveBeenCalled();
  });
  it("즐겨찾기 페이지에서 플레이어 페이지로 왔을때 플레이어 정보 호출", () => {
    const getPlayerInfo = mockFn("get_player_info", data);
    getPlayerInfo({
      action: "get_player_info",
      course_id: 1,
      lp_id: 1,
      linkType: "bookmark",
      iid: 13,
    }).then((result) => {
      expect(getPlayerInfo).toHaveBeenCalledWith({
        action: "get_player_info",
        course_id: 1,
        lp_id: 1,
        linkType: "bookmark",
        iid: 13,
      });
    });
    expect(getPlayerInfo).toHaveBeenCalled();
  });
  it("비디오 파일인 경우", () => {
    wrapper.setData({ info: data.data });
    expect(wrapper.vm.info.current_item[0].lp_type).toBe("document");
    expect(wrapper.vm.info.current_item[0].custom_type).toBe("video");
  });
  it("아이 프레임 인경우", () => {
    data.data.current_item[0].custom_type = "youtube";
    wrapper.setData({ info: data.data });
    expect(wrapper.vm.info.current_item[0].lp_type).toBe("document");
    expect(wrapper.vm.info.current_item[0].custom_type).toBe("youtube");
  });
});
