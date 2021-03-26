<template>
  <div class="detail_wrap" v-if="Object.keys(list).length > 0">
    <ConfirmModal
      @ok="cancelLecture = true"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <ConfirmModal class="receipt-modal" v-if="recepit_issue">
      <input
        type="phone"
        class="phone"
        slot="contents"
        v-model="phone"
        placeholder="휴대폰번호"
      />
      <template slot="button_type">
        <BaseButton @click.native="receiptApplication()" class="confirm">
          <button slot="blue_btn">
            확인
          </button>
        </BaseButton>
        <BaseButton @click.native="recepit_issue = false" class="cancel">
          <button slot="blue_btn">
            취소
          </button>
        </BaseButton>
      </template>
    </ConfirmModal>
    <CancelLecture
      v-if="cancelLecture"
      @emitClose="cancelLecture = false"
      :lecture_info="list"
    ></CancelLecture>
    <!-- 무통장 환불 은행 정보 -->
    <RefundBankInfo></RefundBankInfo>
    <Row>
      <template slot="row">
        <div class="section">
          <div class="row">
            <h2 class="title">결제번호 {{ list.order_id }}</h2>
          </div>
        </div>
        <!-- 구매자 정보 :: S -->
        <div class="section user_info">
          <h2 class="title">구매자 정보</h2>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.name }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.email }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.phone }}</span>
          </div>
        </div>
        <!-- 구매자 정보 :: E -->

        <!-- 강의 정보 :: S -->
        <div class="section lecture_info">
          <h2 class="title">강의 정보</h2>
          <div
            class="row"
            v-for="(li, index) in list.lecture_info"
            :key="index"
          >
            <span class="dt"
              ><span class="lec" v-if="li.type == 'course'">강의</span>
              <span class="course" v-else>코스</span>{{ li.title }}</span
            >
            <div class="clear_both">
              <span class="dt">{{ li.teacher_name }}</span>
              <del
                class="dt final_price"
                v-if="li.price.format_original != li.price.format_final"
                >{{ li.price.format_original }}</del
              >
              <span class="dt ori_price">{{
                li.price.format_sum_purchased
              }}</span>
            </div>
          </div>
        </div>
        <!-- 강의 정보 :: E -->
        <!-- 이미 구매한 강의 :: S-->
        <div class="section purchased" v-if="list.purchased_item">
          <h2 class="title">이미 구매한 강의</h2>
          <div class="left_box">
            <div>주문번호</div>
            <div>강의명</div>
            <div>총금액</div>
          </div>
          <div
            class="right_box"
            v-for="(li, key) in list.purchased_item"
            :key="key"
          >
            <div>{{ li.order_id }}</div>
            <div>{{ li.item_title }}</div>
            <div>{{ list.pay_info.price.format_purchased }}</div>
          </div>
          <!-- <table>
            <colgroup>
              <col width="50%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tr>
              <th>주문번호</th>
              <th>강의명</th>
              <th>총금액</th>
            </tr>
            <tr v-for="(li, index) in list.purchased_item" :key="index">
              <td>{{ li.order_id }}</td>
              <td>{{ li.item_title }}</td>
              <td>{{ list.pay_info.price.format_purchased }}</td>
            </tr>
          </table> -->
        </div>
        <!-- 이미 구매한 강의 :: E -->
        <!-- 결제 정보 :: S -->
        <div class="section payment_info">
          <h2 class="title">결제 정보</h2>
          <div class="row">
            <span class="dt">{{ list.pay_info.pay_date.split(" ")[0] }}</span>
          </div>
          <div class="row">
            <span class="dt">결제수단</span>
            <span class="dd" v-if="list.pay_info.method == 'card'"
              >신용카드</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'transfer'"
              >계좌이체</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'simple'"
              >간편결제</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'phone'"
              >휴대폰</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'bank'"
              >무통장 입금</span
            >
          </div>
          <div class="row">
            <span class="dt">강의비용</span>
            <span class="dd">{{ list.pay_info.price.format_original }}원</span>
          </div>
          <div class="row">
            <span class="dt">패키지 할인</span>
            <span class="dd">{{ list.pay_info.price.format_pkg }}원</span>
          </div>
          <!-- <div class="row">
            <span class="dt">
              쿠폰
            </span>
            <span class="dd">
              {{
                list.pay_info.price.discount_coupon
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div> -->
          <div class="row">
            <span class="dt">결제금액</span>
            <span class="dd final-price"
              >{{ list.pay_info.price.format_sum_purchased }}원</span
            >
          </div>
        </div>
        <!-- 결제 정보 :: E -->

        <!-- 취소 요청 :: S -->
        <div
          class="section"
          v-if="list.status_code == 3 || list.status_code == 5"
        >
          <h2 class="title">취소 요청</h2>
          <div class="row">
            <span class="dt">강의 비용</span>
            <span class="dd"
              >{{ list.pay_info.price.format_sum_purchased }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">할인 금액</span>
            <span class="dd">-원</span>
          </div>
          <div class="row">
            <span class="dt">취소 요청 금액</span>
            <span class="dd final-price"
              >{{ list.cancel.price_info.format_cancel }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">취소 사유</span>
            <span class="dd">{{ list.cancel.cancel_reason }}</span>
          </div>
          <div
            class="row cancel_req_list"
            v-for="(li, index) in list.lecture_info.filter((el) => {
              return el.state == 3 || el.state == 5;
            })"
            :key="index"
          >
            <span class="dt"
              ><span class="lec" v-if="li.type == 'course'">강의</span>
              <span class="course" v-else>코스</span>{{ li.title }}</span
            >
            <div class="clear_both">
              <span class="dt">{{ li.teacher_name }}</span>
              <del
                class="dt final_price"
                v-if="li.price.format_original != li.price.format_final"
                >{{ li.price.format_original }}</del
              >
              <span class="dt ori_price">{{
                li.price.format_sum_purchased
              }}</span>
            </div>
          </div>
        </div>
        <!-- 취소 요청 :: E -->

        <!-- 환불 계좌 :: S -->
        <div
          class="section"
          v-if="
            (list.status_code == 3 || list.status_code == 5) &&
              list.pay_info.method == 'bank'
          "
        >
          <h2 class="title">환불 계좌</h2>
          <div class="row">
            <span class="dt">예금주</span>
            <span class="dd">{{ list.cancel.bank_account_name }}</span>
          </div>
          <div class="row">
            <span class="dt">은행명</span>
            <span class="dd">{{ list.cancel.bank_name }}</span>
          </div>
          <div class="row">
            <span class="dt">계좌번호</span>
            <span class="dd">{{ list.cancel.bank_account_number }}</span>
          </div>
        </div>
        <!-- 환불 계좌 :: E -->

        <!-- 환불 정보 :: S -->
        <div
          class="section"
          v-if="
            list.cancel != null &&
              list.cancel.state == 3 &&
              list.cancel.refund_date != null
          "
        >
          <h2 class="title">환불 처리</h2>
          <div class="row">
            <span class="dt">처리일</span>
            <span class="dd">
              {{ list.cancel.refund_date }}
            </span>
          </div>
          <div class="row">
            <span class="dt">공제 금액</span>
            <span class="dd">
              {{ list.cancel.price_info.format_refund_fee }}원
            </span>
          </div>
          <div class="row">
            <span class="dt">환불 금액</span>
            <span class="dd final-price">
              {{ list.cancel.price_info.format_refund }}원
            </span>
          </div>
        </div>
        <!-- 환불 정보 :: E -->
      </template>
    </Row>
    <div class="btn_wrap_list">
      <BaseButton
        class="left"
        v-if="list.is_possible_cancel.result && list.status_code == 1"
        @click.native="isCancel()"
      >
        <button slot="blue_btn">
          취소 요청
        </button>
      </BaseButton>
      <BaseButton
        @click.native="$noticeMessage(list.is_possible_cancel.false_reason)"
        class="left"
        v-else-if="list.is_possible_cancel.result == false"
      >
        <button slot="blue_btn" class="cancel_req_btn">
          취소 요청
        </button>
      </BaseButton>
      <BaseButton
        @click.native="$noticeMessage('취소 신청 내역을 확인 중입니다.')"
        class="left"
        v-else-if="list.is_possible_cancel.result && list.status_code == 5"
      >
        <button slot="blue_btn">
          취소 진행
        </button>
      </BaseButton>
      <BaseButton
        class="right"
        :style="[
          {
            width: list.status == '결제실패' ? '100%' : '49%',
          },
        ]"
      >
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/purchase/list',
              query: {
                keyword: '',
                pageCurrent: 1,
                order: '',
                view: $route.query.view,
              },
            })
          "
        >
          목록
        </button>
      </BaseButton>
      <BaseButton
        class="purchase_receipt"
        v-if="
          list.pay_info.show_cash_receipt || list.pay_info.show_card_receipt
        "
      >
        <button
          slot="blue_btn"
          @click="
            list.pay_info.show_cash_receipt
              ? receiptList(
                  `http://pgims.ksnet.co.kr/pg_infoc/src/bill/ps2.jsp?s_pg_deal_numb=${list.pay_info.tid}`
                )
              : receiptList(
                  `http://pgims.ksnet.co.kr/pg_infoc/src/bill/credit_view.jsp?tr_no=${list.pay_info.tid}`
                )
          "
        >
          구매영수증
        </button>
      </BaseButton>
      <BaseButton
        class="purchase_receipt"
        v-if="list.pay_info.is_possible_receipt"
        @click.native="recepit_issue = true"
      >
        <button slot="blue_btn">
          현금영수증 발급
        </button>
      </BaseButton>
    </div>
  </div>
</template>
<script lang="ts">
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import CancelLecture from "@/components/modal/CancelLecture.vue";
  import RefundBankInfo from "@/components/modal/RefundBankInfo.vue";
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import { mapState } from "vuex";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      CancelLecture,
      ConfirmModal,
      Row,
      BaseButton,
      RefundBankInfo,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
  })
  export default class Detail extends Vue {
    list: { [key: string]: any } = {};
    cancelLecture = false;
    refundBankInfo = false;
    phone: string = "";
    recepit_issue = false;
    // 영수증 조회
    receiptList(url: string): void {
      window.location.href = url;
    }
    // 현금영수증 발급 신청
    isCancel(): void {
      this.$confirmMessage(
        "구매하신 강의를 취소 하시겠습니까?<br>취소 신청 시 강의 시청이 불가 합니다."
      );
    }
    receiptApplication(): void {
      const data = {
        action: "request_cash_receipt",
        order_id: this.$route.query.order_id,
        receipt_number: this.phone,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          if (result.data.data.result == false) {
            this.recepit_issue = false;
            this.$noticeMessage(result.data.data.msg);
          } else {
            this.$noticeMessage("현금영수증 발급이 신청되었습니다.");
          }
        });
    }
    getList(): void {
      const data = {
        action: "order_info",
        order_id: this.$route.query.order_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
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
  ::v-deep .receipt-modal {
    .notice_modal {
      .phone {
        border: 1px solid #ccc;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
      }
      .btn_wrap {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
        }
        .confirm {
          float: left;
        }
        .cancel {
          float: right;
          button {
            border: 1px solid #dbdbdb;
            background: #dbdbdb;
            color: white;
          }
        }
      }
    }
  }

  .detail_wrap {
    .section {
      padding: 4.445%;
      border-bottom: 4px solid #f8f8f8;
      .row {
        .final-price {
          font-weight: bold;
        }
      }
    }
    .user_info,
    .payment_info,
    .purchased {
      .title {
        margin-bottom: 10px;
      }
    }
    .lecture_info {
      .row {
        margin-top: 10px;
      }
    }
    .cancel_req_list {
      margin-top: 10px;
    }
    .purchased {
      font-family: "NotoSansCJKkr-Regular";
      .left_box,
      .right_box {
        display: inline-block;
        font-size: 14px;
      }
      .left_box {
        width: 17%;
      }
    }
    .clear_both {
      clear: both;
      line-height: 20px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .final_price {
        font-size: 14px;
        color: #bdbdbd;
        margin-left: 4px;
      }
      .ori_price {
        font-weight: bold;
        margin-left: 5px;
        font-size: 14px;
        color: #114fff;
      }
    }
    .btn_wrap_list {
      padding: 4.445%;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .blue_btn {
        width: 49%;
        button {
          height: 40px;
          line-height: 31px;
          font-size: 16px;
        }
      }
      .left {
        float: left;
      }
      .right {
        float: right;
        button {
          background: white;
          color: #114fff;
        }
      }
      .cancel_req_btn {
        border: 1px solid #dbdbdb;
        background: #dbdbdb;
        color: white;
      }
      .purchase_receipt {
        width: 100%;
        clear: both;
        padding-top: 4.445%;
      }
    }
  }
</style>
