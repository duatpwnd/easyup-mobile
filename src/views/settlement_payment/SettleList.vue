<template>
  <div v-if="list">
    <div class="filter">
      <DatePicker @emitDatePick="datePick"></DatePicker>
    </div>
    <Row class="amount_wrap">
      <template slot="row">
        <div class="row">
          <span class="dt amount">정산 예정 금액</span>
          <span class="dd unit">원</span>
          <span class="dd settlement">
            {{
              list.total_info.settlement
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span
          >
        </div>
      </template>
    </Row>

    <div class="settlement_info">
      <div class="left">
        <h2 class="dt">결제금액</h2>
        <span class="dd">{{
          list.total_info.payment
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}</span>
        <span class="unit"> 원</span>
      </div>
      <div class="center">
        <h2 class="dt">환불금액</h2>
        <span class="dd">{{
          list.total_info.refund
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}</span>
        <span class="unit"> 원</span>
      </div>
      <div class="right">
        <h2 class="dt">정산 완료 금액</h2>
        <span class="dd">
          {{
            list.total_info.settlement_finish
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </span>
        <span class="unit"> 원</span>
      </div>
    </div>

    <Row v-for="(li, index) in list.list" :key="index">
      <template slot="row">
        <div class="row contain_btn">
          <h2 class="date">정산일 {{ li.settlement_date }}</h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/settlementAndPayment/detail',
                query: {
                  start_date: $dateFormat(),
                  end_date: $dateFormat(),
                  pageCurrent: 1,
                },
              })
            "
          >
            <button slot="blue_btn">상세내역</button>
          </BaseButton>
        </div>
        <div class="row">
          <span class="dt status">{{ li.settlement_target }}</span>
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
          <span class="dd"
            >{{
              li.price.refund.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">정산 수루료</span>
          <span class="dd"
            >{{
              li.price.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
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
  import DatePicker from "@/components/common/DatePicker.vue";

  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  export default {
    components: {
      Row,
      BaseButton,
      DatePicker,
    },
    data() {
      return {
        list: "",
        current: "",
      };
    },
    methods: {
      datePick(result) {
        this.$router
          .push({
            query: {
              pageCurrent: 1,
              start_date: this.$dateFormat(result[0]),
              end_date: this.$dateFormat(result[1]),
            },
          })
          .catch(() => {});
        // this.getList(1);
      },
      getList(num) {
        const data = {
          action: "get_settlement_list",
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
  .filter {
    padding: 0 4.445%;
    margin-top: 10px;
  }
  .amount_wrap {
    .row {
      .amount,
      .settlement,
      .unit {
        font-size: 16px;
      }
      .settlement {
        color: #114fff;
      }
      .unit {
        vertical-align: middle;
      }
    }
  }
  .settlement_info {
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    background: #f8f8f8;
    .left,
    .right,
    .center {
      text-align: center;
      display: inline-block;
      width: 33.3333%;
      box-sizing: border-box;
      .dt {
        font-size: 12px;
        color: #999999;
      }
      .dd {
        font-size: 16px;
      }
    }
    .left,
    .center {
      border-right: 1px solid #333333;
    }
  }

  .li {
    padding: 4.445%;
    padding-top: 0;
    margin-top: 24px;
    border-bottom: 4px solid #f8f8f8;
  }
  .amount_wrap {
    border: 0;
    padding: 0 4.445%;
    margin: 10px 0;
  }
</style>
