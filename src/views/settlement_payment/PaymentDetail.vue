<template>
  <div class="payment_detail" v-if="list">
    <section>
      <h2 class="h2_title">결제내역</h2>
      <h3 class="h3_title trans_id">결제번호 {{ list.trans_id }}</h3>
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
            <span class="dt lec" v-if="li.type == 'course'">강의</span>
            <span class="dt course" v-else>코스</span>
            <span class="dt">{{ li.title }}</span>
          </div>
          <div class="row price_line">
            <span class="dt">{{ li.teacher_name }}</span>
            <del class="dt final_price">{{
              li.price.original.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</del>
            <span class="dt ori_price">{{
              li.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
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
            <span class="dd">{{ list.pay_info.method }}</span>
          </div>
          <div class="row">
            <span class="dt">강의 비용</span>
            <span class="dd"
              >{{
                list.pay_info.price.original
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">패키지 할인</span>
            <span class="dd"
              >{{
                list.pay_info.price.discount_pkg
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">쿠폰</span>
            <span class="dd"
              >{{
                list.pay_info.price.discount_coupon
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">결제 금액</span>
            <span class="dd"
              >{{
                list.pay_info.price.final
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">정산 수수료</span>
            <span class="dd"
              >{{
                list.pay_info.price.fee
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
          <div class="row">
            <span class="dt">정산 금액</span>
            <span class="dd"
              >{{
                list.pay_info.price.settlement
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
        </template>
      </Row>
    </section>
    <section>
      <h3 class="h3_title info">환불 정보</h3>
      <Row>
        <template slot="row">
          <div class="row">
            <span class="dt">{{
              list.refund_info.refund_date.split(" ")[0]
            }}</span>
          </div>
          <div class="row">
            <span class="dt">공제 금액</span>
            <span class="dd"
              >{{
                list.refund_info.penalty
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>

          <div class="row">
            <span class="dt">환불 정보</span>
            <span class="dd"
              >{{
                list.refund_info.refund_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원</span
            >
          </div>
        </template>
      </Row>
    </section>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  export default {
    components: {
      Row,
    },
    data() {
      return {
        list: "",
      };
    },
    methods: {
      getList() {
        const data = {
          action: "get_pay_info",
          trans_id: this.$route.query.trans_id,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
          });
      },
    },
    created() {
      this.getList();
    },
  };
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
      .trans_id {
        margin-top: 16px;
      }
      .lec,
      .course {
        margin-right: 10px;
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
    }
  }
</style>
