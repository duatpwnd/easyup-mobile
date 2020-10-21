<template>
  <div class="read">
    <h2>메시지</h2>
    <div class="head">
      <span>{{ view.title }}</span>
    </div>
    <div class="contents">
      {{ view.send_name }} to {{ view.receive_name }}
      <div v-html="view.content"></div>
    </div>
    <!-- <div class="button_wrap">
      <BlueBtn class="left_btn">
        <button slot="blue_btn">
          답장
        </button> </BlueBtn
      ><BlueBtn class="right_btn">
        <button slot="blue_btn">
          삭제
        </button>
      </BlueBtn>
    </div> -->
  </div>
</template>
<script>
  // import BlueBtn from "@/components/common/BaseButton.vue";
  export default {
    components: {
      // BlueBtn,
    },
    data() {
      return {
        view: "",
      };
    },
    methods: {
      read() {
        const data = {
          action: "get_message_info",
          id: this.$route.query.id,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            this.view = result.data.data.info;
          });
      },
    },
    created() {
      this.read();
    },
  };
</script>
<style scoped lang="scss">
  .read {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    .head {
      margin-top: 5%;
      span {
        font-size: 1.375rem;
      }
    }
    .contents {
      border-top: 2px solid #333333;
      border-bottom: 2px solid #333333;
      padding: 2% 0;
      margin: 2% 0;
      font-size: 1.25rem;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
    }
    // .button_wrap {
    //   button {
    //     border: 1px solid #114fff;
    //     background: white;
    //     color: #114fff;
    //     height: 24px;
    //     line-height: 16px;
    //     font-size: 12px;
    //   }
    //   &:after {
    //     display: block;
    //     content: "";
    //     clear: both;
    //   }
    //   .left_btn {
    //     float: left;
    //     width: 23.172%;
    //   }
    //   .right_btn {
    //     float: right;
    //     width: 23.172%;
    //   }
    // }
  }
</style>
