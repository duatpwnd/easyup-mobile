<template>
  <div id="popular_lec">
    <h2 class="title">인기 강의</h2>
    <p>이지업의 가장 인기가 많은 강의를 확인해보세요</p>
    <ul class="lec_list_wrap">
      <li>
        <router-link to="/main/detail" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec1.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h4>나도 코딩</h4>
        <h2 class="subtitle">파이썬 코딩 기본편</h2>
        <div class="evaluate">
          <span class="star">
            <img src="@/assets/images/common/mid_star.png" />
          </span>
          <span class="score">5.0</span>
          <h1 class="free">FREE</h1>
        </div>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec2.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h4>나도 코딩</h4>
        <h2 class="subtitle">파이썬 코딩 기본편</h2>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec3.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h4>나도 코딩</h4>
        <h2 class="subtitle">파이썬 코딩 기본편</h2>
      </li>
      <li>
        <router-link to="/about" class="lec_list">
          <img
            src="@/assets/images/main/popular_lec4.png"
            alt="이지업"
            title="이지업"
          />
        </router-link>
        <h4>나도 코딩</h4>
        <h2 class="subtitle">파이썬 코딩 기본편</h2>
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
    .title {
      font-size: 2rem;
    }

    p {
      margin-top: 2%;
      font-size: 1.125rem;
      color: #999999;
    }
    .lec_list_wrap {
      margin-top: 3%;
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
        h4 {
          font-size: 0.9375rem;
          margin-top: 3%;
          color: #999999;
        }
        .subtitle {
          font-size: 1.3125rem;
        }
        .lec_list {
          display: inline-block;
          width: 100%;
        }
        .evaluate {
          margin-bottom: 2%;
          display: table;
          width: 100%;
          .star {
            display: table-cell;
            width: 7.6%;
            vertical-align: middle;
          }
          .score {
            font-size: 1.5rem;
            display: table-cell;
            width: 15%;
            text-align: center;
          }
          .free {
            display: table-cell;
            text-align: right;
            font-size: 1.5rem;
            color: #114fff;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
