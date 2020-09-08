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
    <div class="section section2">
      <Compile>
        <span class="btn btn2" slot="sum">통계</span>
      </Compile>
    </div>
    <div class="section">
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
      <LectureCourseList></LectureCourseList>
    </div>
  </div>
</template>
<script>
  import LectureCourseList from "@/components/common/lecture_course_list.vue";
  import Compile from "@/components/common/compile.vue";
  import Search from "@/components/common/search.vue";
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
  }
  .search_area {
    padding-bottom: 0;
  }
  .section2 {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
