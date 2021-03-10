<template>
  <div id="notice">
    <div v-if="notice">
      <h2 class="title">공지사항</h2>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {
    components: {},
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
    methods: {},
  };
</script>
<style scoped lang="scss">
  #notice {
    padding: 0 16px 65px;
    margin-top: 13px;
    .title {
      font-size: 18px;
      padding-bottom: 13px;
    }
  }
</style>
