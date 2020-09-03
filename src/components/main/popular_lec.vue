<template>
  <div id="popular_lec">
    <h1>인기 강의</h1>
    <p>이지업의 가장 인기가 많은 강의를 확인해보세요</p>
    <ul class="lec_list_wrap">
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec1.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h3>나도 코딩</h3>
        <h2>파이썬 코딩 기본편</h2>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec2.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h3>나도 코딩</h3>
        <h2>파이썬 코딩 기본편</h2>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec3.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h3>나도 코딩</h3>
        <h2>파이썬 코딩 기본편</h2>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec4.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h3>나도 코딩</h3>
        <h2>파이썬 코딩 기본편</h2>
      </li>
    </ul>
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
<style lang="scss" scoped>
  #popular_lec {
    padding: 4.445%;
    h1 {
      font-size: 2rem;
      font-family: "NotoSansCJKkr-Medium";
    }
    h2 {
      font-size: 1.3125rem;
      font-family: "NotoSansCJKkr-Medium";
    }
    h3 {
      font-size: 0.9375rem;
      margin-top: 10px;
      font-family: "NotoSansCJKkr-DemiLight";
      color: #999999;
    }
    p {
      margin-top: 10px;
      font-size: 1.125rem;
      font-family: "NotoSansCJKkr-DemiLight";
      color: #999999;
    }
    .lec_list_wrap {
      margin-top: 20px;
      &:after {
        display: block;
        clear: both;
        content: "";
      }
      li {
        float: left;
        width: 48.6%;
        &:nth-child(odd) {
          margin-right: 2.44%;
        }
        .lec_list {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
</style>
