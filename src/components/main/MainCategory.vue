<template>
  <div id="category_lec">
    <h2>카테고리별 강의<button class="more_view">더보기</button></h2>
    <p>관심 있는 분야의 강의를 한눈에 확인하세요</p>

    <div class="category_list">
      <router-link to="/category">
        <img
          style="height:15px;"
          class="lec1_ico"
          src="@/assets/images/main/category_lec1_ico.png"
          alt="프로그래밍"
          title="프로그래밍"
        />
        <h3>프로그래밍</h3>
      </router-link>

      <router-link to="/">
        <img
          style="height:16.5px;"
          class="lec2_ico"
          src="@/assets/images/main/category_lec2_ico.png"
          alt="머신러닝/딥러닝"
          title="머신러닝/딥러닝"
        />
        <h3>머신러닝/딥러닝</h3>
      </router-link>

      <router-link to="/">
        <img
          style="height:17px;"
          class="lec3_ico"
          src="@/assets/images/main/category_lec5_ico.png"
          alt="전산이론"
          title="전산이론"
        />
        <h3>전산이론</h3>
      </router-link>

      <router-link to="/">
        <img
          style="height:15px;"
          class="lec4_ico"
          src="@/assets/images/main/category_lec6_ico.png"
          alt="알고리즘"
          title="알고리즘"
        />
        <h3>알고리즘</h3>
      </router-link>
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
    margin-top: 24px;
    h2 {
      font-size: 2rem;
      position: relative;
      .more_view {
        font-family: "NotoSansCJKkr-Medium";
        position: absolute;
        font-size: 9px;
        color: #114fff;
        border: 1px solid #114fff;
        top: 0;
        right: 0;
        bottom: 0;
        height: 16px;
        padding: 1px 10px;
        border-radius: 4px;
        margin: auto;
        line-height: 14px;
      }
    }
    h3 {
      font-size: 7px;
      color: #333333;
      white-space: nowrap;
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      margin: auto;
    }
    p {
      margin-top: 5px;
      font-size: 1.125rem;
      color: #999999;
    }
    .category_list {
      margin-top: 8px;

      a {
        border: 1px solid #666666;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        width: 23.17%;
        height: 48px;
        position: relative;
        box-sizing: border-box;
        &:not(:last-child) {
          margin-right: 2%;
        }

        img {
          position: absolute;
          width: unset;
          top: 10px;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }
</style>
