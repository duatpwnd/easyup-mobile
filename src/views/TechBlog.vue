<template>
  <div class="tech_blog">
    <h2>기술블로그</h2>
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
  .tech_blog {
    h2 {
      font-size: 2rem;
      padding: 4.445%;
      padding-bottom: 0;
    }
  }
</style>
