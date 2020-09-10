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
    color: white;
    font-size: 1.75rem;
    width: 100%;
    border-radius: 5px;
    padding: 1.5% 0;
    font-family: "NotoSansCJKkr-Medium";
  }
</style>
