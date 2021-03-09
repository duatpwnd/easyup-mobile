<template>
  <div class="video_list">
    <span
      class="ing_ico reject_ico"
      @click="
        reason_toggle = !reason_toggle;
        toggle = false;
      "
      v-if="list.approve_status == 'reject'"
      >반려</span
    >
    <slot name="btn_list"></slot>
    <span
      class="ing_ico toggle_btn"
      @click="
        toggle = !toggle;
        reason_toggle = false;
      "
      >강의목록</span
    >
    <div
      class="list"
      v-show="toggle"
      v-for="(list, index) in list.courses"
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
      <span class="right">{{ list.limit_short }}</span>
    </div>
    <div
      class="reason"
      v-if="list.approve_status == 'reject' && reason_toggle"
      v-html="list.reject_reason"
    ></div>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Object,
        required: true,
      },
    },
    components: {},
    data() {
      return {
        reason_toggle: false,
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
      vertical-align: middle;
      font-size: 14px;
    }
    .ing_ico {
      width: 20%;
      margin-right: 10px;
      background: #114fff;
      line-height: 25px;
      color: white;
      border-radius: 4px;
      text-align: center;
      height: 24px;
      font-family: unset;
      box-sizing: border-box;
    }
    .review {
      border: 1px solid #114fff;
      background: white;
      color: #114fff;
      line-height: 24px;
    }
    .not_approved_ico {
      background: #ff114a;
    }
    .non_ing_ico {
      background: #dbdbdb;
      color: #999999;
    }
    .non_ing_ico {
      background: #dbdbdb;
      color: #999999;
    }
    .reject_ico {
      background: black;
      color: white;
    }
    .toggle_btn {
      width: 22%;
      border: 1px solid #114fff;
      background: white;
      color: #114fff;
      line-height: 24px;
    }
    .reason {
      font-family: "NotoSansCJKkr-Regular";
      font-size: 14px;
      word-wrap: break-word;
    }
    .list {
      margin-top: 6px;
      span {
        display: inline-block;
        color: #666666;
        font-size: 14px;
        vertical-align: middle;
        padding: 1.296% 0;
        box-sizing: border-box;
      }
      .left {
        width: 5%;
      }
      .center {
        background: white;
        width: 68%;
        margin: 0 2%;
        padding: 1.296% 4%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .right {
        width: 23%;
        background: white;
        padding: 1.296% 4%;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        text-align: center;
      }
    }
  }
</style>
