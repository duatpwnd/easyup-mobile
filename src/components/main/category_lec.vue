<template>
  <div id="category_lec">
    <h1>카테고리별 강의<button class="more_view">더보기</button></h1>
    <p>관심 있는 분야의 강으를 한눈에 확인하세요</p>

    <div class="category_list">
      <router-link to="/">
        <img
          class="lec1_ico"
          src="@/assets/images/main/category_lec1_ico.png"
        />
        <h2>프로그래밍</h2>
      </router-link>

      <router-link to="/">
        <img
          class="lec2_ico"
          src="@/assets/images/main/category_lec2_ico.png"
        />
        <h2>프로그래밍</h2>
      </router-link>

      <router-link to="/">
        <img
          class="lec3_ico"
          src="@/assets/images/main/category_lec3_ico.png"
        />
        <h2>프로그래밍</h2>
      </router-link>

      <router-link to="/">
        <img
          class="lec4_ico"
          src="@/assets/images/main/category_lec4_ico.png"
        />
        <h2>프로그래밍</h2>
      </router-link>
    </div>
    <div class="notice_wrap">
      <span class="notice_title">공지사항</span>
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

    h1 {
      font-size: 2rem;
      font-family: "NotoSansCJKkr-Medium";
      position: relative;
      .more_view {
        position: absolute;
        font-size: 1.125rem;
        font-family: "NotoSansCJKkr-Medium";
        color: #114fff;
        border: 1px solid #114fff;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        padding: 0 2%;
        margin: auto;
        height: 90%;
        line-height: 220%;
      }
    }
    h2 {
      font-size: 0.875rem;
      margin-top: 10px;
      font-family: "NotoSansCJKkr-Regular";
      color: #333333;
    }
    p {
      margin-top: 10px;
      font-size: 1.125rem;
      font-family: "NotoSansCJKkr-DemiLight";
      color: #999999;
    }
    .category_list {
      margin-top: 20px;

      a {
        display: inline-block;
        border: 1px solid #666666;
        padding: 2% 6.098%;
        margin-right: 2%;
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        .lec1_ico {
          width: 62.86%;
        }
      }
    }
    .notice_wrap {
      background: #f4f4f4;
      text-align: center;
      border-radius: 30px;
      padding: 1.45% 4.88%;
      .notice_title {
        color: #114fff;
        font-size: 1.25rem;
        font-family: "NotoSansCJKkr-Bold";
        font-weight: bold;
      }
      .notice_contents {
        color: #787878;
        margin-left: 5%;
        margin-right: 14%;
        font-size: 1.25rem;
        font-family: "NotoSansCJKkr-Regular";
      }
    }
  }
</style>
