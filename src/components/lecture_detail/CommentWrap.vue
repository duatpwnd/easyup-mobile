<template>
  <div id="comment_wrap">
    <CommentList v-for="(list, parent_index) in comment" :key="parent_index">
      <template slot="comment">
        <div class="comment_header" v-if="parent_index < view">
          <img
            src="@/assets/images/common/mid_star.png"
            alt=""
            v-for="(score, index) in Number(Math.floor(list.reviews.score))"
            :key="'full' + index"
          />

          <img
            src="@/assets/images/common/mid_empty_star.png"
            alt=""
            v-for="(score, index) in Number(5 - Math.round(list.reviews.score))"
            :key="'empty' + index"
          />
          <span class="name">{{ list.reviews.user_name }}</span>
          <span class="date">{{ list.reviews.timeAgo }}</span>
          <span class="btn_wrap">
            <span
              class="modify_btn"
              v-if="userStore_info.info.user_id == list.reviews.user_id"
              @click="
                scoreModal(
                  list.reviews.id,
                  list.reviews.score,
                  list.reviews.contents
                )
              "
              >수정</span
            >
            <span
              class="remove_btn"
              @click="comment_del(list.reviews.id)"
              v-if="userStore_info.info.user_id == list.reviews.user_id"
              >삭제</span
            >
            <span
              v-if="userStore_info.access_token && isSubscribe"
              @click="
                id = list.reviews.id;
                toggle();
              "
              >댓글</span
            >
          </span>
        </div>
        <p class="contents" v-if="parent_index < view">
          {{ list.reviews.contents }}
        </p>
        <div class="edit_wrap" ref="edit" v-show="active">
          <textarea
            placeholder="내용을 입력해주세요.(300자)"
            class="edit"
            name=""
            id=""
            v-on:input="contents = $event.target.value"
          ></textarea>
          <div class="btn_wrap">
            <BlueBtn class="left">
              <button slot="blue_btn" @click="reply_comment_add()">
                입력
              </button>
            </BlueBtn>
            <BlueBtn class="right">
              <button slot="blue_btn" @click="toggle_cancel()">
                취소
              </button>
            </BlueBtn>
          </div>
        </div>
        <CommentList
          class="reply_list"
          v-for="(reply, index) in list.reviews_comment"
          :key="'reply' + index"
        >
          <template slot="comment">
            <div class="comment_header" v-if="parent_index < view">
              <span class="name">{{ reply.user_name }}</span>
              <span class="date">{{ reply.timeAgo }}</span>
              <span class="btn_wrap">
                <span
                  class="modify_btn"
                  @click="toggle('modify')"
                  v-if="userStore_info.info.user_id == reply.user_id"
                  >수정</span
                >
                <span
                  @click="reply_comment_del(reply.id)"
                  v-if="userStore_info.info.user_id == reply.user_id"
                  >삭제</span
                >
              </span>
            </div>
            <p class="contents" v-if="parent_index < view">
              {{ reply.contents }}
            </p>
            <div
              class="edit_wrap"
              ref="reply_edit"
              v-show="active && userStore_info.info.user_id == reply.user_id"
            >
              <textarea
                placeholder="내용을 입력해주세요.(300자)"
                class="edit"
                name=""
                id=""
                ref="reply_contents_edit"
              ></textarea>
              <div class="btn_wrap">
                <BlueBtn class="left">
                  <button
                    slot="blue_btn"
                    @click="reply_comment_modify(reply.id, index)"
                  >
                    입력
                  </button>
                </BlueBtn>
                <BlueBtn class="right">
                  <button slot="blue_btn" @click="toggle_cancel()">
                    취소
                  </button>
                </BlueBtn>
              </div>
            </div>
          </template>
        </CommentList>
      </template>
    </CommentList>
    <p class="noti" v-if="comment.length === 0">등록된 강의평가가 없습니다.</p>
    <button
      class="more_view_btn"
      @click="moreView()"
      v-else-if="comment.length > 4 && comment.length != view"
    >
      더 많은 평가 보기
    </button>
  </div>
</template>
<script>
  import CommentList from "@/components/common/CommentList.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState, mapMutations } from "vuex";

  export default {
    props: {
      action: {
        type: Object,
        required: true,
      },
      isSubscribe: {
        type: Boolean,
        required: true,
      },
    },
    components: {
      BlueBtn,
      CommentList,
    },
    computed: {
      ...mapState("userStore", {
        userStore_info: "userinfo",
      }),
    },
    data() {
      return {
        active: false,
        contents: "",
        id: "", // 리뷰아이디
        comment: "",
        view: 4,
      };
    },
    methods: {
      // 토글

      toggle(modify) {
        if (
          event.path[2].nextElementSibling.nextElementSibling.style.display ==
          "none"
        ) {
          event.path[2].nextElementSibling.nextElementSibling.style.display =
            "block";
          if (modify != undefined) {
            event.path[2].nextElementSibling.nextElementSibling.children[0].value =
              event.path[2].nextElementSibling.innerText;
          }
        } else {
          event.path[2].nextElementSibling.nextElementSibling.style.display =
            "none";
        }
      },
      // 토글 일부취소

      toggle_cancel() {
        if (event.path[3].style.display == "none") {
          event.path[3].style.display = "block";
        } else {
          event.path[3].style.display = "none";
        }
      },
      toggleOff() {
        this.$refs.edit.forEach((el, index) => {
          el.style.display = "none";
        });
        this.$refs.reply_edit.forEach((el, index) => {
          el.style.display = "none";
        });
      },
      scoreModal(id, score, contents) {
        this.$store.commit("toggleStore/scoreToggle", {
          review_id: id,
          score_modal: true,
          score: score,
          score_contents: contents,
        });
      },
      // 댓글 삭제
      comment_del(index) {
        const obj = {
          action: "delete_review",
          review_id: index,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
          .then((result) => {
            console.log("댓글삭제", result);
            if (result.data.error != true) {
              this.$noticeMessage(result.data.data.msg);
              this.$EventBus.$emit("commentReload", true);
            }
          });
      },

      // 답글 추가
      reply_comment_add() {
        const data = {
          action: "add_comment",
          review_id: this.id,
          contents: this.contents,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("답글등록ddd", result);
            if (result.data.error != true) {
              this.$noticeMessage(result.data.data.msg);

              this.toggleOff();
              this.getCommentList();
            }
          });

        this.write_cancel();
      },
      // 답글 수정
      reply_comment_modify(index, num) {
        const obj = {
          action: "modify_comment",
          review_comment_id: index,
          contents: event.path[3].children[0].value.trim(),
        };
        console.log("수정:", obj);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
          .then((result) => {
            if (result.data.error != true) {
              this.$noticeMessage(result.data.data.msg);
              this.toggleOff();
              this.getCommentList();
            }
          });
      },
      // 답글 삭제
      reply_comment_del(index) {
        const obj = {
          action: "delete_comment",
          review_comment_id: index,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
          .then((result) => {
            this.getCommentList();
          });
      },
      write_cancel() {
        this.editor = -1;
      },
      // 각별점 개수 필터링
      scoreCount(result) {
        const filter = this.comment.filter((el, index) => {
          return el.reviews.score == result;
        });
        return filter.length;
      },
      // 더많은 평가 보기
      moreView() {
        this.view = this.comment.length;
        // const data = {
        //   action: "list_more",
        //   type: "course",
        //   course_id: this.$route.query.id,
        // };
        // this.$axios
        //   .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        //   .then((result) => {
        //     console.log("댓글조회", result);
        //   });
      },
      // 강의평가 조회
      getCommentList() {
        const data = this.action;
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result.data.data);
            this.comment = result.data.data;
            const score = {
              total: result.data.data.length,
              score_list: [
                { title: 5, count: this.scoreCount(5) },
                { title: 4, count: this.scoreCount(4) },
                { title: 3, count: this.scoreCount(3) },
                { title: 2, count: this.scoreCount(2) },
                { title: 1, count: this.scoreCount(1) },
              ],
            };
            this.$emit("emitScoreCount", score);
          });
      },
    },
    mounted() {
      this.$EventBus.$on("commentReload", () => {
        this.getCommentList();
      });
    },
    created() {
      this.getCommentList();
    },
  };
</script>
<style scoped lang="scss">
  #comment_wrap {
    margin-top: 30px;
    padding: 0 4.445%;
    padding-bottom: 30px;
    .edit_wrap {
      margin-top: 5px;

      .edit {
        border: 1px solid #dbdbdb;
        font-size: 1.375rem;
        width: 100%;
        resize: none;
        box-sizing: border-box;
        border-radius: 5px;
        height: 60px;
        padding: 10px;
        font-family: "NotoSansCJKkr-DemiLight";
        font-size: 11px;
        &::placeholder {
          color: #b5b5b5;
        }
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
    .more_view_btn {
      margin-top: 7%;
      border: 2px solid #114fff;
      color: #114fff;
      width: 100%;
      height: 24px;
      border-radius: 15px;
      font-family: "NotoSansCJKkr-Medium";
      font-size: 12px;
    }
    .noti {
      color: #333;
      font-size: 14px;
      text-align: center;
    }
    .reply_list {
      margin-top: 15px;
      margin-left: 10%;
      ::v-deep .comment_header {
        .name {
          margin-left: 0;
        }
      }
    }
  }
</style>
