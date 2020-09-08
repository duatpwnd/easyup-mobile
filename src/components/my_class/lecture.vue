<template>
  <div>
    <div class="search">
      <select class="select" name="" id="">
        <option value="">전체</option>
      </select>
      <input
        type="text"
        placeholder="강의명을 검색하세요."
        class="search_contents"
      />
    </div>
    <LectureList></LectureList>
  </div>
</template>
<script>
  import LectureList from "@/components/common/lecture_list.vue";
  export default {
    components: {
      LectureList,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
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
      background: url("~@/assets/images/lec_list/search_btn.png") no-repeat 95%
        center / 24px 24px;
    }
  }
</style>
