<template>
  <div class="file_wrap">
    <h2>자료 공유 게시판</h2>
    <router-link
      class="tab"
      :to="{
        path: '/dataShare/sent',
        query: {
          keyword: '',
          pageCurrent: 1,
          order: 'all',
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>공유한 파일
    </router-link>

    <router-link
      class="tab"
      :to="{
        path: '/dataShare/received',
        query: {
          keyword: '',
          pageCurrent: 1,
          order: 'all',
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>공유받은 파일</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  export default class DataShare extends Vue {}
</script>
<style scoped lang="scss">
  .file_wrap {
    margin-top: 2%;
    padding-bottom: 65px;
    h2 {
      font-size: 18px;
      padding: 0 4.445%;
      margin-bottom: 13px;
    }
    .tab {
      font-size: 18px;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
      position: relative;
      color: #999999;
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
