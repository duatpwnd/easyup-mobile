<template>
  <div id="category_lec">
    <h2>카테고리별 강의<button class="more_view">더보기</button></h2>
    <p>관심 있는 분야의 강의를 한눈에 확인하세요</p>

    <div class="category_list">
      <router-link to="/">
        <span>
          <img
            class="lec1_ico"
            src="@/assets/images/main/category_lec1_ico.png"
          />
          <h3>프로그래밍</h3>
        </span>
      </router-link>

      <router-link to="/">
        <span>
          <img
            class="lec2_ico"
            src="@/assets/images/main/category_lec2_ico.png"
          />
          <h3>머신러닝/딥러닝</h3>
        </span>
      </router-link>

      <router-link to="/">
        <span>
          <img
            class="lec3_ico"
            src="@/assets/images/main/category_lec3_ico.png"
          />
          <h3>데브옵스</h3>
        </span>
      </router-link>

      <router-link to="/">
        <span>
          <img
            class="lec4_ico"
            src="@/assets/images/main/category_lec4_ico.png"
          />
          <h3>전산기초/이론</h3>
        </span>
      </router-link>
    </div>
    <div class="notice_wrap">
      <h1 class="notice_title">공지사항</h1>
      <span :class="$mq" class="notice_contents"
        >코로나 극복 프로젝트 모든 강의 25% 할인</span
      >
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
  #category_lec {
    padding: 4.445%;

    h2 {
      font-size: 2rem;
      position: relative;
      .more_view {
        font-family: "NotoSansCJKkr-Medium";
        position: absolute;
        font-size: 1.125rem;
        color: #114fff;
        border: 1px solid #114fff;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        padding: 2px 20px;
      }
    }
    h3 {
      font-size: 0.875rem;
      margin-top: 10px;
      color: #333333;
      white-space: nowrap;
    }
    p {
      margin-top: 10px;
      font-size: 1.125rem;
      color: #999999;
    }
    .category_list {
      margin-top: 20px;

      a {
        border: 1px solid #666666;

        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        width: 23.173%;
        // .lec1_ico {
        //   width: 62.86%;
        // }
        &:not(:last-child) {
          margin-right: 2%;
        }
        span {
          display: inline-block;
          padding: 11.34% 6.098%;
          img {
            width: unset;
            height: 30px;
          }
        }
      }
    }
    .notice_wrap {
      background: #f4f4f4;
      border-radius: 30px;
      padding: 1.45% 4.88%;
      margin-top: 5%;
      .notice_title {
        color: #114fff;
        font-size: 1.25rem;
        font-weight: bold;
        display: inline-block;
        width: 20%;
        text-align: left;
      }
      .notice_contents {
        text-align: left;
        color: #787878;
        margin-left: 5%;
        font-size: 1.25rem;
        display: inline-block;
        width: 75%;
      }
    }
  }
</style>
