<template>
  <div class="search">
    <slot name="option">
      <!-- <select class="select" name="" id="">
        <option value="type_date">최신 등록순</option>
        <option value="type_name">이름순</option>
        <option value="type_rating">평점순</option>
      </select> -->
    </slot>
    <slot name="slot_input">
      <input type="text" class="search_contents" />
    </slot>
    <slot name="search_btn">
      <button class="search_btn"></button>
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
  .search {
    margin-top: 2%;
    position: relative;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .select {
      width: 28%;
      float: left;
      border: 1px solid #333333;
      padding: 0 1.755%;
      line-height: 2.3;
      font-size: 1.25rem;
      color: #333333;
      outline: none;

      background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 92%
        center / 7px 5px;
    }
    .search_contents {
      float: left;
      border: 1px solid #333333;
      color: black;
      font-size: 1.25rem;
      width: 70%;
      line-height: 2.3;
      padding: 0 1.755%;
      padding-right: 10%;
      box-sizing: border-box;
      margin-left: 2%;
      outline: none;
      // background: url("~@/assets/images/lec_list/search_btn.png") no-repeat 95%
      //   center / 12px 12px;
    }
    .search_btn {
      background: url("~@/assets/images/lec_list/search_btn.png") no-repeat 95%
        center / 12px 12px;
      width: 12px;
      height: 12px;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      margin: auto;
    }
  }
</style>
