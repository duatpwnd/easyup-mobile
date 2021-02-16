<template>
  <div v-if="list">
    <div class="filter"></div>
    <Row class="payment">
      <template slot="row">
        <div class="row">
          <span class="dt amount">결제 금액</span>
          <span class="dd unit">원</span>
          <span class="dd settlement">
            {{
              list.total_info.payment
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span
          >
        </div>
      </template>
    </Row>
    <div class="payment_info">
      <div class="left">
        <h2 class="dt">결제 건수</h2>
        <span class="dd">{{ list.total_info.cnt_payment }}</span>
        <span class="unit"> 건</span>
      </div>
      <div class="center">
        <h2 class="dt">취소 건수</h2>
        <span class="dd">{{ list.total_info.cnt_cancel }}</span>
        <span class="unit"> 건</span>
      </div>
      <div class="right">
        <h2 class="dt">취소 금액</h2>
        <span class="dd">
          {{
            list.total_info.cancel
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
          <h2 class="date">{{ li.pay_date }}</h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/settlementAndPayment/paymentDetail',
                query: {
                  order_id: li.order_id,
                  view: $route.query.view,
                },
              })
            "
          >
            <button slot="blue_btn">{{ li.order_id }}</button>
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
          <span class="dt">금액</span>
          <span class="dd"
            >{{
              li.payment_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt status" v-if="li.status == 'success'">결제완료</span>
          <span class="dt status" v-else>환불완료</span>
        </div>
      </template>
    </Row>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList(Number(current) - 1, order, $route.query.keyword)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList(Number(current) + 1, order, $route.query.keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton";
  import Pagination from "@/components/common/Pagination.vue";
  export default {
    components: { Row, BaseButton, Pagination },
    data() {
      return {
        list: "",
        current: "",
        order: "",
        keyword: "",
      };
    },
    methods: {
      datePick(result) {
        console.log(result);
        this.$router
          .push({
            query: {
              pageCurrent: num,
              order: order,
              keyword: keyword,
              start_date: this.$dateFormat(result[0]),
              end_date: this.$dateFormat(result[1]),
              view: this.$route.query.view,
            },
          })
          .catch(() => {});
        // this.getList(1);
      },
      getList(num, order, keyword) {
        const data = {
          action: "get_pay_list",
          current: num,
          order: order,
          keyword: keyword,
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
                  order: order,
                  keyword: keyword,
                  start_date: this.$route.query.start_date,
                  end_date: this.$route.query.end_date,
                  view: this.$route.query.view,
                },
              })
              .catch(() => {});
            this.order = order;
            this.keyword = keyword;
            this.current = num;
          });
      },
    },
    beforeDestroy() {
      this.$EventBus.$off(`payList_datePick`);
      this.$EventBus.$off(`search`);
    },
    created() {
      this.$EventBus.$on(`search`, (result) => {
        console.log(result);
        this.getList(1, result.order, result.keyword);
      });
      this.$EventBus.$on(`payList_datePick`, () => {
        this.getList(1, this.$route.query.order, this.$route.query.keyword);
      });
      this.getList(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .filter {
    padding: 0 4.445%;
    margin-top: 10px;
    .search {
      .select,
      .search_contents {
        line-height: 2.75;
        font-size: 14px;
      }
    }
  }
  .payment {
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
  .payment_info {
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
      .unit {
        font-size: 12px;
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
  .payment {
    border: 0;
    padding: 0 4.445%;
    margin: 10px 0;
  }
</style>
