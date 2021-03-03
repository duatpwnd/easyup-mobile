<template>
  <div id="lec_detail" v-if="Object.keys(detail).length > 0">
    <PurchaseApply
      v-if="toggleStore_purchase_apply"
      @goToOrder="
        $router.push({
          path: 'order',
          query: {
            type: 'course',
            cart_id: $route.query.id,
          },
        })
      "
      :lecture_info="detail"
    ></PurchaseApply>
    <ConfirmModal
      @ok="video($route.query.id, detail.lp_id)"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <StarScoreModal
      :score_info="toggleStore_score_info"
      v-if="toggleStore_score_info.score_modal"
    ></StarScoreModal>
    <img
      :src="detail.course_image"
      alt="파이썬 코딩 기본편"
      title="파이썬 코딩 기본편"
    />
    <div class="update_noti">
      <span
        >{{ detail.creation_date }}(업데이트 일자:{{
          detail.update_date
        }})</span
      >
    </div>
    <section class="section1">
      <div class="lecture_title">
        <h3 class="sub_title" v-html="detail.category"></h3>
        <h2 class="title" v-html="detail.title"></h2>
      </div>
      <div class="star_rating">
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
      <h2 class="free" v-if="detail.price.is_free">무료</h2>
      <div class="price" v-else>
        <del
          class="original"
          v-if="detail.price.format_original != detail.price.format_final"
          >{{ detail.price.format_original }}</del
        >
        <span class="final">{{ detail.price.format_final }}원</span>
      </div>
      <div id="tag_wrap">
        <slot name="title_wrap">
          <div class="tag_list">
            <router-link
              class="tag"
              :to="{
                path: '/category',
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
      <div
        class="coupon_wrap"
        @click="couponDownload()"
        v-if="detail.price.is_free"
      >
        <!-- <span class="txt" v-if="detail.coupon.discount_type == 'price'"
          >{{ discount_price }}원 할인 쿠폰 받기</span
        >
        <span class="txt" v-else
          >{{ detail.coupon.discount_price }}% 할인 쿠폰 받기</span
        > -->
        <!-- <span class="coupon_section">
          <span class="get_coupon"></span>
        </span>
        <div class="quantity">
          <span class="count">수량 : {{ quantity }}개</span>
        </div> -->
      </div>
      <div id="subscribe">
        <div>
          <div class="subscribe_wrap">
            <!-- 강의를 구매한경우 -->
            <BlueBtn v-if="is_subscribe">
              <button
                ref="subs_btn"
                class="active_subscribe"
                slot="blue_btn"
                @click="video($route.query.id, detail.lp_id)"
              >
                강의 보러가기
              </button>
            </BlueBtn>
            <!-- 무료강의인경우 -->
            <BlueBtn v-else-if="detail.price.is_free" @click.native="isWatch()">
              <button ref="subs_btn" slot="blue_btn">
                구매하기
              </button>
            </BlueBtn>
            <!-- 강의 구매를 안한경우 -->
            <BlueBtn
              v-else-if="is_subscribe == false && detail.price.is_free == false"
            >
              <button ref="subs_btn" slot="blue_btn" @click="isPurchase()">
                구매하기
              </button>
            </BlueBtn>
          </div>
        </div>
        <div class="fixed_subs_btn" v-if="subscribe_btn">
          <!-- 강의를 구매한경우 -->
          <button
            v-if="is_subscribe"
            class="active_subscribe"
            @click="video($route.query.id, detail.lp_id)"
          >
            강의 보러가기
          </button>
          <!-- 무료강의인경우 -->
          <button
            class="free_lecture_btn"
            v-else-if="detail.price.is_free"
            @click="isWatch()"
          >
            구매하기
          </button>
          <!-- 강의 구매를 안한경우 -->
          <div
            v-else-if="is_subscribe == false && detail.price.is_free == false"
          >
            <button class="add_btn" @click="cartAdd()">강의담기</button>
            <button
              class="share_btn"
              v-clipboard="url"
              v-clipboard:success="share"
              @click="share()"
            >
              공유하기
            </button>
            <button class="purchase_btn" @click="isPurchase()">
              구매하기
            </button>
          </div>
        </div>
      </div>
      <div class="add_share">
        <BlueBtn
          class="add"
          @click.native="cartAdd()"
          v-if="detail.price.is_free == false && is_subscribe == false"
        >
          <button slot="blue_btn">
            강의담기
          </button>
        </BlueBtn>
        <BlueBtn
          class="share"
          @click.native="share()"
          :style="[
            detail.price.is_free == false && is_subscribe == false
              ? { 'margin-left': '2%' }
              : { 'margin-left': 0, width: '100%' },
          ]"
        >
          <button slot="blue_btn" v-clipboard="url" v-clipboard:success="share">
            공유하기
          </button>
        </BlueBtn>
      </div>
    </section>
    <section class="section2">
      <div class="user_intro">
        <div class="teacher-profile-info">
          <span
            class="name teacher-profile"
            :style="{
              background: `url(${detail.teachers.profile_image}) no-repeat 
      center / 100% 100%`,
            }"
          ></span>
          <span class="teacher-name" v-html="detail.teachers.name"></span>
        </div>
        <div>
          <span class="access_limit">{{ detail.access_limit.basic }}</span>
        </div>
        <div>
          <span class="total_lec"
            ><span class="color">
              {{ detail.curriculum_list.count_detail }}</span
            >개 레슨</span
          >
        </div>
      </div>
    </section>
    <div id="intro">
      <div
        class="example"
        v-for="(li, index) in detail.description"
        :key="index"
      >
        <h2 class="title" v-if="li.underline" v-html="li.title"></h2>
        <h2 v-else v-html="li.title"></h2>
        <div class="description_contents" v-html="li.content"></div>
      </div>
    </div>
    <div class="curriculum">
      <div class="curriculum_header">
        <h2 class="curriculum_title">커리큘럼</h2>
        <!-- <button
          class="subscribe_btn"
          v-if="is_subscribe"
          @click="video($route.query.id, detail.lp_id)"
        >
          PLAY ▶
        </button>
        <button class="subscribe_btn" v-else>강의 구독</button> -->
        <span class="total_lec"
          >{{ detail.curriculum_list.count_detail }}개 레슨</span
        >
      </div>
      <ul
        class="curriculum_list"
        v-for="(list, index) in detail.curriculum_list.items"
        :key="index"
      >
        <li v-if="list.children_count != null">
          <span class="lec_title" v-html="list.title"> </span>
          <span class="lec_num"> {{ list.children_count }}레슨</span>
        </li>
        <li v-else>
          <span class="lec_title else_lec_title" v-html="list.title"> </span>
        </li>
      </ul>
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
        action: 'get_course_review',
        course_id: $route.query.id,
      }"
      :isSubscribe="is_subscribe"
      @emitScoreCount="scoreCount"
    ></CommentWrap>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import StarScoreModal from "@/components/lecture_detail/StarScoreModal.vue";
  import CommentWrap from "@/components/lecture_detail/CommentWrap.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import StarRating from "vue-star-rating";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import mixin from "@/views/mixins/lec_course_detail.ts";
  import { mapState, mapMutations } from "vuex";
  import { ResultData } from "@/assets/js/util.ts";
  import PurchaseApply from "@/components/modal/PurchaseApply.vue";
  @Component({
    components: {
      ConfirmModal,
      StarScoreModal,
      BlueBtn,
      StarRating,
      ProgressBar,
      CommentWrap,
      PurchaseApply,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_score_info: "score_info",
        toggleStore_confirmModal: "confirm_modal",
        toggleStore_purchase_apply: "purchase_apply",
      }),
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
  })
  export default class LecDetail extends mixin {
    url: string = window.document.location.href;
    get discount_price() {
      return this.$numberWithCommas(
        (this.detail as { [key: string]: any }).coupon.discount_price
      );
    }
    get quantity() {
      return this.$numberWithCommas(
        (this.detail as { [key: string]: any }).coupon.quantity
      );
    }
    isPurchase() {
      this.$store.commit("toggleStore/Toggle", {
        purchase_apply: true,
      });
    }
    isWatch() {
      this.$confirmMessage("강의시청<br>강의를 시청 하시겠습니까?");
    }
    // 쿠폰다운
    couponDownload(): void {
      const data: { action: string; course_id: number; c_id: number } = {
        action: "download_coupon",
        course_id: Number(this.$route.query.id),
        c_id: (this.detail as { [key: string]: any }).coupon.coupon_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          this.$noticeMessage("쿠폰 발급이 완료되었습니다.");
        });
    }
    video(course_id: any, lp_id: any): void {
      this.$router.push({
        path: "/play",
        query: {
          course_id: course_id,
          lp_id: lp_id,
        },
      });
    }
    // 강의평가 모달
    scoreModal(): void {
      const obj: {
        score_modal: boolean;
        score: number;
        score_contents: string;
      } = {
        score_modal: true,
        score: 0,
        score_contents: "",
      };
      this.$store.commit("toggleStore/scoreToggle", obj);
    }

    // 강의 상세 조회
    async getLectureDetail(): Promise<void> {
      const data: { action: string; course_id: number } = {
        action: "get_course_info",
        course_id: (this.$route.query.id as unknown) as number,
      };
      await this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          console.log(result);
          this.detail = result.data.data;
        });
    }
    mounted() {
      this.$EventBus.$on("commentReload", () => {
        this.getLectureDetail();
      });
    }
    created() {
      if (this.$cookies.get("user_info") != null) {
        this.isSubscribe();
      }
      this.getLectureDetail();
    }
  }
</script>
<style scoped lang="scss">
  .update_noti {
    padding: 15px 4.445%;
    background: #f8f8f8;
    span {
      color: #999999;
      font-size: 14px;
    }
  }
  .section1 {
    padding: 4.445%;
    padding-bottom: 0;
    border-bottom: 4px solid #f8f8f8;
    .lecture_title {
      .sub_title {
        font-size: 14px;
        color: #999999;
      }
      .title {
        font-size: 18px;
        color: #333333;
        word-wrap: break-word;
      }
    }
    .star_rating {
      margin: 5px 0;
      ::v-deep .vue-star-rating {
        display: unset;
        .vue-star-rating-rating-text {
          font-size: 16px;
          color: #333333;
          margin-left: 4px;
          display: inline-block;
          vertical-align: 1.5px;
        }
      }
    }
    .price {
      span {
        font-weight: bold;
      }
      .original {
        font-size: 14px;
        color: #bdbdbd;
      }
      .final {
        margin-left: 5px;
        font-size: 18px;
        color: #114fff;
      }
    }
    #tag_wrap {
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
    .free {
      margin-top: 10px;
      font-size: 18px;
    }
    .coupon_wrap {
      margin-top: 15px;
      .txt {
        font-size: 18px;
        display: inline-block;
        height: 46px;
        line-height: 46px;
        vertical-align: middle;
        width: 80%;
        text-align: center;
        font-weight: bold;
        border: 1px solid #dbdbdb;
        box-sizing: border-box;
        border-right: 0;
      }
      .coupon_section {
        background-color: #ff114a;
        width: 20%;
        height: 46px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        box-sizing: border-box;
        border: 1px solid #ff114a;
        .get_coupon {
          vertical-align: middle;
          background: url("~@/assets/images/lec_detail/discount_ico.png")
            no-repeat center center / 24px 22px;
          display: inline-block;
          width: 24px;
          height: 26px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .quantity {
      margin-top: 5px;
      .count {
        font-size: 14px;
      }
    }
    #subscribe {
      .subscribe_wrap {
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
        width: 100%;
        max-width: 720px;
        z-index: 2;
        left: 0;
        right: 0;
        margin: auto;
        .add_btn,
        .share_btn {
          white-space: nowrap;
          text-indent: 100%;
          overflow: hidden;
          height: 64px;
          width: 20%;
        }
        .free_lecture_btn {
          width: 100%;
          display: block;
          height: 64px;
          line-height: 64px;
          background: transparent;
          font-family: "NotoSansCJKkr-Medium";
          font-size: 20px;
          color: #ffffff;
        }
        .purchase_btn {
          background: transparent;
          width: 60%;
          font-family: "NotoSansCJKkr-Medium";
          font-size: 20px;
          vertical-align: middle;
          color: #ffffff;
          text-align: center;
        }
        .add_btn {
          border-right: 1px solid #ccc;
          background: #333333
            url("~@/assets/images/lec_detail/fixed_lecture_add_ico.png")
            no-repeat center / 28px 27px;
        }
        .share_btn {
          background: #333333
            url("~@/assets/images/lec_detail/fixed_share_ico.png") no-repeat
            center / 28px 27px;
        }
        .active_subscribe {
          background-color: #ff114a;
          border-color: #ff114a;
          width: 100%;
          font-size: 20px;
          color: white;
          height: 64px;
        }
      }
    }
  }
  .section2 {
    padding: 4.445%;
    border-bottom: 4px solid #f8f8f8;
    .user_intro {
      .total_lec,
      .access_limit {
        font-size: 14px;
      }
      .teacher-profile-info {
        margin-bottom: 10px;
        .teacher-profile {
          width: 60px;
          height: 60px;
          display: inline-block;
          border-radius: 50px;
          vertical-align: middle;
        }
        .teacher-name {
          font-size: 14px;
          margin-left: 15px;
          vertical-align: middle;
        }
      }
    }
    .name {
      font-size: 14px;
    }
  }
  .add_share {
    .blue_btn {
      display: inline-block;
      width: 49%;

      ::v-deep button {
        padding-left: 20px;
        background: white;
        border: 2px solid black;
        color: black;
        border-radius: 10px;
        margin: 10px 0;
        height: 40px;
        line-height: 32px;
        font-size: 18px;
      }
    }
    .add {
      ::v-deep button {
        background: url("~@/assets/images/lec_detail/lecture_add_ico.png")
          no-repeat 14px center / 28px 27px;
      }
    }
    .share {
      margin-left: 2%;
      ::v-deep button {
        background: url("~@/assets/images/lec_detail/share_ico.png") no-repeat
          no-repeat 14px center / 28px 27px;
      }
    }
  }
  #intro {
    padding: 4.445%;
    h2 {
      font-size: 18px;
    }
    .title {
      display: inline;
      background: linear-gradient(#ffffff 60%, rgba(94, 244, 255, 0.34) 40%);
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
      &:not(:first-child) {
        margin-top: 50px;
      }
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
        font-size: 18px;
      }
      .subscribe_btn {
        vertical-align: middle;

        border-radius: 5px;
        margin-left: 3%;
        width: 23%;
        height: 22px;
        font-family: inherit;
        font-size: 12px;
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
          padding: 10px 15px;
          box-sizing: border-box;
          border-radius: 100px;
        }
        .lec_title {
          display: inline-block;
          width: 74%;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
        }
        .else_lec_title {
          width: 100%;
          border-radius: 100px;
        }
        .lec_num {
          width: 24%;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          margin-left: 2%;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
  .teacher_intro {
    margin-top: 30px;
    padding: 0 4.445%;
    .intro {
      font-size: 18px;
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
      font-size: 18px;
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
