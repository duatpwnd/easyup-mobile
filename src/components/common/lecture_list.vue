<template>
  <div class="list_warp">
    <div class="list list_left">
      <span> <img src="@/assets/images/common/popular_lec1.png" alt=""/></span>
    </div>
    <div class="list list_right">
      <p>
        파이썬 코딩 기본편 - 6시간 뒤면 여러분도 개발자! 여기까지 제목 3줄 허용
      </p>
      <div class="list_right_bottom">
        <span class="ing_ico">진행중</span>
        <span>
          <img src="@/assets/images/common/big_star.png" alt="" />
        </span>
        <span class="num">5</span>
      </div>
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
  .list_warp {
    display: table;
    width: 100%;
    p {
      font-size: 1.6875rem;
      font-weight: 600;
    }
    .ing_ico {
      background: #114fff;
      font-size: 1.25rem;
      color: white;
      border-radius: 4px;
      padding: 2% 5%;
    }
    .list {
      vertical-align: middle;
    }
    .list_left {
      display: table-cell;
      width: 50%;
      img {
        width: 89%;
      }
    }
    .list_right {
      display: table-cell;
      width: 50%;

      .list_right_bottom {
        display: table;
        width: 100%;
        .num {
          font-size: 2rem;
          vertical-align: middle;
        }
        img {
          width: 9.4%;
        }
      }
    }
  }
</style>
