<template>
  <div class="payment_detail" v-if="list">
    <section>
      <h2 class="h2_title">결제내역</h2>
      <h3 class="h3_title order_id">결제번호 {{ list.order_id }}</h3>
    </section>
    <section>
      <h3 class="h3_title info">구매자 정보</h3>
      <Row>
        <template slot="row">
          <div class="row">
            <span class="dt">{{ list.pay_user_info.name }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.user_status }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.email }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.phone }}</span>
          </div>
        </template>
      </Row>
    </section>
    <section>
      <h3 class="h3_title info">강의 정보</h3>
      <Row v-for="(li, index) in list.lecture_info" :key="index">
        <template slot="row">
          <div class="row">
            <span class="type" v-if="li.type == 'course'">강의</span>
            <span class="type" v-else>코스</span
            ><span class="subtitle" v-html="li.title"></span>
          </div>
          <div class="row price_line">
            <span class="dt" v-html="li.teacher_name"></span>
            <del
              class="dt final_price"
              v-if="li.price.format_original != li.price.format_final"
              >{{ li.price.format_original }}</del
            >
            <span class="dt ori_price">{{ li.price.format_final }}</span>
          </div>
        </template>
      </Row>
    </section>
    <section>
      <h3 class="h3_title info">결제 정보</h3>
      <Row>
        <template slot="row">
          <div class="row">
            <span class="dt">{{ list.pay_info.pay_date.split(" ")[0] }}</span>
          </div>
          <div class="row">
            <span class="dt">결제 수단</span>
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
              >무통장</span
            >
          </div>
          <div class="row">
            <span class="dt">강의 비용</span>
            <span class="dd">{{ list.pay_info.price.format_original }}원</span>
          </div>
          <div class="row">
            <span class="dt">패키지 할인</span>
            <span class="dd">{{ list.pay_info.price.format_pkg }}원</span>
          </div>
          <div class="row">
            <span class="dt">쿠폰</span>
            <span class="dd">{{ list.pay_info.price.format_coupon }}원</span>
          </div>
          <div class="row">
            <span class="dt">결제 금액</span>
            <span class="dd special-default"
              >{{ list.pay_info.price.format_sum_purchased }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">정산 수수료</span>
            <span class="dd"
              >{{ list.settlement.format_total_commission }}원</span
            >
          </div>
          <div class="row">
            <span class="dt ">정산 금액</span>
            <span class="dd special-default">원</span>
            <span class="dd special-default price">{{
              list.settlement.format_settle_amount
            }}</span>
          </div>
        </template>
      </Row>
    </section>
    <section v-if="list.status_code == 3 || list.status_code == 5">
      <h3 class="h3_title info">취소 요청</h3>
      <Row>
        <template slot="row">
          <div class="row">
            <span class="cancel-lecture-title">취소 사유</span>
            <span
              class="cancel-lecture-contents"
              v-html="list.cancel.cancel_reason"
            ></span>
          </div>
        </template>
      </Row>
    </section>
    <section v-if="list.status_code == 3">
      <h3 class="h3_title info">환불 정보</h3>
      <Row>
        <template slot="row">
          <div class="row">
            <span class="dt">{{ list.cancel.refund_date.split(" ")[0] }}</span>
          </div>
          <div class="row">
            <span class="dt">공제금액</span>
            <span class="dd "
              >{{ list.cancel.price_info.format_refund_fee }}원</span
            >
          </div>

          <div class="row">
            <span class="dt">환불금액</span>
            <span class="dd special-default"
              >{{ list.cancel.price_info.format_refund }}원</span
            >
          </div>
        </template>
      </Row>
    </section>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import Row from "@/components/common/Row.vue";
  interface BodyData {
    action: string;
    order_id: string;
    row_id: number;
    item_type: string;
    item_id: number;
  }
  @Component({
    components: {
      Row,
    },
  })
  export default class PaymentDetail extends Vue {
    private list = "";
    private getList(): void {
      let data = {
        action: "get_order_info_by_teacher",
        order_id: this.$route.query.order_id,
      };
      if (this.$route.query.row_id == undefined) {
        let pay: Omit<BodyData, "row_id" | "action" | "order_id"> = {
          item_type: this.$route.query.type,
          item_id: this.$route.query.item_id,
        };
        data = { ...data, ...pay };
      } else {
        let settle: Omit<
          BodyData,
          "item_type" | "item_id" | "action" | "order_id"
        > = {
          row_id: this.$route.query.row_id,
        };
        data = { ...data, ...settle };
      }
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
  .payment_detail {
    section {
      padding: 4.445%;
      border-bottom: 4px solid #f8f8f8;
      .h2_title {
        font-size: 18px;
      }
      .h3_title {
        font-size: 16px;
      }
      .info {
        margin-bottom: 12px;
      }
      .order_id {
        margin-top: 16px;
      }

      .price_line {
        line-height: 20px;
        .final_price {
          color: #bdbdbd;
          margin-left: 4px;
        }
        .ori_price {
          font-weight: bold;
          margin-left: 5px;
          color: #114fff;
        }
      }
      .li {
        .special-default {
          font-weight: bold;
        }
        .type {
          width: 8%;
          font-size: 14px;
          vertical-align: top;
          display: inline-block;
        }
        .subtitle {
          @extend .type;
          width: 92%;
        }
        .price {
          color: #114fff;
        }
        .cancel-lecture-title {
          font-size: 14px;
          display: inline-block;
          vertical-align: top;
          width: 18%;
        }
        .cancel-lecture-contents {
          @extend .cancel-lecture-title;
          width: 82%;
        }
      }
    }
  }
</style>
