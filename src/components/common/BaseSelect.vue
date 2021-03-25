<template>
  <div class="select">
    <slot name="option">
      <select name="" id="">
        <option value="type_date">최신 등록순</option>
        <option value="type_name">이름순</option>
        <option value="type_rating">평점순</option>
      </select>
    </slot>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class BaseSelect extends Vue {}
</script>
<style scoped lang="scss">
  .select {
    width: 26%;
    float: left;

    select {
      border: 1px solid #333333;
      padding: 0 1.755%;
      line-height: 2.3;
      font-size: 1.25rem;
      color: #333333;
      background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
        center / 7px 5px;
    }
  }
</style>
