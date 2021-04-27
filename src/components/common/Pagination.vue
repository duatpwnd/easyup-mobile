<template>
  <ul class="paging">
    <slot name="paging"></slot>
  </ul>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class Pagination extends Vue {}
</script>
<style scoped lang="scss">
  .paging {
    margin-top: 30px;
    &:after {
      display: block;
      clear: both;
      content: "";
    }
    li {
      border: 1px solid #dbdbdb;
      color: #363636;
      padding: 9px;
      border-radius: 4px;
    }
    .prev {
      float: left;
    }
    .next {
      float: right;
    }
  }
</style>
