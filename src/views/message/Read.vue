<template>
  <div class="read">
    <ConfirmModal
      @ok="deleteMessage($route.name)"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <h2>메시지</h2>
    <div class="head">
      <span>{{ view.title }}</span>
    </div>
    <div class="contents">
      {{ view.send_name }} to {{ view.receive_name }}
      <div v-html="view.content"></div>
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
<script>
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import { mapState, mapMutations } from "vuex";

  import BlueBtn from "@/components/common/BaseButton.vue";
  export default {
    components: {
      BlueBtn,
      ConfirmModal,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
    data() {
      return {
        view: "",
      };
    },
    methods: {
      confirm() {
        this.$confirmMessage("삭제하시겠습니까?");
      },
      deleteMessage(type) {
        const data = {
          action: "delete_message",
          type: this.$route.query.type,
          id: [this.$route.query.id],
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            this.$router.push({
              path: "/msg/receivedList",
              query: {
                pageCurrent: 1,
                keyword: "",
              },
            });
          });
      },
      read() {
        const data = {
          action: "get_message_info",
          id: this.$route.query.id,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
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
