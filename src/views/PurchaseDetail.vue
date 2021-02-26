<template>
  <div class="purchase_warp">
    <h2 class="title">구매 내역</h2>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  export default class Purcahse extends Vue {
    keyword = "";
    order = "";
  }
</script>
<style scoped lang="scss">
  .purchase_warp {
    margin-top: 13px;
    padding-bottom: 65px;
    .title {
      font-size: 18px;
      padding: 0 16px 13px 16px;
    }
  }
</style>
