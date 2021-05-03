<template>
  <div v-if="view">
    <div class="head">
      <span class="title" v-html="'[' + view.course_name + ']'"></span>
      <span v-html="view.subject"></span>
    </div>
    <div class="contents">
      <div class="contents_head">
        <span class="writer">{{ view.writer }}</span>
        <span class="wdate">{{ view.date }}</span>
      </div>
      <div class="view" v-html="view.content.trim()"></div>
      <div class="file" v-if="view.attachment_list != null">
        <span class="attach" @click="download(view.attachment_list.filename)">{{
          view.attachment_list.filename
        }}</span>
      </div>
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
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  @Component({
    components: {
      BlueBtn,
    },
  })
  export default class Read extends Vue {
    private view = "";
    private download(filename: string): void {
      const data = {
        action: "download_notice_attach_file",
        id: this.$route.query.id,
        c_id: this.$route.query.c_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, data, {
          responseType: "blob",
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result: { [key: string]: any }) => {
          console.log(result);
          // 로컬서버에서는 작동하지 않음
          if (window.navigator.msSaveOrOpenBlob) {
            // IE 10+
            window.navigator.msSaveOrOpenBlob(result.data, filename);
          } else {
            // not IE
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(result.data);
            link.target = "_self";
            if (filename) link.download = filename;
            link.click();
            window.URL.revokeObjectURL(result.data);
          }
        });
    }
    private goToList(): void {
      this.$router.push({
        path: "/notice",
        query: {
          keyword: "",
          pageCurrent: 1,
          order: "all",
          view: this.$route.query.view,
        },
      });
    }
    private read(): void {
      const data: { action: string; id: number; course_id: number } = {
        action: "get_my_notice_info",
        id: this.$route.query.id,
        course_id: this.$route.query.c_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.view = result.data.data;
        });
    }
    created() {
      this.read();
    }
  }
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
    word-break: break-all;
    .contents_head {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .writer {
        font-size: 1.25rem;

        float: left;
      }
      .wdate {
        font-size: 1.25rem;

        float: right;
      }
    }
    .view {
      margin: 5px 0;
    }
  }
  .file {
    .attach {
      background: url("~@/assets/images/common/attach_file_ico.png") no-repeat
        left / 17px 16px;
      padding-left: 25px;
      display: inline-block;
      font-size: 14px;
      color: #999999;
    }
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
