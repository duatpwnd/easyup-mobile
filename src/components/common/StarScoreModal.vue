<template>
  <div class="lec_eval_modal">
    {{ rating }}
    <StarRating
      :rating="Number(score)"
      :star-size="17"
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
        v-on:input="contents = $event.target.value"
      ></textarea>
    </div>
    <div class="btn_wrap">
      <slot name="modify">
        <BlueBtn class="left">
          <button slot="blue_btn" @click="add_review()">
            저장
          </button>
        </BlueBtn>
      </slot>

      <BlueBtn class="right">
        <button slot="blue_btn" @click="cancel()">
          취소
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import StarRating from "vue-star-rating";
  import { mapState, mapMutations } from "vuex";

  export default {
    props: {
      ranking: {
        type: Number,
      },
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_score: "score",
      }),
    },
    components: {
      BlueBtn,
      StarRating,
    },
    data() {
      return {
        contents: "",
        rating: this.ranking,
      };
    },
    methods: {
      setRating(rating) {
        this.rating = rating;
      },
      cancel() {
        this.$store.commit("toggleStore/Toggle", {
          score_modal: false,
        });
      },
      add_review() {
        const data = {
          action: "add_review",
          course_id: this.$route.query.id,
          star: this.rating,
          contents: this.contents.trim(),
          type: "course",
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log("댓글등록", result);
            if (result.data.error != true) {
              this.$store.commit("toggleStore/Toggle", {
                notice_modal: true,
              });
              this.$store.commit(
                "toggleStore/noticeMessage",
                result.data.data.msg
              );
              this.$EventBus.$emit("commentReload", true);
              this.cancel();
            }
          });
      },
    },
  };
</script>
<style scoped lang="scss">
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
</style>
