<template>
  <div class="list_warp">
    <div class="list list_left">
      <img src="@/assets/images/common/popular_lec1.png" alt="" />
    </div>
    <div class="list list_right">
      <span class="name">강동원 강사님</span>
      <h2>
        파이썬 코딩 기본편 - 6시간 뒤면 여러분도 개발자! 여기까지 제목 3줄 허용
      </h2>
      <div class="list_right_bottom">
        <span class="ing"><span class="ing_ico">진행중</span></span>
        <span class="star">
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

    .list {
      vertical-align: middle;
    }
    .list_left {
      display: table-cell;
      width: 48%;
      img {
        width: 97.565%;
      }
    }
    .list_right {
      display: table-cell;
      width: 48%;
      h2 {
        font-size: 1.6875rem;
      }
      .name {
        color: #999999;
        font-size: 1.25rem;
      }
      .list_right_bottom {
        display: table;
        width: 100%;
        .ing {
          width: 80%;
          vertical-align: middle;
          display: table-cell;
          .ing_ico {
            background: #114fff;
            font-size: 1.25rem;
            color: white;
            border-radius: 4px;
            padding: 2.076% 6.92%; /* 20px/289px */
          }
        }
        .star {
          width: 13%;
          vertical-align: middle;
          display: table-cell;
          text-align: right;
          img {
            width: 73.94%;
          }
        }
        .num {
          width: 7%;
          vertical-align: middle;
          display: table-cell;
          font-size: 2rem;
          text-align: right;
        }
      }
    }
  }
</style>
