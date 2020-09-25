<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="강의명을 입력하세요"
        />
      </Search>
    </div>
    <div class="section">
      <LectureCourseList></LectureCourseList>
    </div>
    <div class="section2">
      <Compile> </Compile>
    </div>
    <div class="section section3">
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
    </div>
  </div>
</template>
<script>
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import Compile from "@/components/common/Compile.vue";
  import Search from "@/components/common/Search.vue";
  export default {
    components: {
      Search,
      Compile,
      LectureCourseList,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .section,
  .search_area {
    padding: 4.445%;
    padding-bottom: 0;
  }
  .section2 {
    padding-top: 0;
    padding-bottom: 0;
    margin: 2% 0;
  }
  .section3 {
    padding-top: 0;
    padding-bottom: 20%;
    .list_wrap {
      margin-top: 10px;
    }
  }
</style>
