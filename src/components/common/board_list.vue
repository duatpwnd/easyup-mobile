<template>
  <div class="board_list">
    <span class="top1">파이썬 완벽 뽀개기</span>
    <span class="top2">오늘 강의 과제입니다. 참고해 주세요.</span>
    <slot name="bottom">
      <span class="bottom1">보낸날짜 : 2020.06.12</span>
      <span class="bottom2">기한 : 2020.06.12</span>
      <span class="bottom3">제출된 수 : 12/21</span>
    </slot>
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
  .board_list {
    span {
      display: inline-table;
      color: #333333;
      font-size: 1.25rem;
      padding: 1%;
      box-sizing: border-box;
    }
    .top1 {
      width: 33.333%;
    }
    .top2 {
      width: 66.667%;
    }
    .bottom1,
    .bottom2,
    .bottom3 {
      width: 33.333%;
    }
  }
</style>
