<template>
  <div id="notice">
    <h2 class="title">공지사항</h2>
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
    methods: {},
  };
</script>
<style scoped lang="scss">
  #notice {
    padding: 4.445%;
    .title {
      font-size: 2rem;
    }
  }
</style>
