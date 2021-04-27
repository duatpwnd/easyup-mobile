<template>
  <div id="comment_wrap">
    <CommentList v-for="(list, index) in comment" :key="index">
      <template slot="comment">
        <div class="comment_header">
          <span class="name">{{ list.writer }}</span>
          <span class="date">{{ list.timeAgo }}</span>
          <span class="btn_wrap">
            <span
              class="modify_btn"
              v-if="userStore_info.info.user_id == list.user_id"
              @click="
                toggle('modify');
                comment_mode = 'modify';
              "
              >수정</span
            >
            <span
              class="remove_btn"
              @click="reply_comment_del(list.id)"
              v-if="userStore_info.info.user_id == list.user_id"
              >삭제</span
            >
            <span
              v-if="userStore_info.access_token"
              @click="
                toggle();
                comment_mode = 'comment';
              "
              >댓글</span
            >
          </span>
        </div>
        <p class="contents">
          {{ list.contents }}
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
              <button
                v-if="comment_mode == 'modify'"
                slot="blue_btn"
                @click="reply_comment_modify(list.id, index)"
              >
                수정
              </button>
              <button
                v-else
                slot="blue_btn"
                @click="reply_comment_add(list.blog_id, list.id)"
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
        <CommentList
          class="reply_list"
          v-for="(reply, reply_index) in list.child_comment"
          :key="'reply' + reply_index"
        >
          <template slot="comment">
            <div class="comment_header">
              <span class="name">{{ reply.writer }}</span>
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
            <p class="contents">{{ reply.contents }}</p>
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
                    @click="reply_comment_modify(reply.id, reply_index)"
                  >
                    수정
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
    <!-- <p class="noti" v-if="comment.length === 0">등록된 강의평가가 없습니다.</p>
    <button class="more_view_btn" v-else-if="comment.length > 4">
      더 많은 평가 보기
    </button> -->
  </div>
</template>
<script>
  import CommentList from "@/components/common/CommentList.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";

  export default {
    props: {
      comment: {
        type: Array,
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
        comment_mode: "",
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
          } else {
            event.path[2].nextElementSibling.nextElementSibling.children[0].value =
              "";
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
      // 토글 전체취소
      toggleOff() {
        this.$refs.edit.forEach((el, index) => {
          el.style.display = "none";
        });
        console.log(this.$refs.reply_edit);
        if (this.$refs.reply_edit != undefined) {
          this.$refs.reply_edit.forEach((el, index) => {
            el.style.display = "none";
          });
        }
        this.contents = "";
      },
      // 답글 추가
      reply_comment_add(blog_id, list_id) {
        const data = {
          action: "add_blog_comment",
          id: blog_id,
          parent_id: list_id, // 대댓글인 경우에만 필수
          contents: this.contents.trim(),
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("답글등록", result);
            if (result.data.error != true) {
              this.toggleOff();
              this.$EventBus.$emit("techblog_list_reload", true);
            }
          });
      },
      // 답글 수정
      reply_comment_modify(id, index) {
        const data = {
          action: "modify_blog_comment",
          id: id,
          contents: event.path[3].children[0].value.trim(),
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("수정등록", result);
            if (result.data.error != true) {
              this.$EventBus.$emit("techblog_list_reload", true);
              this.toggleOff();
            }
          });
      },
      // 답글 삭제
      reply_comment_del(id) {
        const data = {
          action: "delete_blog_comment",
          id: id,
        };
        console.log("삭제:", data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("삭제완료", result);
            this.$EventBus.$emit("techblog_list_reload", true);
            this.toggleOff();
          });
      },
    },
    mounted() {},
    created() {},
  };
</script>
<style scoped lang="scss">
  #comment_wrap {
    padding: 30px 0;
    ::v-deep .comment_list {
      .comment_header {
        .name {
          margin-left: 0;
        }
      }
    }
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
