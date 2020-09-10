<template>
  <div id="my_lecture">
    <UserInfo>
      <h3 slot="info1">구독중인 강의</h3>
      <h3 slot="info2">구독중인 코스</h3>
      <h3 slot="info3">종료된 강의</h3>
      <h3 slot="info4">종료된 코스</h3>
      <span slot="convert" @click="convert()">
        <span class="convert">강사전환</span>
      </span>
    </UserInfo>
    <CurrentIngLec>
      <h2 slot="title1">현재 구독중인 강의</h2>
      <span class="tr" slot="right">
        <span class="td date">무제한</span>
        <span class="td progress"
          ><span class="progress_bar"
            ><span class="percent">60%</span></span
          ></span
        >
      </span>
    </CurrentIngLec>
    <CurrentIngCourse></CurrentIngCourse>
    <Board></Board>
    <Notice></Notice>
    <TimeLine></TimeLine>
  </div>
</template>
<script>
  import UserInfo from "@/components/my_lecture_room/user_info.vue";
  import CurrentIngLec from "@/components/my_lecture_room/current_ing_lec.vue";
  import CurrentIngCourse from "@/components/my_lecture_room/current_ing_course.vue";
  import Board from "@/components/my_lecture_room/board.vue";
  import Notice from "@/components/my_lecture_room/notice.vue";
  import TimeLine from "@/components/my_lecture_room/timeline.vue";
  export default {
    components: {
      UserInfo,
      CurrentIngLec,
      CurrentIngCourse,
      Board,
      Notice,
      TimeLine,
    },
    data() {
      return {};
    },
    methods: {
      convert() {
        this.$router.push("/teacherClassRoom");
      },
    },
  };
</script>
<style scoped lang="scss">
  .tr {
    width: 37%;
    text-align: right;
    vertical-align: middle;
    display: inline-block;
    .progress {
      width: 57%;
      margin-left: 5%;
      background: white;
      border-radius: 4px;
      text-align: left;
      border: 1px solid #cacaca;
      .progress_bar {
        display: inline-block;
        border-radius: 4px;
        background: #ecedee;
        width: 65%;
        .percent {
          width: 100%;
          display: block;
        }
      }
    }
  }
</style>
