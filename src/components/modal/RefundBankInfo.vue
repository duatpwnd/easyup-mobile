<template>
  <div class="mask" v-if="refundBankInfo">
    <div class="account_info">
      <h2 class="title">환불 계좌</h2>
      <div class="row">
        <span class="dt">예금주</span>
        <input type="text" class="dd" placeholder="예금주" v-model="userName" />
      </div>
      <div class="row">
        <span class="dt">은행명</span
        ><input
          type="text"
          class="dd"
          placeholder="은행명"
          v-model="bankName"
        />
      </div>
      <div class="row">
        <span class="dt">계좌번호</span
        ><input
          type="text"
          class="dd"
          placeholder="계좌번호"
          v-model="accountNumber"
        />
      </div>
      <div class="btn_wrap">
        <BaseButton>
          <button class="confirm_ok" slot="blue_btn" @click="send()">
            확인
          </button>
        </BaseButton>
        <BaseButton>
          <button class="cancel" slot="blue_btn" @click="close()">취소</button>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import BaseButton from "@/components/common/BaseButton.vue";
  @Component({
    components: { BaseButton },
  })
  export default class RefundBankInfo extends Vue {
    refundBankInfo = false;
    userName = ""; // 예금주
    bankName = ""; // 은행명
    accountNumber = ""; // 계좌번호
    lecture_info: { [key: string]: any } = {};
    close(): void {
      this.refundBankInfo = false;
    }
    send(): void {
      const data: { [key: string]: any } = this.lecture_info;
      data.bank_account_name = this.userName;
      data.bank_account_number = this.accountNumber;
      data.bank_name = this.bankName;
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.$emit("emitSuccess");
          this.close();
          this.$noticeMessage(
            "취소 신청이 완료 되었습니다.<br>강의 시청 내역을 확인 후 환불 처리 됩니다."
          );
        });
    }
    created() {
      this.$EventBus.$on("refundInfo", (result: { [key: string]: any }) => {
        this.refundBankInfo = true;
        this.lecture_info = result;
      });
    }
  }
</script>
<style scoped lang="scss">
  .account_info {
    background: white;
    max-width: 720px;
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .row {
      margin-bottom: 15px;
      .dd {
        width: 100%;
        outline: none;
        border: 1px solid #333333;
        font-size: 14px;
        height: 40px;
        box-sizing: border-box;
        padding: 0 10px;
        line-height: 31px;
        border-radius: 4px;
        color: #333333;
      }
      .dt {
        display: block;
        margin-bottom: 15px;
      }
    }
    .btn_wrap {
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
      .blue_btn {
        text-align: center;
        width: 50%;
        display: inline-block;
        .confirm_ok,
        .cancel {
          width: 90%;
          height: 40px;
          line-height: 31px;
          font-size: 16px;
        }
        .cancel {
          background: #ccc;
          border: 2px solid #ccc;
        }
      }
    }
  }
</style>
