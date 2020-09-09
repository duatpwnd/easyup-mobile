<template>
  <div id="teskboard">
    <h2 class="title">과제 게시판</h2>
    <Notice></Notice>
    <router-view />
  </div>
</template>
<script>
  import Notice from "@/components/common/notice.vue";
  export default {
    components: {
      Notice,
    },
    data() {
      return {};
    },
  };
</script>
<style scoped lang="scss">
  #teskboard {
    padding: 4.445%;
    .title {
      font-size: 2rem;
    }
  }
</style>
