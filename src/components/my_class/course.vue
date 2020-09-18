<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="코스명을 입력하세요"
        />
      </Search>
    </div>
    <div class="section">
      <LectureCourseList></LectureCourseList>
    </div>
    <div class="section2">
      <Compile>
        <template slot="progress">
          <span class="btn" slot="progress">상세</span>
          <span class="date">2020.06.20</span>
        </template>
      </Compile>
      <div class="video_wrap">
        <VideoList></VideoList>
        <VideoList></VideoList>
        <VideoList></VideoList>
        <VideoList></VideoList>
      </div>
    </div>
  </div>
</template>
<script>
  import Search from "@/components/common/search.vue";
  import Compile from "@/components/common/compile.vue";
  import LectureCourseList from "@/components/common/lecture_course_list.vue";
  import VideoList from "@/components/my_class/video_list.vue";
  export default {
    components: {
      VideoList,
      Compile,
      Search,
      LectureCourseList,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .search_area,
  .section {
    padding: 4.445%;
    padding-bottom: 0;
  }
  .section2 {
    margin-top: 2%;
    padding: 4px 0 16px 0;
    background: #f8f8f8;
    .video_wrap {
      margin-top: 10px;
    }
  }
</style>
