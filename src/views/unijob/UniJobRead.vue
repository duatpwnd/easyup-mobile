<template>
  <div class="read" v-if="Object.keys(view).length > 0">
    <ConfirmModal
      @ok="deleteMessage($route.name)"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <div class="head">
      <span>{{ view.title }}</span>
    </div>
    <div class="contents">
      <div class="contents_head">
        <span class="writer">{{ view.writer }}</span>
        <span class="wdate">{{ view.wdate }}</span>
      </div>
      <div class="view" v-html="view.content.trim()"></div>
      <div class="file" v-if="view.attach != false">
        <ul v-for="(list, index) in view.attach" :key="index">
          <li class="file_list" @click="download(list.oname)">
            <span class="attach">{{ list.oname }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="button_wrap">
      <BlueBtn class="left_btn" v-if="view.is_possible_reply">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/uniJob/register',
              query: {
                action: 'reply',
                type: $route.query.type,
                is_notice: view.is_notice,
                id: $route.query.id,
              },
            })
          "
        >
          답글
        </button>
      </BlueBtn>
      <BlueBtn class="left_btn" v-if="view.is_possible_modify">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/uniJob/register',
              query: {
                action: 'write',
                type: $route.query.type,
                is_notice: view.is_notice,
                id: $route.query.id,
              },
            })
          "
        >
          수정
        </button>
      </BlueBtn>

      <BlueBtn class="left_btn" v-if="view.is_possible_delete">
        <button slot="blue_btn" @click="deleteUnijob()">
          삭제
        </button>
      </BlueBtn>
      <BlueBtn
        class="left_btn"
        v-if="view.prev_item_id != null && view.is_possible_move == true"
      >
        <button slot="blue_btn" @click="read(view.prev_item_id)">
          이전글
        </button>
      </BlueBtn>
      <BlueBtn
        class="left_btn"
        v-if="view.next_item_id != null && view.is_possible_move == true"
      >
        <button slot="blue_btn" @click="read(view.next_item_id)">
          다음글
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import { mapState } from "vuex";
  import Mixin from "./unijob_mixin";
  import { Component } from "vue-property-decorator";
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
  export default class UnijobRead extends Mixin {
    // view: { [key: string]: any } = {};
    download(filename: string): void {
      const data = {
        action: "download_attach_file",
        type: this.$route.query.type,
        id: this.$route.query.id,
        filename: filename,
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
    confirm(): void {
      this.$confirmMessage("삭제하시겠습니까?");
    }
    deleteUnijob(): void {
      const data = {
        action: "delete_unijob",
        type: this.$route.query.type,
        id: this.$route.query.id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.$router.push({
            path: `/uniJob/${this.$route.query.type}`,
            query: {
              pageCurrent: 1,
              keyword: "",
            },
          });
        });
    }
    created() {
      this.read(this.$route.query.id);
    }
  }
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
      white-space: pre-wrap;
      font-family: "NotoSansCJKkr-Regular";
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
      .file_list {
        .attach {
          background: url("~@/assets/images/common/attach_file_ico.png")
            no-repeat left / 17px 16px;
          padding-left: 25px;
          display: inline-block;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .button_wrap {
      display: table;
      width: 100%;
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
        display: table-cell;
        width: 20%;
        &:not(:last-child) {
          padding-right: 2%;
        }
      }
      .right_btn {
        float: right;
        width: 23.172%;
      }
    }
  }
</style>
