<template>
  <div id="teskboard">
    <div v-if="notice">
      <h2 class="title">과제 게시판</h2>
      <Notice></Notice>
    </div>
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
      return {
        notice: true,
      };
    },
    watch: {
      $route(to, from) {
        if (this.$route.meta.notice == false) {
          this.notice = false;
        } else {
          this.notice = true;
        }
      },
    },
    created() {
      if (this.$route.meta.notice == false) {
        this.notice = false;
      } else {
        this.notice = true;
      }
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
