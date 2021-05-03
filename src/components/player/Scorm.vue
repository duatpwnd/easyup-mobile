<template>
  <div class="scorm">
    <div class="lec_eval_modal" v-if="modal">
      <StarRating
        :v-model="contents"
        :star-size="17"
        :increment="1"
        @rating-selected="setRating"
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
      >
      </StarRating>
      <div class="bookmark-add">
        <p class="add-txt">강의를 들으신 후 소감을 남겨주세요</p>
        <textarea
          id="lec_edit"
          maxlength="300"
          placeholder="300자 이내로 입력해 주세요."
          class="lec_edit"
          v-model="contents"
        ></textarea>
      </div>
      <div class="btn_wrap">
        <BlueBtn class="left">
          <button slot="blue_btn" @click="add_review()">
            저장
          </button>
        </BlueBtn>
        <BlueBtn class="right">
          <button slot="blue_btn" @click="modal = false">
            취소
          </button>
        </BlueBtn>
      </div>
    </div>
    <h2 v-html="player_info.title"></h2>
    <ProgressBar
      :max="100"
      :value="Number(player_info.percent[0])"
    ></ProgressBar>
    <div class="process">
      <span>진도율 :</span>
      <span>
        {{ player_info.complete_items }}강/ {{ player_info.total_items }} 강 ({{
          player_info.percent[0]
        }}%)</span
      >
      <div>
        <span>기간 :</span>
        <span> {{ player_info.progress_date }} </span>
      </div>
    </div>
    <div class="btn_wrap">
      <BlueBtn
        class="btn eval"
        v-if="player_info.is_possible_review && evaluate"
      >
        <button slot="blue_btn" @click="modal = true">
          강의평가
        </button>
      </BlueBtn>
      <BlueBtn
        class="btn bookmark"
        v-if="
          playerStore_lp_type != 'link' && playerStore_custom_type != 'download'
        "
      >
        <button slot="blue_btn" @click="bookmarkAddModal()">
          책갈피 +
        </button>
      </BlueBtn>
      <BlueBtn class="btn next" v-if="playerStore_nextBtn == false">
        <button slot="blue_btn" @click="switchItem(playerStore_nextItem)">
          다음강의 보기
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop } from "vue-property-decorator";
  import StarRating from "vue-star-rating";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import Mixin from "@/components/player/player_mixin";
  @Component({
    components: {
      StarRating,
      ProgressBar,
      BlueBtn,
    },
  })
  export default class Scorm extends Mixin {
    @Prop(Object) private player_info!: object;
    private evaluate = true;
    private modal = false;
    private contents = "";
    private rating!: number;
    private add_review(): void {
      const data = {
        action: "add_review",
        course_id: this.$route.query.course_id,
        star: this.rating,
        contents: this.contents.trim(),
        type: "course",
      };
      console.log(data);
      if (data.star == 0) {
        this.$noticeMessage("점수를 선택해주세요.");
      } else {
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result: { [key: string]: any }) => {
            console.log("강의평가등록", result);
            if (result.data.error != true) {
              this.$noticeMessage(result.data.data.msg);
              this.modal = false;
              this.evaluate = false;
            }
          });
      }
    }
    private setRating(rating: number): void {
      this.rating = rating;
    }
    // 즐겨찾기 추가 모달
    private bookmarkAddModal(): void {
      this.$store.commit("toggleStore/Toggle", {
        bookmark_modal: true,
      });
    }
  }
</script>
<style scoped lang="scss">
  .scorm {
    padding: 4.445%;
    padding-bottom: 3%;
    h2 {
      font-size: 18px;
      color: #333333;
    }
    ::v-deep .progress_bar {
      height: 8px;
      position: relative;
      width: 100%;
      margin: 0;
      border-radius: 5px;
      margin: 10px 0;
    }
    .progress {
      width: 100%;
      background: #dbdbdb;
      height: 8px;
      border-radius: 10px;
      display: inline-block;
      margin: 4% 0;
      position: relative;
      .progress_bar {
        display: inline-block;
        border-radius: 10px;
        background: #114fff;
        width: 40%;
        height: 8px;
        position: absolute;
        top: 0;
      }
    }
    .process {
      span {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }
    }
    .btn_wrap {
      margin-top: 2%;
      &:after {
        display: block;
        content: "";
        clear: both;
      }

      .btn {
        float: left;
        width: 23.171%; /* 152px/656px */
        button {
          border: 1px solid #114fff;
          background: white;
          color: #114fff;
          height: 24px;
          line-height: 16px;
          font-size: 12px;
        }
      }
      .next {
        float: right;
        width: 28.354%; /* 186px/656px */
      }
      .eval {
        margin-right: 2%;
      }
    }
    .lec_eval_modal {
      position: fixed;
      width: 90%;
      height: 320px;
      background: #ffffff;
      border: 1px solid #707070;
      padding: 20px;
      margin-top: 12px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 1;
      max-width: 720px;
      box-sizing: border-box;
      ::v-deep .vue-star-rating {
        display: block;
        text-align: center;
        .vue-star-rating-rating-text {
          display: none;
        }
      }
      .add-txt {
        font-size: 16px;
        text-align: center;
        margin: 14px 0 10px 0;
      }
      .lec_edit {
        resize: none;
        width: 100%;
        height: 152px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
        outline: none;
      }
      .btn_wrap {
        margin-top: 10px;

        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
          button {
            background: white;
            color: #114fff;
          }
        }
      }
    }
  }
</style>
