<template>
  <div class="compile_wrap">
    <slot name="progress">
      <span class="rate">진도율</span>
      <span class="progress">
        <span class="percent">60%</span>
        <span class="progress_bar"></span>
      </span>
      <span>6일 남음</span>
      <!-- <span class="btn">편집</span> -->
      <span class="date">2020.06.20</span>
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
    .progress {
      box-sizing: border-box;
      height: 20px;
      position: relative;
      width: 26.4%;
      line-height: 20px;
      border: 1px solid #cacaca;
      border-radius: 5px;
      margin: 4px 10px;
      overflow: hidden;
      .percent {
        font-size: 9px;
        position: absolute;
        width: 100%;
        color: #757575;
        text-align: center;
      }
      .progress_bar {
        height: 20px;
        background: #ecedee;
        width: 60%;
        vertical-align: unset;
      }
    }
    .btn {
      width: 13.334%;
      border: 1px solid #114fff;
      color: #114fff;
      font-size: 10px;
      border-radius: 4px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      box-sizing: border-box;
    }
    .btn2 {
      margin-left: 2%;
    }
    .sum {
      font-size: 1.375rem;
      margin-left: 2%;
      display: inline-block;
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
</style>
