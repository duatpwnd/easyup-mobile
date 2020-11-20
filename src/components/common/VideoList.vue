<template>
  <div class="video_list">
    <div class="btn" @click="toggle = !toggle">강의목록</div>
    <div
      class="list"
      v-show="toggle"
      v-for="(list, index) in list"
      :key="index"
    >
      <span class="left"
        ><img
          src="@/assets/images/my_lecture_course/play2.png"
          alt="플레이"
          title="플레이"
      /></span>
      <span
        class="center"
        slot="title"
        @click="
          $router.push({
            path: '/play',
            query: {
              lp_id: list.lp_id,
              course_id: list.id,
            },
          })
        "
        >{{ list.title }}</span
      >
      <!-- <span class="right">11:00</span> -->
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true,
      },
    },
    components: {},
    data() {
      return {
        toggle: false,
      };
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .video_list {
    width: 100%;
    &:not(:first-child) {
      margin-top: 4px;
    }
    span {
      display: inline-block;
      color: #666666;
      font-size: 14px;
      vertical-align: middle;
      padding: 1.296% 0;
      box-sizing: border-box;
    }
    .btn {
      width: 70px;
      border: 1px solid #114fff;
      color: #114fff;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      height: 24px;
      line-height: 23px;
      box-sizing: border-box;
    }
    .left {
      width: 5%;
    }
    .center {
      background: white;
      width: 91%;
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
    .list {
      margin-top: 6px;
    }
  }
</style>
