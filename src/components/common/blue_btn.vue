<template>
  <div class="blue_btn">
    <slot name="blue_btn">
      <button>글쓰기</button>
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
  button {
    background: #114fff;
    border: 2px solid #114fff;
    color: white;
    font-size: 14px;
    width: 100%;
    border-radius: 5px;
    height: 28px;
    line-height: 20px;
    padding: 4px 0;
    box-sizing: border-box;
    font-family: "NotoSansCJKkr-Medium";
  }
</style>
