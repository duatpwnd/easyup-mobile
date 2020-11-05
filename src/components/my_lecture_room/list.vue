<template>
  <div class="tr">
    <slot name="td1">
      <span class="td td1">비전공자는 어떻게 개발자가 되</span>
    </slot>
    <slot name="right">
      <span class="td td2">12명</span>
    </slot>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .tr {
    width: 100%;
    margin-top: 1%;
    .td {
      display: inline-block;
      font-size: 14px;
      color: #666666;
      vertical-align: middle;
    }
    .td1 {
      width: 63%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .td2 {
      font-weight: bold;
      width: 37%;
      text-align: right;
      color: #333333;
    }

    .date {
      color: black;
      font-weight: bold;
    }
  }
</style>
