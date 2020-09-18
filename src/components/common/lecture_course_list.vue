<template>
  <div class="list_wrap">
    <div class="list list_left">
      <img src="@/assets/images/common/popular_lec1.png" class="thumb" alt="" />
      <img
        src="@/assets/images/common/playing_ico.png"
        class="playing_ico"
        alt=""
        @click="playing()"
      />
    </div>
    <div class="list list_right">
      <span class="name">강동원 강사님</span>
      <h2>
        파이썬 코딩 기본편 - 6시간 뒤면 여러분도 개발자! 여기까지 제목 3줄 허용
      </h2>
      <div class="list_right_bottom">
        <span class="ing_ico">진행중</span>
        <span class="star_cell"> </span>
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
    methods: {
      playing() {
        this.$router.push("/play").catch(() => {});
      },
    },
  };
</script>
<style scoped lang="scss">
  .list_wrap {
    display: table;
    width: 100%;

    .list {
      vertical-align: middle;
    }
    .list_left {
      display: table-cell;
      width: 48%;
      position: relative;

      .playing_ico {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 48px;
        height: 48px;
      }
    }
    .list_right {
      display: table-cell;
      width: 48%;
      padding: 5px;
      box-sizing: border-box;
      h2 {
        font-size: 14px;
      }
      .name {
        color: #999999;
        font-size: 10px;
      }
      .list_right_bottom {
        display: table;
        width: 100%;

        .ing_ico {
          width: 30.5%;
          vertical-align: middle;
          display: table-cell;
          background: #114fff;
          font-size: 10px;
          color: white;
          border-radius: 4px;
          text-align: center;
          height: 20px;
          line-height: 20px;
        }
        .star_cell {
          display: table-cell;
          width: 66%;
          background: url("~@/assets/images/common/big_star.png") no-repeat 98%
            center / 17px 16px;
        }
        .num {
          display: table-cell;
          text-align: right;
          font-size: 16px;
        }
      }
    }
  }
</style>
