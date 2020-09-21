<template>
  <div id="lec_eval">
    <h2>강의평가</h2>
    <div class="section_wrap">
      <div class="left_sec">
        <h3>5.0</h3>
        <div class="star_wrap">
          <img src="@/assets/images/common/big_star.png" alt="" />
          <img src="@/assets/images/common/big_star.png" alt="" />
          <img src="@/assets/images/common/big_star.png" alt="" />
          <img src="@/assets/images/common/big_star.png" alt="" />
          <img src="@/assets/images/common/big_star.png" alt="" />
        </div>
        <button class="eval_btn">강의 평가</button>
      </div>
      <div class="right_sec">
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <img
                src="@/assets/images/common/small_star.png"
                alt=""
                class="star"
              />
              <span class="star_count">5</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <img
                src="@/assets/images/common/small_star.png"
                alt=""
                class="star"
              />
              <span class="star_count">4</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <img
                src="@/assets/images/common/small_star.png"
                alt=""
                class="star"
              />
              <span class="star_count">3</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <img
                src="@/assets/images/common/small_star.png"
                alt=""
                class="star"
              />
              <span class="star_count">2</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <img
                src="@/assets/images/common/small_star.png"
                alt=""
                class="star"
              />
              <span class="star_count">1</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
      </div>
    </div>
    <CommentList></CommentList>
    <button class="more_view_btn">더 많은 평가 보기</button>
  </div>
</template>
<script>
  import CommentList from "@/components/common/comment_list.vue";
  export default {
    components: {
      CommentList,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  h2 {
    font-size: 2rem;
  }
  #lec_eval {
    padding: 4.445%;
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
          width: 23%;
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
          width: 77%;
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
    padding: 1% 0;
    border-radius: 15px;
    font-family: "NotoSansCJKkr-Medium";
    font-size: 1.5rem;
  }
</style>
