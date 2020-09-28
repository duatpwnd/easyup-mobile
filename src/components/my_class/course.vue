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
      <div class="compile_wrap">
        <span class="btn" slot="progress">상세</span>
        <span class="date">2020.06.20</span>
      </div>

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
  import Search from "@/components/common/Search.vue";
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import VideoList from "@/components/common/VideoList.vue";
  export default {
    components: {
      VideoList,
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
    .compile_wrap {
      padding: 0 4.445%;
      position: relative;
      background: #f8f8f8;
      box-sizing: border-box;
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 10px;
      }
      .btn {
        width: 13.334%;
        border: 1px solid #114fff;
        color: #114fff;
        font-size: 10px;
        border-radius: 4px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        box-sizing: border-box;
      }

      .date {
        color: #999999;
        font-size: 10px;
        position: absolute;
        top: 0;
        right: 4.445%;
        color: #999999;
        font-size: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 4.445%;
        height: 15px;
        margin: auto;
      }
    }
  }
</style>
