<template>
  <div id="course_detail" v-if="detail">
    <img
      :src="detail.course_image"
      alt="파이썬 코딩 기본편"
      title="파이썬 코딩 기본편"
    />
    <div id="tag_wrap">
      <slot name="title_wrap">
        <h3 class="sub_title">{{ detail.category }}</h3>
        <h2 class="title">{{ detail.title }}!</h2>
        <div class="tag_list">
          <router-link
            class="tag"
            :to="{
              path: '/course',
              query: {
                action: 'get_course_list',
                pageCurrent: 1,
                order: 'type_date',
                keyword: '',
                tag: list.tag.replace('#', ''),
              },
            }"
            v-for="(list, index) in detail.tags"
            :key="index"
          >
            {{ list.tag }}</router-link
          >
        </div>
      </slot>
    </div>
    <div class="update_noti">
      <span
        >{{ detail.creation_date }}(업데이트 일자:{{
          detail.update_date
        }})</span
      >
    </div>
    <div id="subscribe">
      <div class="subscribe_wrap">
        <h2>무료</h2>
        {{ is_subscribe }}
        <BlueBtn v-if="is_subscribe">
          <button
            ref="subs_btn"
            class="active_subscribe"
            slot="blue_btn"
            @click="video()"
          >
            구독중
          </button>
        </BlueBtn>
        <BlueBtn v-else>
          <button ref="subs_btn" slot="blue_btn">
            구독하기
          </button>
        </BlueBtn>
        <div>
          <span class="total_lec"
            >총<span class="color"> {{ detail.course_list.length }}</span
            >강</span
          >
        </div>
        <div>
          <StarRating
            :rating="detail.ranking"
            :star-size="10"
            :read-only="true"
            :increment="0.01"
            :star-points="[
              23,
              2,
              14,
              17,
              0,
              19,
              10,
              34,
              7,
              50,
              23,
              43,
              38,
              50,
              36,
              34,
              46,
              19,
              31,
              17,
            ]"
          ></StarRating>
        </div>
        <span class="name">{{ detail.teachers }}</span>
      </div>
      <button class="fixed_subs_btn" v-if="subscribe_btn">
        <span v-if="is_subscribe" class="active_subscribe">구독중</span>
        <span v-else>구독하기</span>
      </button>
    </div>
    <div class="course_info">
      <h2 class="course_list">
        코스 별 강좌 안내
        <span class="all_lecture_num">총{{ detail.course_list.length }}강</span>
      </h2>
      <div
        class="ol_list"
        v-for="(list, index) in detail.course_list"
        :key="index"
      >
        <h2 class="title">{{ index + 1 }}강.</h2>
        <CourseIem>
          <router-link
            class="lec_list"
            slot="router"
            :to="{
              path: '/',
              query: {
                id: list.id,
              },
            }"
          >
            <img :src="list.thumbnail" alt="이지업" title="이지업" />
          </router-link>
          <h4 slot="teacher">{{ list.teacher }}</h4>
          <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
          <span slot="grade" class="score">{{ list.ranking }}</span>
          <h1 class="free" slot="free" v-if="list.is_free == 'Y'">
            FREE
          </h1>
        </CourseIem>
        <div class="btn_wrap">
          <BlueBtn>
            <button slot="blue_btn">
              선행과정 필수
            </button>
          </BlueBtn>
          <BlueBtn class="right_btn">
            <button slot="blue_btn">
              강의정보 확인
            </button>
          </BlueBtn>
        </div>
      </div>
      <CommentWrap
        :action="{
          action: 'get_session_review',
          session_id: $route.query.id,
        }"
        @emitScoreCount="scoreCount"
      ></CommentWrap>
    </div>
  </div>
</template>
<script>
  import StarRating from "vue-star-rating";
  import CommentWrap from "@/components/lecture_detail/CommentWrap";

  import CourseIem from "@/components/common/LectureItem.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import mixin from "@/components/mixins/lec_course_detail.js";

  export default {
    mixins: [mixin],
    components: {
      StarRating,
      CommentWrap,
      BlueBtn,
      CourseIem,
    },
    data() {
      return {};
    },
    methods: {
      // 코스 상세 조회
      async getCourseDetail() {
        const data = {
          action: "get_session_info",
          session_id: this.$route.query.id,
        };
        await this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log("코스상세:", result.data.data);
            this.detail = result.data.data;
          });
      },
    },
    created() {
      if (this.$cookies.get("user_info") != null) {
        this.isSubscribe();
      }
      this.getCourseDetail();
    },
  };
</script>
<style scoped lang="scss">
  #tag_wrap {
    padding: 4.445%;
    .sub_title {
      font-size: 1.375rem;
      color: #999999;
    }
    .title {
      font-size: 2rem;
      color: #333333;
    }
    .tag_list {
      margin-top: 5px;
      line-height: 35px;
      span {
        color: #a4a4a4;
        border: 2px solid #757575;
        border-radius: 20px;
        height: 24px;
        padding: 0 10px;
        display: inline-block;
        margin-right: 0.763%;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
      }
    }
  }
  .update_noti {
    padding: 15px 4.445%;
    background: #f8f8f8;
    span {
      color: #999999;
      font-size: 1.25rem;
    }
  }
  #subscribe {
    padding: 4.445%;
    .blue_btn {
      ::v-deep button {
        border-radius: 20px;
        margin: 10px 0;
        height: 40px;
        line-height: 32px;
      }
    }
    .active_subscribe {
      background-color: #ff114a;
      border-color: #ff114a;
    }
    ::v-deep .vue-star-rating {
      display: unset;
      .vue-star-rating-rating-text {
        font-size: 12px;
        color: #333333;
        margin-left: 10px;
      }
    }
    .subscribe_wrap {
      .total_lec {
        font-size: 1.375rem;
        .color {
          color: #114fff;
        }
      }
      .name {
        font-size: 1.375rem;
        color: #666666;
      }

      .score {
        font-size: 1.375rem;
        color: #333333;
        vertical-align: middle;
        margin-left: 2%;
      }
    }
    .fixed_subs_btn {
      position: fixed;
      bottom: 0;
      background: #114fff;
      color: #ffffff;
      font-family: "NotoSansCJKkr-Medium";
      font-size: 18px;
      width: 100%;
      max-width: 720px;
      z-index: 2;
      left: 0;
      right: 0;
      margin: auto;
      span {
        width: 100%;
        display: block;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .course_info {
    padding: 4.445%;
    .course_list {
      font-size: 2rem;
      position: relative;
      .all_lecture_num {
        font-size: 10px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 15px;
        margin: auto;
      }
    }
    .ol_list {
      // width: 48.782%;
      margin-top: 5%;
      .title {
        font-size: 1.6875rem;
      }
      .item {
        ::v-deep .lec_list {
          img {
            width: 48.782%;
          }
        }
        ::v-deep .star {
          width: 3.7%;
        }
        ::v-deep .score {
          width: 7.3%;
        }
      }
      .btn_wrap {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
          float: left;
        }
        .right_btn {
          float: right;
          ::v-deep button {
            background: white;
            color: #114fff;
          }
        }
      }
    }
  }
</style>
