<template>
  <div class="title_wrap">
    <slot name="header">
      <span>강의명</span>
      <span>제목</span>
    </slot>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class BoardTitle extends Vue {}
</script>
<style scoped lang="scss">
  .title_wrap {
    position: relative;
    border-top: 2px solid black;
    margin-top: 3%;
    background: #f8f8f8;
    padding: 5px;
    text-align: center;
    span {
      display: inline-table;
      width: 50%;
      text-align: center;
      color: #333333;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
</style>
