<template>
  <div class="blue_btn">
    <slot name="blue_btn">
      <button>글쓰기</button>
    </slot>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class BaseButton extends Vue {}
</script>
<style scoped lang="scss">
  button {
    background: #114fff;
    border: 2px solid #114fff;
    color: white;
    font-size: 14px;
    width: 100%;
    border-radius: 5px;
    height: 28px;
    line-height: 19px;
    padding: 4px 0;
    box-sizing: border-box;
    font-family: "NotoSansCJKkr-Medium";
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
