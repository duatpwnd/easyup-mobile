<template>
  <div class="read">
    <div class="contents_wrap">
      <div class="head">
        <h2>DB분산처리를 위한 Sharding</h2>
      </div>
      <span class="date">2020.07.20</span>
      <div class="contents">
        <br />파이썬을 이제 막 시작한 여러분 안녕하세요.<br />첫번째
        과제입니다.<br />공부 열심히 하세요. 첨부파일 꼭 읽어보시고 이번주
        수요일까지 제출 부탁드립니다. 그럼 이만.<br /><br />
      </div>
    </div>
    <div class="comment_wrap">
      <h2>댓글</h2>
      <!-- <CommentList></CommentList> -->
      <h3>게시물에 등록된 댓글이 없습니다. 댓글을 작성해주세요.</h3>
      <div class="edit_wrap" v-show="editor">
        <textarea
          placeholder="내용을 입력해주세요.(300자)"
          class="edit"
          name=""
          id=""
        ></textarea>
        <div class="btn_wrap">
          <BlueBtn class="left">
            <button slot="blue_btn" @click="enter()">입력</button>
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
      <BlueBorderBtn class="left_btn">
        <button slot="blue_border_btn">
          이전글
        </button> </BlueBorderBtn
      ><BlueBorderBtn class="right_btn">
        <button slot="blue_border_btn">
          다음글
        </button>
      </BlueBorderBtn>
    </div>
  </div>
</template>
<script>
  // import CommentList from "@/components/common/comment_list.vue";
  import BlueBtn from "@/components/common/blue_btn.vue";
  import BlueBorderBtn from "@/components/common/blue_border_btn.vue";
  export default {
    components: {
      // CommentList,
      BlueBtn,
      BlueBorderBtn,
    },
    data() {
      return {
        editor: false,
        write_btn: true,
      };
    },
    methods: {
      enter() {
        this.write_cancel();
      },
      write() {
        this.editor = true;
        this.write_btn = false;
      },
      write_cancel() {
        this.editor = false;
        this.write_btn = true;
      },
    },
  };
</script>
<style scoped lang="scss">
  .read {
    .contents_wrap {
      padding: 4.445%;
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
        white-space: pre-wrap;
        font-size: 1.25rem;
        color: #666666;
        font-family: "NotoSansCJKkr-Regular";
      }
    }
    .comment_wrap {
      border-top: 4px solid #f8f8f8;
      padding: 4.445%;
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
      padding: 4.445%;
      padding-top: 0;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .left_btn {
        float: left;
        width: 23.172%;
      }
      .right_btn {
        float: right;
        width: 23.172%;
      }
    }
  }
</style>
