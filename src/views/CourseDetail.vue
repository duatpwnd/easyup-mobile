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
                action: 'get_session_list',
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
      <span>{{ detail.creation_date }}</span>
    </div>
    <div id="subscribe">
      <div class="subscribe_wrap">
        <h2>무료</h2>
        <BlueBtn v-if="is_subscribe">
          <button
            ref="subs_btn"
            class="active_subscribe"
            slot="blue_btn"
            @click="video($route.query.id, detail.lp_id)"
          >
            구독중
          </button>
        </BlueBtn>
        <BlueBtn v-else>
          <button ref="subs_btn" slot="blue_btn" @click="subscribe()">
            구독하기
          </button>
        </BlueBtn>
        <div>
          <span class="total_lec"
            >총<span class="color">{{ detail.course_list.length }}</span
            >강</span
          >
        </div>
        <div>
          <StarRating
            :rating="detail.ranking"
            :star-size="16"
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
        <span v-else @click="subscribe()">구독하기</span>
      </button>
    </div>
    <div class="course_info">
      <h2 class="course_list">
        <span>코스 별 강좌 안내</span>
        <span class="all_lecture_num"
          >총 {{ detail.course_list.length }}강</span
        >
      </h2>
      <div
        class="ol_list"
        v-for="(list, index) in detail.course_list"
        :key="index"
      >
        <h2 class="title">{{ index + 1 }}강.</h2>
        <CourseItem>
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
        </CourseItem>
        <div class="btn_wrap">
          <BlueBtn v-if="index > 0">
            <button slot="blue_btn">
              선행과정 필수
            </button>
          </BlueBtn>
          <BlueBtn :class="[index == 0 ? 'confirm_btn' : 'right_btn']">
            <router-link
              slot="blue_btn"
              tag="button"
              :to="{
                path: '/lecDetail',
                query: {
                  id: list.id,
                },
              }"
            >
              강의정보 확인
            </router-link>
          </BlueBtn>
        </div>
      </div>
      <div id="lec_eval">
        <h2>강의평가</h2>
        <div class="section_wrap">
          <!-- 강의평가 LEFT SECTION -->
          <div class="left_sec">
            <h3>{{ detail.ranking }}</h3>
            <StarRating
              :rating="detail.ranking"
              :star-size="17"
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
            <button
              class="eval_btn"
              v-if="isPossibleReview && userStore_userinfo.access_token"
              @click="scoreModal()"
            >
              강의 평가
            </button>
          </div>
          <!-- 강의평가 RIGHT SECTION -->
          <div class="right_sec">
            <div
              class="line"
              v-for="(list, index) in score_info.score_list"
              :key="index"
            >
              <span class="left_star_wrap">
                <span class="left_star">
                  <img
                    src="@/assets/images/common/small_star.png"
                    alt=""
                    class="star"
                  />
                  <span class="star_count">{{ list.title }}</span>
                </span>
              </span>
              <ProgressBar
                :max="score_info.total"
                :value="list.count"
              ></ProgressBar>
            </div>
          </div>
        </div>
      </div>
      <CommentWrap
        :action="{
          action: 'get_session_review',
          session_id: $route.query.id,
        }"
        :isSubscribe="is_subscribe"
        @emitScoreCount="scoreCount"
      ></CommentWrap>
    </div>
  </div>
</template>
<script>
  import StarRating from "vue-star-rating";
  import CommentWrap from "@/components/lecture_detail/CommentWrap";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import CourseItem from "@/components/common/LectureItem.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import mixin from "@/views/mixins/lec_course_detail.js";
  import { mapState, mapMutations } from "vuex";
  export default {
    mixins: [mixin],
    components: {
      ProgressBar,

      StarRating,
      CommentWrap,
      BlueBtn,
      CourseItem,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_score_info: "score_info",
      }),
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    data() {
      return {};
    },
    methods: {
      video(course_id, lp_id) {
        this.$router.push({
          path: "/play",
          query: {
            course_id: course_id,
            lp_id: lp_id,
          },
        });
      },
      // 코스 상세 조회
      async getCourseDetail() {
        const data = {
          action: "get_session_info",
          session_id: this.$route.query.id,
        };
        await this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
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
      .tag {
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
        font-family: unset;
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
        border-radius: 10px;
        margin: 10px 0;
        height: 40px;
        line-height: 32px;
        font-size: 18px;
      }
    }
    .active_subscribe {
      background-color: #ff114a;
      border-color: #ff114a;
    }
    ::v-deep .vue-star-rating {
      display: unset;
      .vue-star-rating-rating-text {
        font-size: 15px;
        color: #333333;
        margin-left: 4px;
        display: inline-block;
        vertical-align: 1.5px;
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
      font-size: 20px;
      width: 100%;
      max-width: 720px;
      z-index: 2;
      left: 0;
      right: 0;
      margin: auto;
      span {
        width: 100%;
        display: block;
        height: 60px;
        line-height: 60px;
      }
    }
  }
  .course_info {
    padding: 4.445%;
    .course_list {
      font-size: 2rem;
      position: relative;
      .all_lecture_num {
        font-size: 14px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 21px;
        margin: auto;
      }
    }
    .ol_list {
      // width: 48.782%;
      margin-top: 5%;
      .title {
        font-size: 1.6875rem;
      }
      ::v-deep .item {
        .lec_list {
          img {
            width: 48.782%;
          }
        }
        h4 {
          font-size: 14px;
          margin-top: 5px;
        }
        .subtitle {
          font-size: 16px;
        }
        .evaluate {
          .score {
            width: 7%;
          }
          .free {
            width: calc(100% - 7% - 12px);
          }
        }
      }
      .btn_wrap {
        margin-top: 5px;
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
        .confirm_btn {
          ::v-deep button {
            background: white;
            color: #114fff;
          }
        }
      }
    }
  }
  #lec_eval {
    margin-top: 30px;
    padding: 0 4.445%;
    h2 {
      font-size: 2rem;
    }
    .section_wrap {
      margin-top: 10px;

      .left_sec {
        width: 41%;
        text-align: center;
        vertical-align: middle;
        display: inline-block;
        h3 {
          font-size: 15px;
        }
        ::v-deep .vue-star-rating {
          margin: 5px 0;
          display: block;
          .vue-star-rating-rating-text {
            display: none;
          }
        }
        .eval_btn {
          background: #114fff;
          color: white;
          border-radius: 5px;
          font-size: 11px;
          padding: 3px 26.95%;
        }
      }
      .right_sec {
        width: 59%;
        display: inline-block;
        vertical-align: middle;
        span {
          display: inline-block;
          vertical-align: middle;
          img {
            vertical-align: middle;
            width: 50%;
          }
        }
        .line {
          &:not(:first-child) {
            margin-top: 1%;
          }
          .left_star_wrap {
            width: 15%;
            .left_star {
              width: 100%;
              .star {
                width: 10px;
                height: 10px;
              }
              .star_count {
                font-size: 12px;
                margin-left: 4px;
              }
            }
          }
          ::v-deep .progress_bar {
            height: 8px;
            position: relative;
            width: 85%;
            margin: 0;
          }
        }
      }
    }
  }
</style>
