<template>
  <div class="user_intro">
    <span class="total_lec"
      >총<span class="color"> {{ detail.total_lecture }}</span
      >강</span
    >
  </div>
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
.user_intro {
  .total_lec {
    font-size: 14px;
  }
}
.name {
  font-size: 14px;
}
</style>
