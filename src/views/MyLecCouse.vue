<template>
  <div class="my_lec_course">
    <router-link
      class="tab"
      :to="{
        path: '/myClass/lecture',
        query: {
          keyword: '',
          pageCurrent: 1,
          order: '',
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>강의
    </router-link>
    <router-link
      class="tab"
      :to="{
        path: '/myClass/course',
        query: {
          keyword: '',
          pageCurrent: 1,
          order: '',
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>코스</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class MyLectureCourse extends Vue {}
</script>
<style scoped lang="scss">
  .my_lec_course {
    padding-bottom: 65px;
    .tab {
      font-size: 18px;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
      position: relative;
      .active_bar {
        background: #f8f8f8;
        height: 4px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
      }
    }
    .router-link-active {
      color: black;
      background: #ffffff;
      .active_bar {
        background: #114fff;
      }
    }
  }
</style>
