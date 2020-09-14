<template>
  <div>
    <slot name="contents">
      <img
        src="@/assets/images/player/expand_ico.png"
        class="toggle"
        alt="펼치기"
        title="펼치기"
      />
      <span>1강. 1강에 대해 알아보자.</span>
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
  img {
    width: 3.659%; /* 24px/720px */
  }
  span {
    font-size: 1.5rem;
    vertical-align: middle;
    margin-left: 3%;
  }
</style>
