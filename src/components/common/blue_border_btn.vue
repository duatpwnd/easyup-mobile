<template>
  <div>
    <slot name="blue_border_btn">
      <button></button>
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
    color: #114fff;
    border: 1px solid #114fff;
    border-radius: 5px;
    font-size: 1.5rem;
    font-family: "NotoSansCJKkr-Regular";
    padding: 0.763% 5.946%;
    width: 100%;
    box-sizing: border-box;
  }
</style>
