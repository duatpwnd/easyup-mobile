<template>
  <div id="main">
    <!-- 배너 :: S -->
    <Slide :swiper_option="slide_option.banner">
      <swiper-slide slot="list" v-for="(list, index) in banner" :key="index"
        ><img :src="list.image_url"
      /></swiper-slide>
    </Slide>
    <!-- 배너 :: E -->

    <!-- 인기강의 :: S -->
    <div class="section">
      <h2 class="title">인기 강의</h2>
      <p class="suggest">이지업의 가장 인기가 많은 강의를 확인해보세요</p>
      <div class="lec_list_wrap">
        <div class="li" v-for="(list, index) in popular_lecture" :key="index">
          <LecItem>
            <router-link class="lec_list" slot="router" to="/lecDetail">
              <img :src="list.image_url" alt="이지업" title="이지업" />
            </router-link>
            <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
            <span slot="grade" class="score">{{ list.grade }}</span>
            <h1 class="free" slot="free" v-if="list.isfree == 'Y'">
              FREE
            </h1>
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
        <swiper-slide
          slot="list"
          v-for="(list, index) in popular_course"
          :key="index"
          ><img :src="list.image_url"
        /></swiper-slide>
      </Slide>
    </div>
    <!-- <Test></Test> -->
    <!-- 인기코스 :: E -->

    <!-- 최신강의 ::  S -->
    <div class="section swiper_section">
      <h2 class="title">최신 강의</h2>
      <p class="suggest">
        최근 트렌드를 반영한 강의 정보를 확인하세요
      </p>
      <Slide :swiper_option="slide_option.latest_lecture">
        <swiper-slide
          slot="list"
          v-for="(list, index) in latest_lecture"
          :key="index"
        >
          <LecItem>
            <router-link class="lec_list" slot="router" to="/lecDetail">
              <img :src="list.image_url" alt="이지업" title="이지업" />
            </router-link>
            <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
            <span slot="grade" class="score">{{ list.grade }}</span>
            <h1 class="free" slot="free" v-if="list.isfree == 'Y'">
              FREE
            </h1>
          </LecItem></swiper-slide
        >
      </Slide>
    </div>
    <!-- 최신강의 ::  E -->

    <!-- 번역강의 :: S -->
    <div class="section swiper_section">
      <h2 class="title">번역 강의</h2>
      <p class="suggest">
        한글 자막이 제공되는 외국 우수 강의를 구독하세요
      </p>
      <Slide :swiper_option="slide_option.latest_lecture">
        <swiper-slide
          slot="list"
          v-for="(list, index) in translation_lecture"
          :key="index"
        >
          <LecItem>
            <router-link class="lec_list" slot="router" to="/lecDetail">
              <img :src="list.image_url" alt="이지업" title="이지업" />
            </router-link>
            <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
            <span slot="grade" class="score">{{ list.grade }}</span>
            <h1 class="free" slot="free" v-if="list.isfree == 'Y'">
              FREE
            </h1>
          </LecItem></swiper-slide
        >
      </Slide>
    </div>
    <!-- 번역강의 :: E -->

    <!-- 카테고리별강의 :: S -->
    <div class="section category_section">
      <CategoryLec></CategoryLec>
      <div class="notice_wrap">
        <span class="notice_title">공지사항</span>
        <span class="notice_contents"
          >코로나 극복 프로젝트 모든 강의 25% 할인</span
        >
        <!-- {{recent_notice}} -->
      </div>
    </div>
  </div>
</template>
<script>
  import LecItem from "@/components/common/LectureItem.vue";
  import CategoryLec from "@/components/main/MainCategory.vue";
  import Slide from "@/components/common/Slide.vue";
  // import Test from "@/components/main/PopularCourse.vue";
  export default {
    components: {
      // Test,
      Slide,
      LecItem,
      CategoryLec,
    },
    data() {
      return {
        slide_option: {
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
            slidesPerView: 1.049,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          },
          latest_lecture: {
            spaceBetween: 8,
            slidesPerView: 2.12,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          },
        },
        banner: "",
        latest_lecture: "",
        popular_lecture: "",
        popular_course: "",
        translation_lecture: "",
        recent_notice: "",
      };
    },
    methods: {
      async getLectureList() {
        const data = {
          action: "main_page_list",
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            Object.keys(result.data.data).forEach((d, index) => {
              this[d] = Object.values(result.data.data)[index];
            });
          });
      },
    },
    mounted() {},
    created() {
      this.getLectureList();
    },
  };
</script>
<style scoped lang="scss">
  #main {
    position: relative;
    .section {
      padding: 4.445%;
      .title {
        font-size: 2rem;
        margin-top: 24px;
        &:first-child {
          margin-top: 0;
        }
      }
      .suggest {
        margin-top: 5px;
        font-size: 1.125rem;
        color: #999999;
      }
      .lec_list_wrap {
        margin-top: 8px;
        &:after {
          display: block;
          clear: both;
          content: "";
        }
        .li {
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
        height: 24px;
        box-sizing: border-box;
        .notice_title {
          color: #114fff;
          font-size: 10px;
          font-weight: 600;
          position: absolute;
          top: 0;
          line-height: 24px;
        }
        .notice_contents {
          color: #787878;
          font-size: 10px;
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          width: 100%;
          line-height: 24px;
        }
      }
    }
    .swiper_section {
      padding-right: 0;
      padding-top: 0;
    }
    .category_section {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
</style>
