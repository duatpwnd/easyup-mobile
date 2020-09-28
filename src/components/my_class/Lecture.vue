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
      <div class="compile_wrap">
        <span class="rate">진도율</span>
        <span class="progress">
          <span class="percent">60%</span>
          <span class="progress_bar"></span>
        </span>
        <span>6일 남음</span>
        <!-- <span class="btn">편집</span> -->
        <span class="date">2020.06.20</span>
      </div>
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
  import Search from "@/components/common/Search.vue";
  export default {
    components: {
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
  .section,
  .search_area {
    padding: 4.445%;
    padding-bottom: 0;
  }
  .section2 {
    padding-top: 0;
    padding-bottom: 0;
    margin: 2% 0;
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
      .progress {
        box-sizing: border-box;
        height: 20px;
        position: relative;
        width: 26.4%;
        line-height: 20px;
        border: 1px solid #cacaca;
        border-radius: 5px;
        margin: 4px 10px;
        overflow: hidden;
        .percent {
          font-size: 9px;
          position: absolute;
          width: 100%;
          color: #757575;
          text-align: center;
        }
        .progress_bar {
          height: 20px;
          background: #ecedee;
          width: 60%;
          vertical-align: unset;
        }
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
  .section3 {
    padding-top: 0;
    padding-bottom: 20%;
    .list_wrap {
      margin-top: 10px;
    }
  }
</style>
