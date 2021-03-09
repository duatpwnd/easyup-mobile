<template>
  <div class="list_wrap">
    <slot name="checkbox"></slot>
    <div class="tr top_tr">
      <slot name="top">
        <span class="td left_td">파이썬 완벽 뽀개기</span>
        <span class="td right_td">오늘 강의 과제입니다. 참고해 주세요.</span>
      </slot>
    </div>
    <div class="tr bottom_tr">
      <slot name="bottom">
        <span class="td left_td">보낸날짜 : 2020.06.12</span>
        <span class="td center_td">기한 : 2020.06.12</span>
        <span class="td right_td">제출된 수 : 12/21</span>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.list_wrap {
  position: relative;
  .tr {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .td {
      float: left;
      color: #333333;
      font-size: 1.25rem;
      padding: 5px;
      box-sizing: border-box;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .top_tr {
    .left_td {
      width: 30%;
    }

    .right_td {
      width: 70%;
    }
  }
  .bottom_tr {
    .td {
      color: #999999;
      font-size: 1.125rem;
    }
    .left_td {
      width: 33.33%;
    }
    .center_td {
      width: 33.33%;
    }
    .right_td {
      width: 33.33%;
    }
  }
}
</style>
