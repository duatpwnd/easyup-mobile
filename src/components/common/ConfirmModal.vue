<template>
  <div class="mask">
    <div class="notice_modal">
      <p class="contents" v-html="toggleStore_noticeMessage"></p>
      <div class="btn_wrap" v-if="toggleStore_confirm_modal">
        <BlueBtn>
          <slot name="btn1">
            <button class="confirm_ok" slot="blue_btn" @click="confirmOk()">
              확인
            </button>
          </slot>
        </BlueBtn>
        <BlueBtn>
          <button class="cancel" slot="blue_btn" @click="cancel()">취소</button>
        </BlueBtn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  import { Component, Vue } from "vue-property-decorator";
  @Component({
    components: {
      BlueBtn,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_noticeMessage: "notice_message",
        toggleStore_confirm_modal: "confirm_modal",
      }),
    },
  })
  export default class ConfirmModal extends Vue {
    confirmOk(): void {
      this.$emit("ok");
      this.cancel();
    }
    cancel(): void {
      this.$store.commit("toggleStore/Toggle", {
        confirm_modal: false,
      });
    }
  }
</script>
<style scoped lang="scss">
  .mask {
    .notice_modal {
      background: white;
      max-width: 720px;
      width: 80%;
      padding: 10px;
      box-sizing: border-box;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .contents {
        font-size: 16px;
        text-align: center;
        margin-bottom: 20px;
      }

      .btn_wrap {
        .blue_btn {
          text-align: center;
          width: 50%;
          display: inline-block;
          .confirm_ok,
          .cancel {
            width: 90%;
          }
          .cancel {
            background: #ccc;
            border: 2px solid #ccc;
          }
        }
      }
    }
  }
</style>
