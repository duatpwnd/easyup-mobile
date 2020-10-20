<template>
  <div class="list_wrap">
    <div class="list list_left">
      <slot name="thumbnail">
        <img
          src="@/assets/images/common/popular_lec1.png"
          class="thumb"
          alt=""
        />
        <img
          src="@/assets/images/common/playing_ico.png"
          class="playing_ico"
          alt=""
          @click="playing()"
        />
      </slot>
    </div>
    <div class="list list_right">
      <slot name="info">
        <span class="name">강동원 강사님</span>
        <h2>
          파이썬 코딩 기본편 - 6시간 뒤면 여러분도 개발자! 여기까지 제목 3줄
          허용
        </h2>
        <div class="list_right_bottom">
          <span class="ing_ico">진행중</span>
          <span class="star_cell"> </span>
          <span class="num">5</span>
        </div>
      </slot>
    </div>
    <slot name="list_info"> </slot>
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
    .list {
      vertical-align: middle;
    }
    .list_left {
      display: inline-block;
      width: 50%;
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
      display: inline-block;
      width: 50%;
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
        .non_ing_ico {
          background: #dbdbdb;
          color: #999999;
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
    .progress {
      margin-top: 10px;
      .compile_wrap {
        padding: 0 4.445%;
        position: relative;
        background: #f8f8f8;
        box-sizing: border-box;
        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 10px;
        }
        ::v-deep .progress_bar {
          progress::-webkit-progress-value {
            background: #ecedee;
          }
          progress::-moz-progress-bar {
            background: #ecedee;
          }
          progress::-webkit-progress-bar {
            background: white;
          }
        }
        .date {
          color: #999999;
          font-size: 10px;
          position: absolute;
          top: 0;
          right: 4.445%;
          color: #999999;
          font-size: 10px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 4.445%;
          height: 15px;
          margin: auto;
        }
      }
    }
  }
</style>
