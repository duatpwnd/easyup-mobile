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
            v-for="(score, index) in Number(5 - list.reviews.score)"
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
        .star_wrap {
          margin: 5px 0;
          img {
            width: 17px;
            height: 16px;
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
  }
</style>
