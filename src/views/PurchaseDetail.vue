<template>
  <div class="purchase_warp">
    <h2 class="title">구매 내역</h2>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keyword: "",
        order: "",
      };
    },
    watch: {
      $route(to, from) {},
    },
    methods: {},
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .purchase_warp {
    padding: 4.445%;

    .title {
      font-size: 2rem;
    }
  }
</style>
