<script lang="ts">
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import { Component } from "vue-property-decorator";
  import { mapState } from "vuex";
  @Component({
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirm_modal: "cart_modal",
      }),
    },
  })
  // extends 시에는 template 사용 안해도됨
  export default class GoToCart extends ConfirmModal {
    confirmOk(): void {
      this.$emit("goToCart");
      this.cancel();
    }
    cancel(): void {
      this.$store.commit("toggleStore/Toggle", {
        cart_modal: false,
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
