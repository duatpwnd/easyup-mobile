<template>
  <ul class="paging">
    <slot name="paging"></slot>
  </ul>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
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
