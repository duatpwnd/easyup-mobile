<template>
  <div class="my_lec_course">
    <span
      class="tab"
      v-for="(tab, index) in types"
      :class="{ active: index == isActive }"
      :key="index"
      @click="toggle(tab.target, index)"
      ><span class="active_bar"></span>{{ tab.name }}</span
    >
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
    <MyLecMenu></MyLecMenu>
  </div>
</template>
<script>
  import MyLecMenu from "@/components/common/mylec_menu.vue";
  import Lecture from "@/components/my_class/lecture.vue";
  import Course from "@/components/my_class/course.vue";
  export default {
    components: { MyLecMenu, Lecture, Course },
    data() {
      return {
        isActive: 0,
        type: "Lecture",
        types: [
          { name: "강의", target: "Lecture" },
          { name: "코스", target: "Course" },
        ],
      };
    },
    methods: {
      toggle(type, index) {
        this.type = type;
        this.isActive = index;
      },
    },
  };
</script>
<style scoped lang="scss">
  .my_lec_course {
    .tab {
      font-size: 2rem;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
    }
    .active {
      background: #ffffff;
      .active_bar {
        display: block;
        background: #114fff;
        padding: 1.5%;
      }
    }
  }
</style>
