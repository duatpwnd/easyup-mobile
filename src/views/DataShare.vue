<template>
  <div>
    <div class="notice_board">
      <h2>자료 공유 게시판</h2>
      <Notice></Notice>
    </div>
    <router-view />
  </div>
</template>
<script>
  import Notice from "@/components/common/notice.vue";

  export default {
    components: { Notice },
    data() {
      return {};
    },
  };
</script>
<style scoped lang="scss">
  .notice_board {
    padding: 4.445%;
    padding-bottom: 2%;
    h2 {
      font-size: 2rem;
    }
  }
</style>
