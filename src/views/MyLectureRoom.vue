<template>
  <div id="my_lecture">
    <UserInfo></UserInfo>
    <CurrentIngLec></CurrentIngLec>
    <CurrentIngCourse></CurrentIngCourse>
    <Board></Board>
    <Notice></Notice>
    <TimeLine></TimeLine>
    <MyLecMenu></MyLecMenu>
  </div>
</template>
<script>
  import UserInfo from "@/components/my_lecture_room/user_info.vue";
  import CurrentIngLec from "@/components/my_lecture_room/current_ing_lec.vue";
  import CurrentIngCourse from "@/components/my_lecture_room/current_ing_course.vue";
  import Board from "@/components/my_lecture_room/board.vue";
  import Notice from "@/components/my_lecture_room/notice.vue";
  import TimeLine from "@/components/my_lecture_room/timeline.vue";
  import MyLecMenu from "@/components/common/mylec_menu.vue";
  export default {
    components: {
      MyLecMenu,
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
    methods: {},
  };
</script>
<style scoped lang="scss"></style>
