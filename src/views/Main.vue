<template>
  <div id="main" v-if="Object.keys(list).length > 0">
    <!-- 배너 :: S -->
    <Slide :swiper_option="slide_option.banner">
      <swiper-slide
        slot="list"
        v-for="(list, index) in list.banner"
        :key="index"
        ><img :src="list.image_url" @click="noticeRead(list.id)"
      /></swiper-slide>
    </Slide>
    <!-- 배너 :: E -->

    <!-- 인기강의 :: S -->
    <div class="section">
      <h2 class="title">인기 강의</h2>
      <p class="suggest">이지업의 가장 인기가 많은 강의를 확인해보세요</p>
      <div class="lec_list_wrap">
        <div
          class="li"
          v-for="(list, index) in list.popular_lecture"
          :key="index"
          @click="
            $router.push({
              path: '/lecDetail',
              query: {
                id: list.id,
              },
            })
          "
        >
          <LecItem>
            <span
              class="lec_list"
              slot="router"
              :style="{ 'background-image': `url(${list.image_url})` }"
            >
            </span>
            <h4 slot="teacher">{{ list.teachers }}</h4>
            <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
            <span slot="grade" class="score">{{ list.ranking }}</span>
            <h1 class="free" slot="free" v-if="list.price.is_free">
              FREE
            </h1>
            <span class="price" v-else slot="free">
              <del class="original">{{ list.price.format_original }}</del>
              <span class="final">{{ list.price.format_final }}</span>
            </span>
          </LecItem>
        </div>
      </div>
    </div>
    <!-- 인기강의 :: E-->

    <!-- 인기 코스 :: S -->
    <div class="section swiper_section">
      <h2 class="title">인기 코스</h2>
      <p class="suggest">
        초심자 과정부터 전문가 과정까지, 전 과정을 합리적인 가격에 마스터하세요
      </p>
      <Slide :swiper_option="slide_option.popular_course">
        <template slot="list">
          <swiper-slide
            slot="list"
            v-for="(list, index) in list.popular_course"
            :key="index"
            ><router-link
              :to="{
                path: '/courseDetail',
                query: {
                  id: list.id,
                },
              }"
              ><img :src="list.image_url"/></router-link
          ></swiper-slide>
        </template>
        <template slot="nav_btn">
          <div
            class="swiper-button-prev swiper-button-prev-0"
            slot="button-prev"
            @click.stop=""
          ></div>
          <div
            class="swiper-button-next swiper-button-next-0"
            slot="button-next"
            @click.stop=""
          ></div>
        </template>
      </Slide>
    </div>
    <!-- 인기코스 :: E -->

    <!-- 최신강의 ::  S -->
    <div class="section swiper_section">
      <h2 class="title">최신 강의</h2>
      <p class="suggest">
        최근 트렌드를 반영한 강의 정보를 확인하세요
      </p>
      <Slide :swiper_option="slide_option.latest_lecture">
        <template slot="list">
          <swiper-slide
            v-for="(list, index) in list.latest_lecture"
            :key="index"
          >
            <LecItem>
              <router-link
                class="lec_list"
                slot="router"
                :to="{
                  path: '/lecDetail',
                  query: {
                    id: list.id,
                  },
                }"
                :style="{ 'background-image': `url(${list.image_url})` }"
              >
              </router-link>
              <h4 slot="teacher">{{ list.teachers }}</h4>

              <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
              <span slot="grade" class="score">{{ list.ranking }}</span>
              <h1 class="free" slot="free" v-if="list.price.is_free">
                FREE
              </h1>
              <span class="price" v-else slot="free">
                <del class="original">{{ list.price.format_original }}</del>
                <span class="final">{{ list.price.format_final }}</span>
              </span>
            </LecItem>
          </swiper-slide>
        </template>
        <template slot="nav_btn">
          <div
            class="swiper-button-prev swiper-button-prev-1"
            slot="button-prev"
            @click.stop=""
          ></div>
          <div
            class="swiper-button-next swiper-button-next-1"
            slot="button-next"
            @click.stop=""
          ></div>
        </template>
      </Slide>
    </div>
    <!-- 최신강의 ::  E -->

    <!-- 번역강의 :: S -->
    <div class="section swiper_section">
      <h2 class="title">
        번역 강의<router-link
          tag="button"
          :to="{
            path: '/course',
            query: {
              action: 'get_course_list',
              pageCurrent: 1,
              order: 'type_date',
              keyword: '',
              tag: '번역',
            },
          }"
          class="more_view"
          >더보기</router-link
        >
      </h2>
      <p class="suggest">
        한글 자막이 제공되는 외국 우수 강의를 구독하세요
      </p>
      <Slide :swiper_option="slide_option.translation_lecture">
        <template slot="list">
          <swiper-slide
            v-for="(list, index) in list.translation_lecture"
            :key="index"
          >
            <LecItem>
              <router-link
                class="lec_list"
                slot="router"
                :to="{
                  path: '/lecDetail',
                  query: {
                    id: list.id,
                  },
                }"
                :style="{ 'background-image': `url(${list.image_url})` }"
              >
              </router-link>
              <h4 slot="teacher">{{ list.teachers }}</h4>

              <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
              <span slot="grade" class="score">{{ list.ranking }}</span>
              <h1 class="free" slot="free" v-if="list.price.is_free">
                FREE
              </h1>
              <span class="price" v-else slot="free">
                <del class="original">{{ list.price.format_original }}</del>
                <span class="final">{{ list.price.format_final }}</span>
              </span>
            </LecItem></swiper-slide
          >
        </template>
        <template slot="nav_btn">
          <div
            class="swiper-button-prev swiper-button-prev-2"
            slot="button-prev"
            @click.stop=""
          ></div>
          <div
            class="swiper-button-next swiper-button-next-2"
            slot="button-next"
            @click.stop=""
          ></div>
        </template>
      </Slide>
    </div>
    <!-- 번역강의 :: E -->

    <!-- 카테고리별강의 :: S -->
    <!-- <div class="section category_section">
      <CategoryLec></CategoryLec>
      <div class="notice_wrap">
        <span class="notice_title">공지사항</span>
        <router-link
          class="notice_contents"
          tag="span"
          :to="{
            path: '/help/notice/read',
            query: {
              id: list.recent_notice.id,
            },
          }"
          >{{ list.recent_notice.title }}</router-link
        >
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LecItem from "@/components/common/LectureItem.vue";
  import CategoryLec from "@/components/main/MainCategory.vue";
  import Slide from "@/components/common/Slide.vue";
  interface ResultedData {
    data: {
      data: {};
    };
  }
  @Component({
    components: {
      Slide,
      LecItem,
      CategoryLec,
    },
  })
  export default class Main extends Vue {
    private slide_option = {
      banner: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
      popular_course: {
        spaceBetween: 8,
        slidesPerView: 1,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next-0",
          prevEl: ".swiper-button-prev-0",
        },
      },
      latest_lecture: {
        spaceBetween: 8,
        slidesPerView: 2,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next-1",
          prevEl: ".swiper-button-prev-1",
        },
      },
      translation_lecture: {
        spaceBetween: 8,
        slidesPerView: 2,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next-2",
          prevEl: ".swiper-button-prev-2",
        },
      },
    };
    private list = {};
    private getLectureList(): void {
      const data = {
        action: "main_page_list",
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultedData) => {
          console.log(result);
          this.list = result.data.data;
        });
    }
    created() {
      this.getLectureList();
    }
  }
</script>
<style scoped lang="scss">
  #main {
    position: relative;
    .section {
      padding: 4.445%;
      .lec_list {
        padding-bottom: 55%;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .title {
        position: relative;
        font-size: 2rem;
        margin-top: 24px;
        &:first-child {
          margin-top: 0;
        }
        .more_view {
          font-family: "NotoSansCJKkr-Medium";
          position: absolute;
          font-size: 12px;
          color: #114fff;
          border: 1px solid #114fff;
          top: 0;
          right: 0;
          bottom: 0;
          height: 22px;
          padding: 1px 10px;
          border-radius: 4px;
          margin: auto;
          line-height: 20px;
        }
      }
      .suggest {
        margin-top: 5px;
        font-size: 1.125rem;
        color: #999999;
      }
      .lec_list_wrap {
        &:after {
          display: block;
          clear: both;
          content: "";
        }
        .li {
          margin-top: 24px;
          float: left;
          width: 48.782%;
          &:nth-child(odd) {
            margin-right: 2.436%;
          }
          ::v-deep .item {
            .evaluate {
              margin-bottom: 2%;
            }
          }
        }
      }
      .notice_wrap {
        background: #f4f4f4;
        border-radius: 30px;
        padding: 4px 4.88%;
        margin-top: 24px;
        position: relative;
        height: 30px;
        box-sizing: border-box;
        .notice_title {
          color: #114fff;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          top: 0;
          line-height: 30px;
        }
        .notice_contents {
          color: #787878;
          font-size: 12px;
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          width: 100%;
          line-height: 30px;
        }
      }
    }
    .swiper_section {
      padding-top: 0;
      .slide {
        .swiper-button-prev.swiper-button-disabled,
        .swiper-button-next.swiper-button-disabled {
          pointer-events: unset;
        }
        .swiper-button-prev,
        .swiper-button-next {
          z-index: 1;
          outline: none;
          width: 20px;
          height: 40px;
          top: 0;
          bottom: 0;
          margin: auto;
          &:after {
            content: none;
          }
        }
        .swiper-button-prev {
          background: url("~@/assets/images/main/prev_btn.png") no-repeat center
            center / 100% 100%;
          left: 0;
        }
        .swiper-button-next {
          background: url("~@/assets/images/main/next_btn.png") no-repeat center
            center / 100% 100%;
          right: 0;
        }
      }
    }
    .category_section {
      padding-top: 0;
      padding-bottom: 15px;
    }
    ::v-deep .vue-star-rating {
      display: unset;
      .vue-star-rating-rating-text {
        font-size: 12px;
        color: #333333;
        margin-left: 10px;
      }
    }
  }
</style>
