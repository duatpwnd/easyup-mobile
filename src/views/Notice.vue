<template>
  <div id="notice">
    <h2 class="title">공지사항</h2>
    <router-view />
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from "vue-property-decorator";
  @Component
  export default class Notice extends Vue {
    notice = true;
    @Watch("$route")
    onPropertyChanged() {
      if (this.$route.meta.notice == false) {
        this.notice = false;
      } else {
        this.notice = true;
      }
    }
    created() {
      if (this.$route.meta.notice == false) {
        this.notice = false;
      } else {
        this.notice = true;
      }
    }
  }
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
