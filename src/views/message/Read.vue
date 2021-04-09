<template>
  <div class="read" v-if="view">
    <ConfirmModal
      @ok="deleteMessage($route.name)"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <h2>메시지</h2>
    <div class="head">
      <span v-html="view.title"></span>
    </div>
    <div class="contents">
      <span v-html="view.send_name" class="send"></span>
      <span v-html="view.receive_name" class="receive"></span>
      <div class="view" v-html="view.content.trim()"></div>
      <div class="file" v-if="view.attachments.length > 0">
        <ul v-for="(list, index) in view.attachments" :key="index">
          <li class="file_list" @click="download(list.filename, list.id)">
            <span class="attach"
              ><span>{{ list.filename }}</span
              ><span v-if="list.size >= 1073741824"
                >({{ (list.size / 1073741824).toFixed(2) }}GB)</span
              ><span v-else-if="list.size >= 1048576"
                >({{ (list.size / 1048576).toFixed(2) }}MB)</span
              ><span v-else-if="list.size >= 1024"
                >({{ (list.size / 1024).toFixed(2) }}KB)</span
              ><span v-else>({{ list.size }}B)</span></span
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="button_wrap">
      <BlueBtn class="left_btn" v-if="$route.query.type == 'sent'">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/msg/sentList',
              query: {
                pageCurrent: 1,
                keyword: '',
                view: $route.query.view,
              },
            })
          "
        >
          발신함으로 돌아가기
        </button>
      </BlueBtn>
      <BlueBtn class="left_btn" v-else>
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/msg/newMessage',
              query: {
                id: view.id,
              },
            })
          "
        >
          답장
        </button>
      </BlueBtn>
      <BlueBtn class="right_btn">
        <button slot="blue_btn" @click="confirm()">
          삭제
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script lang="ts">
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { Component, Vue } from "vue-property-decorator";
  import { mapState } from "vuex";
  import { ResultData } from "@/assets/js/util";
  @Component({
    components: {
      BlueBtn,
      ConfirmModal,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
  })
  export default class MsgRead extends Vue {
    view = "";
    download(filename: string, file_id: number): void {
      const data = {
        action: "download_message_attach",
        type: this.$route.query.type,
        file_id: file_id,
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
        .then((result: ResultData) => {
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
    confirm(): void {
      this.$confirmMessage("삭제하시겠습니까?");
    }
    deleteMessage(type: string): void {
      const data = {
        action: "delete_message",
        type: this.$route.query.type,
        id: [this.$route.query.id],
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          this.$router.push({
            path:
              this.$route.query.type == "received"
                ? "/msg/receivedList"
                : "/msg/sentList",
            query: {
              pageCurrent: 1,
              keyword: "",
              view: this.$route.query.view,
            },
          });
        });
    }
    read(): void {
      const data = {
        action: "get_message_info",
        id: this.$route.query.id,
        type: this.$route.query.type,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          console.log(result);
          this.view = result.data.data.info;
        });
    }
    created() {
      this.read();
    }
  }
</script>
<style scoped lang="scss">
  .read {
    padding: 4.445%;
    padding-bottom: 96px;
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
      white-space: pre-wrap;
      padding: 2% 0;
      margin: 2% 0;
      font-size: 1.25rem;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
      word-break: break-all;
      .view {
        margin: 5px 0;
      }
      .send,
      .receive {
        font-size: 14px;
      }
      .send {
        &:after {
          content: "to";
          font-size: 14px;
          margin: 0 4px;
        }
      }
      .file {
        .file_list {
          .attach {
            background: url("~@/assets/images/common/attach_file_ico.png")
              no-repeat left / 19px 18px;
            padding-left: 30px;
            display: inline-block;
            font-size: 14px;
          }
        }
      }
    }
    .button_wrap {
      button {
        border: 1px solid #114fff;
        background: white;
        color: #114fff;
        height: 24px;
        line-height: 16px;
        font-size: 12px;
      }
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .left_btn {
        float: left;
        width: 30%;
      }
      .right_btn {
        float: right;
        width: 30%;
      }
    }
  }
</style>
