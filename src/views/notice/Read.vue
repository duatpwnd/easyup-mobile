<template>
  <div>
    <div class="head">
      <span class="title">[{{ view.course_name }}]</span>
      <span>{{ view.subject }}</span>
    </div>
    <div class="contents">
      <span>작성자 : {{ view.writer }}</span>
      <div v-html="view.content"></div>
    </div>
    <div class="button_wrap">
      <BlueBtn class="btn">
        <button slot="blue_btn" @click="goToList()">
          목록
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {
        view: "",
      };
    },
    methods: {
      goToList() {
        this.$router.push({
          path: "/notice",
          query: {
            keyword: "",
            pageCurrent: 1,
            order: "all",
          },
        });
      },
      read() {
        const data = {
          action: "get_my_notice_info",
          id: this.$route.query.id,
          course_id: this.$route.query.c_id,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            this.view = result.data.data;
          });
      },
    },
    created() {
      this.read();
    },
  };
</script>
<style scoped lang="scss">
  .head {
    margin-top: 5%;
    span {
      font-size: 1.375rem;
    }
    .title {
      color: #114fff;
      margin-right: 2%;
      font-weight: 600;
    }
  }
  .contents {
    border-top: 2px solid #333333;
    border-bottom: 2px solid #333333;
    padding: 2% 0;
    margin: 2% 0;
    font-family: "NotoSansCJKkr-Regular";
    font-size: 1.25rem;
    color: #666666;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .button_wrap {
    .btn {
      width: 23.172%;
      button {
        border: 1px solid #114fff;
        background: white;
        color: #114fff;
        height: 24px;
        line-height: 16px;
        font-size: 12px;
      }
    }
  }
</style>
