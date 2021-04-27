<template>
  <div class="tech_blog">
    <h2>이지채널</h2>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component({})
  export default class TechBlog extends Vue {}
</script>
<style scoped lang="scss">
  .tech_blog {
    padding: 0 16px 10px;
    margin-top: 13px;
    h2 {
      font-size: 18px;
      padding-bottom: 13px;
    }
  }
</style>
