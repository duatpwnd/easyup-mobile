<template>
  <div class="manage">
    <h2>책갈피 관리</h2>
    <router-view></router-view>
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
  .manage {
    padding: 0 16px 65px;
    margin-top: 13px;
    h2 {
      font-size: 18px;
      padding-bottom: 13px;
    }
  }
</style>
