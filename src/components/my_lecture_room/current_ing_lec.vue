<template>
  <section>
    <slot name="title1"><h2>현재 진행중인 강의</h2></slot>
    <div class="table">
      <span class="td td1"
        >비전공자는 어떻게 개발자가 되는가비전공자는 어떻게 개발자가
        되는가</span
      >
      <slot name="right">
        <span class="td td2">12명</span>
      </slot>
    </div>
    <div class="table">
      <span class="td td1"
        >비전공자는 어떻게 개발자가 되는가ㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ</span
      >
      <slot name="right">
        <span class="td td2">12명</span>
      </slot>
    </div>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <slot name="right">
        <span class="td td2">12명</span>
      </slot>
    </div>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <span class="td td2">12명</span>
    </div>
  </section>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class CurrentLecture extends Vue {}
</script>
<style scoped lang="scss">
  section {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    .table {
      width: 100%;
      margin-top: 1%;
      .td {
        display: inline-block;
        font-size: 1.5rem;
        color: #666666;
        vertical-align: middle;
      }
      .td1 {
        width: 63%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .td2 {
        font-weight: bold;
        width: 35%;
        text-align: right;
        color: #333333;
      }
      .date {
        color: black;
        font-weight: bold;
      }
    }
  }
</style>
