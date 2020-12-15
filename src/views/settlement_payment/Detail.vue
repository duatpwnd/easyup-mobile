<template>
  <div class="detail_contents">
    <h2 class="h2_title">상세내역</h2>
    <Row v-for="(li, index) in list.list" :key="index">
      <template slot="row">
        <div class="row contain_btn">
          <h2 class="date">{{ li.pay_date }}</h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/settlementAndPayment/paymentDetail',
                query: {
                  trans_id: li.trans_id,
                },
              })
            "
          >
            <button slot="blue_btn">{{ li.trans_id }}</button>
          </BaseButton>
        </div>
        <div class="row">
          <span class="dt lec" v-if="li.type == 'course'">강의</span>
          <span class="dt course" v-else>코스</span>
          <span class="dt">{{ li.title }}</span>
        </div>
        <div class="row">
          <span class="dt">구매자</span>
          <span class="dd">{{ li.pay_user_name }}</span>
        </div>

        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd"
            >{{
              li.price.original
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">할인 금액</span>
          <span class="dd"
            >{{
              li.price.discount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">결제 금액</span>
          <span class="dd"
            >{{
              li.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">환불 금액</span>
          <span class="dd">원</span>
          <span class="dd">{{
            li.price.refund.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
        <div class="row">
          <span class="dt">정산 수수료</span>
          <span class="dd">원</span>
          <span class="dd">{{
            li.price.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
        <div class="row">
          <span class="dt">정산 금액</span>
          <span class="dd">원</span>
          <span class="dd status">{{
            li.price.settlement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
      </template>
    </Row>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  export default {
    components: {
      Row,
      BaseButton,
    },
    data() {
      return {
        list: "",
        current: "",
      };
    },
    methods: {
      getList(num) {
        const data = {
          action: "get_settlement_detail",
          current: num,
          search_start_date: this.$route.query.start_date,
          search_end_date: this.$route.query.end_date,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
            this.$router
              .push({
                query: {
                  pageCurrent: num,
                  start_date: this.$route.query.start_date,
                  end_date: this.$route.query.end_date,
                },
              })
              .catch(() => {});
            this.current = num;
          });
      },
    },
    created() {
      this.getList(this.$route.query.pageCurrent);
    },
  };
</script>
<style scoped lang="scss">
  .detail_contents {
    .h2_title {
      font-size: 16px;
      padding: 0 4.445%;
      margin-top: 24px;
    }
    .li {
      padding: 4.445%;
      padding-top: 0;
      margin-top: 24px;
      border-bottom: 4px solid #f8f8f8;
    }
  }
</style>
