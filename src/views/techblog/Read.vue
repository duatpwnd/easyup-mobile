<template>
  <div class="read" v-if="list">
    <div class="contents_wrap">
      <div class="head">
        <h2>{{ list.info.title }}</h2>
      </div>
      <span class="date">{{ list.info.wdate }}</span>
      <div class="contents" v-html="list.info.contents"></div>
    </div>
    <h2 class="comment_title">댓글</h2>

    <CommentWrap
      v-if="list.comment.length > 0"
      :comment="list.comment"
    ></CommentWrap>
    <div class="comment_wrap">
      <h3 v-if="list.comment.length == 0">
        게시물에 등록된 댓글이 없습니다. 댓글을 작성해주세요.
      </h3>
      <div class="edit_wrap" v-show="editor">
        <textarea
          placeholder="내용을 입력해주세요.(300자)"
          class="edit"
          v-model="contents"
        ></textarea>
        <div class="btn_wrap">
          <BlueBtn class="left">
            <button slot="blue_btn" @click="comment_add()">입력</button>
          </BlueBtn>
          <BlueBtn class="right">
            <button slot="blue_btn" @click="write_cancel()">취소</button>
          </BlueBtn>
        </div>
      </div>
      <BlueBtn class="comment_write" v-show="write_btn">
        <button slot="blue_btn" @click="write()">
          댓글쓰기
        </button>
      </BlueBtn>
    </div>
    <div class="button_wrap">
      <BlueBtn class="btn" v-if="list.info.neiborLink.prevInfo != false">
        <button slot="blue_btn" @click="view(list.info.neiborLink.prevInfo.id)">
          이전글
        </button>
      </BlueBtn>

      <BlueBtn
        class="btn last_btn"
        v-if="list.info.neiborLink.nextInfo != false"
      >
        <button slot="blue_btn" @click="view(list.info.neiborLink.nextInfo.id)">
          다음글
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
import CommentWrap from "@/components/techblog/CommentWrap.vue";
export default {
  components: {
    CommentWrap,
    BlueBtn
  },
  data() {
    return {
      editor: false,
      write_btn: true,
      list: "",
      contents: ""
    };
  },
  methods: {
    write() {
      this.editor = true;
      this.write_btn = false;
    },
    write_cancel() {
      this.editor = false;
      this.write_btn = true;
      this.contents = "";
    },
    comment_add() {
      const data = {
        action: "add_blog_comment",
        id: this.list.info.id,
        contents: this.contents.trim()
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log("댓글등록", result);
          if (result.data.error != true) {
            this.view(this.$route.query.id);
            this.write_cancel();
          }
        });
    },
    view(id) {
      const data = {
        action: "get_blog_info",
        id: id
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log("기술블로그읽기", result.data.data);
          this.list = result.data.data;
          this.$router
            .push({
              query: {
                id: id
              }
            })
            .catch(() => {});
        });
    }
  },
  created() {
    this.view(this.$route.query.id);
    this.$EventBus.$on("techblog_list_reload", () => {
      this.view(this.$route.query.id);
    });
  }
};
</script>
<style scoped lang="scss">
.read {
  .contents_wrap {
    border-bottom: 4px solid #f8f8f8;
    padding: 4.445% 0;
    .head {
      border-bottom: 2px solid #333333;
      padding-bottom: 10px;
      h2 {
        font-size: 2rem;
      }
    }
    .date {
      margin-top: 10px;
      font-size: 1.125rem;
      display: block;
      color: #999999;
    }
    .contents {
      margin-top: 10px;
      font-size: 1.25rem;
      color: #666666;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .comment_title {
    margin-top: 10px;
  }
  .comment_wrap {
    padding: 4.445% 0;
    h2 {
      font-size: 1.5rem;
      font-weight: 500;
    }
    h3 {
      font-size: 1.375rem;
      color: #666666;
      text-align: center;
      font-weight: 500;
      margin: 20px 0 30px 0;
    }
    .blue_btn {
      padding-bottom: 19px;
    }
    .comment_write {
      border-bottom: 2px solid #333333;
    }
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
        border-bottom: 2px solid #333333;
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
  .button_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
      width: 23.172%;
      button {
        border: 1px solid #114fff;
        background: white;
        color: #114fff;
        height: 24px;
        line-height: 16px;
        font-size: 12px;
      }
    }
    .last_btn {
      float: right;
    }
  }
}
</style>
