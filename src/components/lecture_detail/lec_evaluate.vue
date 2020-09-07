<template>
  <div id="lec_eval">
    <h2>강의평가</h2>
    <div class="section_wrap">
      <div class="left_sec">
        <h3>5.0</h3>
        <div class="star_wrap">
          <span><img src="@/assets/images/common/big_star.png" alt=""/></span>
          <span><img src="@/assets/images/common/big_star.png" alt=""/></span>
          <span><img src="@/assets/images/common/big_star.png" alt=""/></span>
          <span><img src="@/assets/images/common/big_star.png" alt=""/></span>
          <span><img src="@/assets/images/common/big_star.png" alt=""/></span>
        </div>
        <button class="eval_btn">강의 평가</button>
      </div>
      <div class="right_sec">
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <span class="star">
                <img src="@/assets/images/common/small_star.png" alt="" />
              </span>
              <span class="star_count">5</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <span class="star">
                <img src="@/assets/images/common/small_star.png" alt="" />
              </span>
              <span class="star_count">4</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <span class="star">
                <img src="@/assets/images/common/small_star.png" alt="" />
              </span>
              <span class="star_count">3</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <span class="star">
                <img src="@/assets/images/common/small_star.png" alt="" />
              </span>
              <span class="star_count">2</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
        <div class="line">
          <span class="left_star_wrap">
            <span class="left_star">
              <span class="star">
                <img src="@/assets/images/common/small_star.png" alt="" />
              </span>
              <span class="star_count">1</span>
            </span>
          </span>
          <span class="progress"><span class="progress_bar"> </span></span>
        </div>
      </div>
    </div>
    <div class="comment_list">
      <div class="comment_header">
        <span><img src="@/assets/images/common/mid_star.png" alt=""/></span>
        <span class="name">김길동</span>
        <span class="date">4일전</span>
        <span class="btn_wrap">
          <span>수정</span>
          <span class="remove_btn">삭제</span>
          <span>댓글</span>
        </span>
      </div>
      <p class="contents">
        바로 한 번 더 볼 예정입니다. 그 만큼 한번으로는 흡수하기 힘든 깊은
        인사이트들이 많은 것 같아요. 특히 제가 현업에서 일하면서 궁금해하고
        고민하고 목말라했던 것들이 다 담겨있었습니다. 저도 직접 현업에
        녹여내면서 해보는 중인데 앞으로도 도움 많이받겠습니다! 좋은 강의
        진심으로 감사드립니다. 저의 커리어의 좋은 나침반이 되어주셔서
        감사합니다! 다음 강의도 정말 기대가 됩니당..ㅠ!
      </p>
    </div>
    <button class="more_view_btn">더 많은 평가 보기</button>
  </div>
</template>
<script>
  export default {
    components: {},
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
    margin-top: 20px;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .left_sec {
      width: 40.5%;
      text-align: center;
      float: left;
      h3 {
        font-size: 1.875rem;
      }
      .star_wrap {
        margin-bottom: 20px;
        margin-top: 10px;
        span {
          width: 10.6%;
          display: inline-block;
        }
      }
      .eval_btn {
        background: #114fff;
        color: white;
        border-radius: 5px;
        font-size: 1.375rem;
        padding: 2% 12%;
      }
    }
    .right_sec {
      width: 56.5%;
      margin-left: 3%;
      float: right;
      span {
        display: inline-block;
        vertical-align: middle;
        img {
          vertical-align: middle;
        }
      }
      .line {
        &:not(:first-child) {
          margin-top: 1%;
        }
        .left_star_wrap {
          width: 25%;
          .left_star {
            width: 100%;

            .star_count {
              margin-left: 15%;
              font-size: 18px;
            }
          }
        }
        .progress {
          width: 75%;
          background: #dbdbdb;
          height: 23px;
          border-radius: 4px;
          .progress_bar {
            border-radius: 4px;
            vertical-align: unset;
            background: #114fff;
            width: 40%;
            height: 23px;
          }
        }
      }
    }
  }
  .comment_list {
    margin-top: 9%;
    .comment_header {
      position: relative;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .name {
        margin-left: 2%;
        color: #333333;
        font-size: 1.5rem;
      }
      .date {
        color: #999999;
        font-size: 0.9375rem;
        margin: 0 2%;
      }
      .btn_wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 82%;
        margin: auto;
        width: 25%;
        text-align: center;
        span {
          color: #114fff;
          font-size: 1.125rem;
        }
        .remove_btn {
          margin: 0 7%;
        }
      }
    }
    .contents {
      text-align: justify;
      color: #666666;
      font-size: 1.375rem;
      margin-top: 2%;
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
