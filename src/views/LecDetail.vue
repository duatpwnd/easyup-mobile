<template>
  <div id="lec_detail" v-if="detail">
    <StarScoreModal
      :ranking="detail.ranking"
      v-show="toggleStore_scoreModal"
    ></StarScoreModal>
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
            >총<span class="color"> {{ detail.total_lecture }}</span
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
    <div id="intro">
      <div v-if="typeof detail.description[0] != 'undefined'">
        <h2 class="title" v-if="detail.description[0].underline">
          {{ detail.description[0].title }}
        </h2>
        <h2 v-else>{{ detail.description[0].title }}</h2>
        <div
          class="description_contents"
          v-html="detail.description[0].content"
        ></div>
      </div>
      <div v-if="typeof detail.description[1] != 'undefined'">
        <h2 class="title title2" v-if="detail.description[1].underline">
          {{ detail.description[1].title }}
        </h2>
        <h2 class="title2" v-else>{{ detail.description[1].title }}</h2>
        <div
          class="recommand_list"
          v-html="detail.description[1].content"
        ></div>
      </div>
      <div class="example" v-if="typeof detail.description[2] != 'undefined'">
        <h2 class="title" v-if="detail.description[2].underline">
          {{ detail.description[2].title }}
        </h2>
        <h2 v-else>{{ detail.description[2].title }}</h2>
        <div
          class="description_contents"
          v-html="detail.description[2].content"
        >
          다양한 주제의 파이썬 계산기 실전 프로젝트를 이용해서 단 100분동 안
          파이썬의 핵심요소 10 가지를 배울 수 있는 좋은 강의입니다. 향후에
          사물인터넷(IoT), 딥러닝, 데이터 분석 등 관련 프로젝트를 해 도 쉽게
          적용하실 수 있을 겁니다.
        </div>
      </div>
    </div>
    <div class="curriculum">
      <div class="curriculum_header">
        <h2 class="curriculum_title">커리큘럼</h2>
        <button class="subscribe_btn">강의 구독</button>
        <span class="total_lec">총 {{ detail.curriculum_list.count }}강</span>
      </div>
      <ul
        class="curriculum_list"
        v-for="(list, index) in detail.curriculum_list.items"
        :key="index"
      >
        <li v-if="list.children_count != null">
          <span class="lec_title">
            {{ list.title }}
          </span>
          <span class="lec_num">
            {{ list.children_count }}
          </span>
        </li>
        <li v-else>
          <span class="lec_title else_lec_title">
            {{ list.title }}
          </span>
        </li>
      </ul>
    </div>
    <div class="teacher_intro">
      <h2 class="intro">강사소개</h2>
      <div
        class="name"
        v-if="detail.teacher_introduce.length !== 0"
        v-html="detail.teacher_introduce[0].content"
      ></div>
      <!-- <h3 class="career">현:아이티윌 전임 강사</h3>
        <h3 class="career">전:EBS 1타 강사</h3> -->
    </div>
    <!-- description :: E  -->

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
            v-if="is_subscribe == false"
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
        action: 'get_course_review',
        course_id: $route.query.id,
      }"
      @emitScoreCount="scoreCount"
    ></CommentWrap>
  </div>
</template>
<script>
  import StarScoreModal from "@/components/common/StarScoreModal.vue";
  import CommentWrap from "@/components/lecture_detail/CommentWrap";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import StarRating from "vue-star-rating";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import mixin from "@/components/mixins/lec_course_detail.js";
  import { mapState, mapMutations } from "vuex";

  export default {
    mixins: [mixin],

    components: {
      StarScoreModal,
      BlueBtn,
      StarRating,
      ProgressBar,
      CommentWrap,
    },
    computed: {
      ...mapState("userStore", {
        userStore_token: "token",
      }),
      ...mapState("toggleStore", {
        toggleStore_scoreModal: "score_modal",
      }),
    },
    data() {
      return {};
    },
    methods: {
      video() {
        this.$router.push("/play");
      },
      scoreModal() {
        this.$store.commit("toggleStore/Toggle", {
          score_modal: true,
        });
      },

      // 강의 상세 조회
      async getLectureDetail() {
        const data = {
          action: "get_course_info",
          course_id: this.$route.query.id,
        };
        await this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log("강의상세:", result.data.data);
            this.detail = result.data.data;
          });
      },
    },
    created() {
      this.$axios
        .all([this.isSubscribe(), this.getLectureDetail()])
        .then(this.$axios.spread((countries, cities) => {}));
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
  #intro {
    padding: 4.445%;
    padding-top: 0;
    h2 {
      font-size: 2rem;
    }
    .title {
      display: inline-block;
      border-bottom: 8px solid #5ef4ff;
    }
    .title2 {
      margin-top: 50px;
    }
    .description_contents {
      margin-top: 10px;
      color: #666666;
      font-size: 14px;
      text-align: justify;
      font-family: "NotoSansCJKkr-Regular";
    }
    .recommand_list {
      margin-top: 20px;
      font-size: 14px;
      font-family: "NotoSansCJKkr-Regular";
    }
    .example {
      margin-top: 50px;

      img {
        margin-top: 20px;
      }
    }
  }
  .curriculum {
    margin-top: 30px;
    padding: 0 4.445%;
    .curriculum_header {
      position: relative;
      .curriculum_title {
        display: inline-block;
        vertical-align: middle;
      }
      .subscribe_btn {
        border-radius: 5px;
        margin-left: 3%;
        width: 54px;
        height: 16px;
        vertical-align: middle;
        font-family: inherit;
        font-size: 9px;
        color: #114fff;
        border: 1px solid #114fff;
      }
      .total_lec {
        font-size: 1.25rem;
        color: #333333;
        line-height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 50%;
      }
    }
    .curriculum_list {
      li {
        margin-top: 2%;
        .lec_title,
        .lec_num {
          font-size: 1.25rem;
          color: #333333;
          background: #f8f8f8;
          padding: 1% 2%;
          box-sizing: border-box;
          border-radius: 12px;
        }
        .lec_title {
          display: inline-block;
          width: 85%;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .else_lec_title {
          width: 100%;
          border-radius: 12px;
        }
        .lec_num {
          width: 13%;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          margin-left: 2%;
          display: inline-block;
          text-align: center;
        }
      }
    }
  }
  .teacher_intro {
    margin-top: 30px;
    padding: 0 4.445%;
    .intro {
      font-size: 2rem;
    }
    .name {
      font-size: 1.5rem;
      margin: 2.287% 0;
    }
    .career {
      color: #999999;
      font-size: 1.25rem;
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
          .progress {
            width: 85%;
            background: #dbdbdb;
            height: 8px;
            border-radius: 4px;
            position: relative;
            .progress_bar {
              border-radius: 4px;
              vertical-align: unset;
              background: #114fff;
              width: 40%;
              height: 8px;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
  }
</style>
