<template>
  <div class="item">
    <slot name="router">
      <router-link to="/" class="lec_list"> </router-link>
    </slot>
    <slot name="teacher">
      <!-- <h4>나도 코딩</h4> -->
    </slot>
    <slot name="subtitle">
      <!-- <h2 class="subtitle">파이썬 코딩 기본편</h2> -->
    </slot>
    <div class="evaluate">
      <!-- <img src="@/assets/images/common/mid_star.png" class="star" /> -->
      <slot name="grade">
        <!-- <span class="score">5.0</span> -->
      </slot>
      <slot name="free">
        <!-- <span class="free"></span> -->
      </slot>
    </div>
  </div>
</template>
<script>
  import { Component, Vue } from "vue-property-decorator";
  @Component({
    components: {},
  })
  export default class LectureItem extends Vue {}
</script>
<style scoped lang="scss">
  .item {
    border-radius: 10px;
    overflow: hidden;
    h4 {
      font-size: 0.9375rem;
      margin-top: 3.5px;
      color: #999999;
    }
    .subtitle {
      font-size: 14px;
      height: 38px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
    }
    .lec_list {
      overflow: hidden;
      display: inline-block;
      width: 100%;
      border-radius: 10px;
    }
    .evaluate {
      .score {
        vertical-align: middle;
        font-size: 18px;
        display: inline-block;
        width: 15%;
        text-align: left;
        background: url("~@/assets/images/common/mid_star.png") no-repeat center
          left / 12px 11px;
        padding-left: 17px;
        box-sizing: border-box;
      }
      .free {
        vertical-align: middle;
        display: inline-block;
        font-size: 18px;
        color: #114fff;
        font-weight: bold;
        width: calc(100% - 15%);
        text-align: right;
      }
      .price {
        vertical-align: middle;
        display: inline-block;
        width: calc(100% - 15%);
        text-align: right;
        span {
          font-weight: bold;
        }
        .original {
          font-size: 13px;
          color: #bdbdbd;
        }
        .final {
          margin-left: 5px;
          font-size: 14px;
          color: #114fff;
        }
      }
      .date {
        text-align: right;
        font-size: 12px;
        color: #999999;
        display: block;
      }
    }
  }
</style>
