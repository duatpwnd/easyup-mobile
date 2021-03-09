<template>
  <div class="read" v-if="info">
    <div class="head">
      <span v-html="info.info.title"></span>
    </div>
    <div class="contents" v-html="info.info.contents"></div>
    <div class="button_wrap">
      <BlueBtn class="btn" v-if="info.prev">
        <button slot="blue_btn" @click="noticeView(info.prev)">
          이전글
        </button>
      </BlueBtn>

      <BlueBtn class="btn last_btn" v-if="info.next != null">
        <button slot="blue_btn" @click="noticeView(info.next)">
          다음글
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
export default {
  components: {
    BlueBtn
  },
  data() {
    return {
      info: ""
    };
  },
  methods: {
    noticeView(id) {
      console.log(id);
      const data = {
        action: "get_cs_view",
        id: id //게시물ID
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {})
        .then(result => {
          console.log(result.data.data);
          this.info = result.data.data;
          this.$router
            .push({
              query: {
                id: id
              }
            })
            .catch(() => {});
        });
    }
  },
  created() {
    this.noticeView(this.$route.query.id);
  }
};
</script>
<style scoped lang="scss">
.read {
  padding: 4.445%;
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
    white-space: pre-wrap;
    font-size: 1.25rem;
    color: #666666;
    font-family: "NotoSansCJKkr-Regular";
    word-break: break-all;
  }
  .button_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
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
    .last_btn {
      float: right;
    }
  }
}
</style>
