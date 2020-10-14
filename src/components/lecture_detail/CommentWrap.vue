<template>
  <div id="comment_wrap">
    <CommentList v-for="(list, index) in comment" :key="index">
      <template slot="comment">
        <div class="comment_header">
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
              @click="scoreModal(list.reviews.id)"
              >수정</span
            >
            <span
              class="remove_btn"
              v-if="userStore_info.info.user_id == list.reviews.user_id"
              >삭제</span
            >
            <span
              v-if="userStore_info.access_token"
              @click="
                isActive = !isActive;
                id = list.reviews.id;
              "
              >댓글</span
            >
          </span>
        </div>
        <p class="contents">
          {{ list.reviews.contents }}
        </p>
        <div class="edit_wrap" v-if="isActive">
          <textarea
            placeholder="내용을 입력해주세요.(300자)"
            class="edit"
            name=""
            id=""
            v-on:input="contents = $event.target.value"
          ></textarea>
          <div class="btn_wrap">
            <BlueBtn class="left">
              <button slot="blue_btn" @click="reply_comment_add()">입력</button>
            </BlueBtn>
            <BlueBtn class="right">
              <button slot="blue_btn" @click="write_cancel()">취소</button>
            </BlueBtn>
          </div>
        </div>
        <CommentList
          class="reply_list"
          v-for="(reply, index) in list.reviews_comment"
          :key="'reply' + index"
        >
          <template slot="comment">
            <div class="comment_header">
              <span class="name">{{ reply.user_name }}</span>
              <span class="date">{{ reply.timeAgo }}</span>
              <span class="btn_wrap">
                <span
                  class="modify_btn"
                  v-if="userStore_info.info.user_id == reply.user_id"
                  @click="isActive = !isActive"
                  >수정</span
                >
                <span v-if="userStore_info.info.user_id == reply.user_id"
                  >삭제</span
                >
              </span>
            </div>
            <p class="contents">{{ reply.contents }}</p>
            <div
              class="edit_wrap"
              v-show="userStore_info.info.user_id == reply.user_id && isActive"
            >
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
                  <button slot="blue_btn" @click="write_cancel()">취소</button>
                </BlueBtn>
              </div>
            </div>
          </template>
        </CommentList>
      </template>
    </CommentList>
    <p class="noti" v-if="comment.length === 0">등록된 강의평가가 없습니다.</p>
    <button class="more_view_btn" v-else-if="comment.length > 4">
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
        contents: "",
        isActive: false,
        id: "", // 리뷰아이디
        comment: "",
      };
    },
    methods: {
      scoreModal(id) {
        this.id = id;
        this.$store.commit("toggleStore/Toggle", {
          score_modal: true,
        });
      },
      // 댓글 삭제
      // comment_del(index) {
      //   const obj = {
      //     a: "delete_review",
      //     review_id: index,
      //   };
      //   //console.log('삭제:',obj);
      //   $.ajax({
      //     type: "POST",
      //     url: "{{_p.web_ajax}}review.ajax.php",
      //     data: obj,
      //     success: function(result) {
      //       const parse = JSON.parse(result);
      //       //console.log(parse);
      //       Comment.comment_list();
      //     },
      //   });
      // },
      // // 댓글 수정
      // comment_modify(index) {
      //   const obj = {
      //     a: "modify_review",
      //     star: $(`.big-star img[src='{{_p.web_img}}star_on.png']`).length,
      //     review_id: $(".lec_hidden").val(),
      //     contents: $("#lec_edit")
      //       .val()
      //       .trim(),
      //   };
      //   //console.log('수정:',obj);
      //   $.ajax({
      //     type: "POST",
      //     url: "{{_p.web_ajax}}review.ajax.php",
      //     data: obj,
      //     success: function(result) {
      //       const parse = JSON.parse(result);
      //       //console.log(parse,parse.msg);
      //       modal_toggle(".mask1", parse.msg);
      //       if (parse.result) {
      //         Comment.comment_list();
      //       }
      //     },
      //   });
      // },
      // // 댓글 더보기
      // comment_more_view() {
      //   const obj = {
      //     a: "list_more",
      //     type: rv_type,
      //     course_id: rv_id,
      //   };
      //   //console.log('더보기:',obj);
      //   $.ajax({
      //     type: "POST",
      //     url: "{{_p.web_ajax}}review.ajax.php",
      //     data: obj,
      //     success: function(result) {
      //       const parse = JSON.parse(result);
      //       //console.log(parse);
      //       $(".more-bt").toggle();
      //       // 댓글부분
      //       $("#review-wrap-box").append($(parse.reviewList));
      //     },
      //   });
      // },
      // 답글 추가
      reply_comment_add() {
        const data = {
          action: "add_comment",
          review_id: this.id,
          contents: this.contents.trim(),
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization:
                "Bearer " + this.$cookies.get("user_info").access_token,
            },
          })
          .then((result) => {
            console.log("답글등록", result);
            if (result.data.error != true) {
              this.$store.commit("toggleStore/Toggle", {
                notice_modal: true,
              });
              this.$store.commit(
                "toggleStore/noticeMessage",
                result.data.data.msg
              );
              this.getCommentList();
            } else {
              console.log("토큰없당");
              this.$Util.default.logOut();
            }
          });

        this.write_cancel();
      },
      // 답글 수정
      reply_comment_modify(index) {
        // const obj = {
        //   action: "modify_comment",
        //   review_comment_id: index,
        //   contents: $("#review_comment_" + index + " textarea")
        //     .val()
        //     .trim(),
        // };
        // //console.log('수정:',obj);
        // $.ajax({
        //   type: "POST",
        //   url: "{{_p.web_ajax}}review.ajax.php",
        //   data: obj,
        //   success: function(result) {
        //     const parse = JSON.parse(result);
        //     //console.log(parse,parse.msg);
        //     modal_toggle(".mask1", parse.msg);
        //     if (parse.result) {
        //       Comment.comment_list();
        //     }
        //   },
        // });
      },
      // // 답글 삭제
      // reply_comment_del(index) {
      //   const obj = {
      //     a: "delete_comment",
      //     review_comment_id: index,
      //   };
      //   //console.log('삭제:',obj);
      //   $.ajax({
      //     type: "POST",
      //     url: "{{_p.web_ajax}}review.ajax.php",
      //     data: obj,
      //     success: function(result) {
      //       const parse = JSON.parse(result);
      //       //console.log(parse);
      //       Comment.comment_list();
      //     },
      //   });
      // },
      write_cancel() {
        this.editor = -1;
        // this.write_btn = true;
      },
      // 각별점 개수 필터링
      scoreCount(result) {
        const filter = this.comment.filter((el, index) => {
          return el.reviews.score == result;
        });
        return filter.length;
      },
      // 강의평가 조회
      getCommentList() {
        const data = this.action;
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log("댓글조회", result.data.data);
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
        console.log("리로드 왔다");
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
    .edit_wrap {
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
