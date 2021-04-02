import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Main from "@/views/Main.vue";
import axios from "axios";
import Vue from "vue";
import ApiUrl from "@/assets/js/api_url.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueRouter from "vue-router";
const VueCookies = require("vue-cookies");
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueAwesomeSwiper);
describe("Main.vue", () => {
  let wrapper;
  beforeAll(async () => {
    const data = {
      data: {
        recent_notice: [
          {
            id: "28",
            link:
              "http://develop.hell0world.net:5580/main/help/?type=notice&action=read&id=28",
            title: "로드맵 상세 페이지",
          },
        ],
        popular_course: [
          {
            id: 9,
            image_url: "http://develop.hell0world.net:5580/main/img/bann01.png",
          },
        ],
        banner: [
          {
            id: "28",
            image_url:
              "http://develop.hell0world.net:5580/app/upload/users/5/59/my_files/banner3.png",
            parse_info: {
              action: "read",
              id: "28",
              type: "notice",
            },
            action: "read",
            id: "28",
            type: "notice",
          },
        ],
        popular_lecture: [
          {
            id: "174",
            image_url:
              "http://develop.hell0world.net:5580/courses/LANG21/course-pic.png",
            price: {
              discount: 50,
              discount_price: 1000,
              discount_type: "total",
              final: 1000,
              final_already: 0,
              format_final: "1,000",
              format_final_already: "",
              format_original: "2,000",
              is_discount: true,
              is_free: false,
              original: 2000,
            },
            ranking: 0,
            teachers: "송 기범",
            title: " 화이트해커 강의 - 웹 해킹 기술",
          },
        ],
        techblog_post: [
          {
            id: "40",
            thumbnail:
              "http://develop.hell0world.net:5580/app/upload/techblog/,thumb7efc6f049aec97f95e43b62a47899c38.jpg",
            title: "에디터1",
            viewLink:
              "http://develop.hell0world.net:5580/main/techBlog/view.php?id=40",
            wdate_format: "2021.02.17",
            writer: "송 기범",
          },
        ],
        latest_lecture: [
          {
            id: 11542,
            price: {
              discount: 0,
              discount_price: 0,
              discount_type: "total",
              final: 0,
              final_already: 0,
              format_final: "-",
              format_final_already: "",
              format_original: "-",
              is_discount: false,
              is_free: true,
              original: 0,
            },
            image_url:
              "http://develop.hell0world.net:5580/main/img/session_default.png",
            ranking: 3,
            teachers: "이지업",
            title: "234",
          },
        ],
      },
    };
  });
  beforeEach(async () => {
    Vue.prototype.$axios = axios;
    Vue.prototype.$ApiUrl = ApiUrl;
    Vue.prototype.$cookies = VueCookies;

    wrapper = shallowMount(Main);
  });
  // call 직접호출, inovke 간접호출
  test("메인페이지 인기강의, 추천강의, 이지채널, 최신강의, 인기코스 리스트 가져오기", () => {
    jest.spyOn(wrapper.vm, "getLectureList");
    wrapper.vm.getLectureList();
    expect(wrapper.vm.getLectureList).toHaveBeenCalled();
  });
});
