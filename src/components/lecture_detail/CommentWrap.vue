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
            <span>댓글</span>
          </span>
        </div>
        <p class="contents">
          {{ list.reviews.contents }}
        </p>
        <CommentList
          class="reply_list"
          v-for="(reply, index) in list.reviews_comment"
          :key="'reply' + index"
        >
          <template slot="comment">
            <div class="comment_header">
              <span class="name">{{ reply.user_name }}</span>
              <span class="date">{{ reply.timeAgo }}</span>
            </div>
            <p class="contents">{{ reply.contents }}</p>
          </template>
        </CommentList>
      </template>
    </CommentList>
    <button class="more_view_btn">더 많은 평가 보기</button>
  </div>
</template>
<script>
  import CommentList from "@/components/common/CommentList.vue";
  export default {
    components: {
      CommentList,
    },
    data() {
      return {
        comment: "",
      };
    },
    methods: {
      // 강의평가 조회
      getCommentList() {
        const data = {
          action: "get_course_review",
          course_id: "61",
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log("댓글", result.data.data);
            this.comment = result.data.data;
          });
      },
    },
    created() {
      this.getCommentList();
    },
  };
</script>
<style scoped lang="scss">
  #comment_wrap {
    padding: 4.445%;
    padding-top: 0;
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
