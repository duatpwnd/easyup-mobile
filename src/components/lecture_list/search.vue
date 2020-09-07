<template>
  <div id="list_header">
    <div class="lecture_sign">
      <span>강의 > 전체</span>
    </div>
    <div class="search">
      <select class="select" name="" id="">
        <option value="">최신 등록순</option>
      </select>
      <input
        type="text"
        placeholder="강의명을 검색하세요."
        class="search_contents"
      />
    </div>
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
  #list_header {
    .lecture_sign {
      background: #f8f8f8;
      padding: 0.834% 2.778%;
      font-size: 1.25rem;
      color: #999999;
    }
    .search {
      margin-top: 2%;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .select {
        width: 26%;
        float: left;
        border: 1px solid #333333;
        height: 48px;
        padding-left: 2%;
        line-height: 48px;
        font-size: 1.25rem;
        color: #333333;
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 90%
          center;
      }
      .search_contents {
        float: left;
        border: 1px solid #333333;
        color: #b5b5b5;
        font-size: 1.25rem;
        padding: 2%;
        padding-right: 10%;
        width: 72%;
        height: 48px;
        box-sizing: border-box;
        margin-left: 2%;
        background: url("~@/assets/images/lec_list/search_btn.png") no-repeat
          95% center / 24px 24px;
      }
    }
  }
</style>
