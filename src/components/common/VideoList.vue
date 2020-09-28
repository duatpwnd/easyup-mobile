<template>
  <div class="video_list">
    <span class="left"
      ><img
        src="@/assets/images/my_lecture_course/play2.png"
        alt="플레이"
        title="플레이"
    /></span>
    <span class="center">1.파이썬 코딩 기본편 -6시간 뒤면 여러분도 개발</span>
    <span class="right">11:00</span>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .video_list {
    width: 100%;
    padding: 0.5% 4.445%;
    box-sizing: border-box;
    span {
      display: inline-block;
      color: #666666;
      font-size: 1.3125rem;
      vertical-align: middle;
      padding: 1.296% 0;
      box-sizing: border-box;
    }
    .left {
      width: 5%;
    }
    .center {
      background: white;
      width: 75%;
      margin: 0 2%;
      padding: 1.296% 4%;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .right {
      width: 16%;
      background: white;
      padding: 1.296% 4%;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
</style>
