<template>
  <div class="manage">
    <h2>책갈피 관리</h2>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
    padding: 4.445%;
    padding-bottom: 0;
    h2 {
      font-size: 2rem;
    }
  }
</style>
