<template>
  <div class="complete_msg">
    <h1 class="big_title">구매 신청이 완료되었습니다.</h1>
    <p class="notice_msg">
      내 강의실에서 구매 신청 내역을 확인하세요.<br />
      입금 계좌 정보는 메시지 내역에서 재확인이 가능하고,<br />
      입금 기한이 지난 이후에는 자동으로 구매 신청이 취소됩니다.
    </p>
    <ul class="info">
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
      <li>
        <span class="th">구매자</span>
        <span class="td">이지업</span>
      </li>
    </ul>
    <div class="btn_wrap">
      <BlueBtn class="left" @click.native="$router.push('/')">
        <button slot="blue_btn">
          홈으로 이동
        </button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn">
          내 강의실 입장
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
  export default class PurchaseComplete extends Vue {
    list = "";
    getList(): void {
      const data = {
        action: "order_info",
        order_id: String(this.$route.query.order_id),
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log(result);
          this.list = result.data.data;
        });
    }
    created() {
      this.getList();
    }
  }
</script>
<style scoped lang="scss">
  .complete_msg {
    text-align: center;
    padding: 8%;
    padding-top: 4.445%;
    .big_title {
      font-size: 26px;
    }
    .notice_msg {
      font-family: "NotoSansCJKkr-Regular";
      font-size: 14px;
      margin: 20px 0;
    }
    .info {
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      padding: 15px 0;
      li {
        text-align: left;
        font-size: 14px;
        &:not(:first-child) {
          margin-top: 5px;
        }
        .th {
          font-weight: bold;
          width: 20%;
          display: inline-block;
        }
      }
    }
    .btn_wrap {
      margin-top: 20px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .blue_btn {
        width: 48%;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
</style>
