<template>
  <div class="compile_wrap">
    <span class="btn">편집</span>
    <slot name="sum"> </slot>
    <span class="date">2020.06.20</span>
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
    position: relative;
    background: #f8f8f8;
    padding: 2% 4.445%;
    box-sizing: border-box;
    .btn {
      display: inline-block;
      width: 14.33%;
      border: 1px solid #114fff;
      color: #114fff;
      font-size: 1.25rem;
      border-radius: 4px;
      padding: 1% 0;
      text-align: center;
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
      font-size: 1.25rem;
      text-align: right;
      position: absolute;
      top: 0;
      right: 4.445%;
      bottom: 0;
      margin: auto;
      height: 50%;
    }
  }
</style>
