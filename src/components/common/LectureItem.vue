<template>
  <div class="item">
    <slot name="router">
      <router-link to="/" class="lec_list">
        <img
          src="@/assets/images/main/popular_lec1.png"
          alt="이지업"
          title="이지업"
        />
      </router-link>
    </slot>
    <slot name="teacher">
      <h4>나도 코딩</h4>
    </slot>
    <slot name="subtitle">
      <h2 class="subtitle">파이썬 코딩 기본편</h2>
    </slot>
    <div class="evaluate">
      <img src="@/assets/images/common/mid_star.png" class="star" />
      <slot name="grade">
        <span class="score">5.0</span>
      </slot>
      <slot name="free">
        <span class="free"></span>
      </slot>
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
  .item {
    h4 {
      font-size: 0.9375rem;
      margin-top: 3.5px;
      color: #999999;
    }
    .subtitle {
      font-size: 10.5px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .lec_list {
      display: inline-block;
      width: 100%;
    }
    .evaluate {
      margin-top: 4.5px;

      .star {
        width: 12px;
        height: 11px;
        vertical-align: middle;
      }
      .score {
        vertical-align: middle;
        font-size: 12px;
        display: inline-block;
        width: 15%;
        text-align: center;
      }
      .free {
        vertical-align: middle;
        display: inline-block;
        font-size: 12px;
        color: #114fff;
        font-weight: bold;
        width: calc(100% - 15% - 12px);
        text-align: right;
      }
    }
  }
</style>
