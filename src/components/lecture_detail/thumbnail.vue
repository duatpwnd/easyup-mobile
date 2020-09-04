<template>
  <div>
    <img
      src="@/assets/images/lec_detail/thumbnail1.png"
      alt="파이썬 코딩 기본편"
      title="파이썬 코딩 기본편"
    />
    <div id="tag_wrap">
      <h3 class="sub_title">프로그래밍</h3>
      <h2 class="title">파이썬 코딩 기본편 -6시간 뒤면 여러분도 개발자!</h2>
      <div class="tag_list">
        <span>#파이썬</span>
        <span>#python</span>
        <span>#코딩</span>
        <span>#coding</span>
      </div>
    </div>
    <div class="update_noti">
      <span>2020년 8월 29일(업데이트 일자:2020년 9월 1일)</span>
    </div>
    <div class="subscribe_wrap">
      <h2>무료</h2>
      <button class="subs_btn">구독하기</button>
      <div>
        <span class="total_lec">총<span class="color">11</span>강</span>
      </div>
      <div>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="star_wrap">
          <img src="@/assets/images/common/small_star.png" alt="" />
        </span>
        <span class="score">5.0</span>
      </div>
      <span class="name">강동원 강사님</span>
    </div>
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
  #tag_wrap {
    padding: 4.445%;
    .sub_title {
      font-size: 1.375rem;
      color: #999999;
    }
    .title {
      font-size: 2rem;
      color: #333333;
    }
    .tag_list {
      margin-top: 20px;
      span {
        color: #a4a4a4;
        border: 2px solid #757575;
        border-radius: 20px;
        padding: 1% 3%;
        margin-right: 2%;
      }
    }
  }
  .update_noti {
    padding: 15px 4.445%;
    background: #f8f8f8;
    span {
      color: #999999;
      font-size: 1.25rem;
    }
  }
  .subscribe_wrap {
    padding: 4.445%;
    .subs_btn {
      background: #114fff;
      display: block;
      width: 100%;
      color: #ffffff;
      font-family: "NotoSansCJKkr-Medium";
      font-size: 2.25rem;
      text-align: center;
      border-radius: 20px;
      margin: 15px 0;
      padding: 2% 0;
    }
    .total_lec {
      font-size: 1.375rem;
      .color {
        color: #114fff;
      }
    }
    .name {
      font-size: 1.375rem;
      color: #666666;
    }
    .star_wrap {
      width: 2.593%;
      display: inline-block;
    }
    .score {
      font-size: 1.375rem;
      color: #333333;
      vertical-align: middle;
      margin-left: 2%;
    }
  }
</style>
