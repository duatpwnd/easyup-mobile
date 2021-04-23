<template>
  <div v-if="list">
    <div class="filter"></div>
    <Row class="payment" v-if="list.list.length != 0">
      <template slot="row">
        <div class="row">
          <span class="dt amount">결제 금액</span>
          <span class="dd unit">원</span>
          <span class="dd settlement"> {{ payInfo.payment }}</span>
        </div>
      </template>
    </Row>
    <div class="payment_info" v-if="list.list.length != 0">
      <div class="abox">
        <h2 class="dt">결제 금액</h2>
        <span class="dd">
          {{ payInfo.payment }}
        </span>
        <span class="unit"> 원</span>
      </div>
      <div class="bbox">
        <h2 class="dt">환불 금액</h2>
        <span class="dd">
          {{ payInfo.cancel }}
        </span>
        <span class="unit"> 원</span>
      </div>
      <div class="cbox">
        <h2 class="dt">결제 건수</h2>
        <span class="dd">{{ payInfo.cnt_payment }}</span>
        <span class="unit"> 건</span>
      </div>
      <div class="dbox">
        <h2 class="dt">취소 건수</h2>
        <span class="dd">{{ payInfo.cnt_cancel }}</span>
        <span class="unit"> 건</span>
      </div>
    </div>
    <Row v-for="(li, index) in list.list" :key="index">
      <template slot="row">
        <div class="row contain_btn">
          <h2 class="date">{{ li.pay_date.split(" ")[0] }}</h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/settlementAndPayment/paymentDetail',
                query: {
                  order_id: li.order_id,
                  view: $route.query.view,
                  row_id: li.row_id,
                },
              })
            "
          >
            <button slot="blue_btn">{{ li.order_id }}</button>
          </BaseButton>
        </div>
        <div class="row">
          <span class="dt type" v-if="li.type == 'course'">강의</span>
          <span class="dt type" v-else>코스</span>
          <span class="dt subtitle" v-html="li.title"></span>
        </div>
        <div class="row">
          <span class="dt">구매자</span>
          <span class="dd">{{ li.pay_user_name }}</span>
        </div>

        <div class="row">
          <span class="dt ">금액</span>
          <span class="dd  special-default">원</span>
          <span class="dd special-default price">{{
            li.payment_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
        <div class="row">
          <span class="dt status">{{ li.status }}</span>
        </div>
      </template>
    </Row>
    <p class="no_result" v-if="list.list.length == 0">
      결제 내역 리스트가 없습니다.
    </p>
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
<script lang="ts">
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: { Row, BaseButton, Pagination },
  })
  export default class PayList extends Vue {
    private payInfo = "";
    private list = "";
    private current = 1;
    private order = "";
    private keyword = "";
    private payAmount(): void {
      const data = {
        action: "get_pay_summary",
        search_start_date:
          this.$route.query.start_date == undefined
            ? ""
            : this.$route.query.start_date,
        search_end_date:
          this.$route.query.end_date == undefined
            ? ""
            : this.$route.query.end_date,
        keyword: this.$route.query.keyword,
        search_status: this.$route.query.order,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.payInfo = result.data.data;
        });
    }
    private getList(num: number, order: string, keyword: string): void {
      const data = {
        action: "get_pay_list",
        current: num,
        search_status: order,
        keyword: keyword,
        search_start_date: this.$route.query.start_date,
        search_end_date: this.$route.query.end_date,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
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
          this.payAmount();
        });
    }
    beforeDestroy() {
      this.$EventBus.$off(`payList_datePick`);
      this.$EventBus.$off(`search`);
    }
    created() {
      this.$EventBus.$on(
        "search",
        (result: { order: string; keyword: string }) => {
          console.log(result);
          this.getList(1, result.order, result.keyword);
        }
      );
      this.$EventBus.$on("payList_datePick", () => {
        this.getList(1, this.$route.query.order, this.$route.query.keyword);
      });
      this.getList(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
    }
  }
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
        font-weight: bold;
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
    .abox,
    .bbox,
    .cbox,
    .dbox {
      text-align: center;
      display: inline-block;
      width: 25%;
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
    .abox,
    .bbox,
    .cbox {
      border-right: 1px solid #333333;
    }
  }
  .no_result {
    text-align: center;
    font-size: 16px;
    margin-top: 15px;
  }
  .li {
    padding: 4.445%;
    padding-top: 0;
    margin-top: 24px;
    border-bottom: 4px solid #f8f8f8;
    .special-default {
      font-weight: bold;
    }
    .row {
      .blue_btn {
        width: 55%;
        button {
          font-size: 16px;
          height: 30px;
          line-height: 21px;
        }
      }
      .type {
        width: 8%;
      }
      .subtitle {
        width: 92%;
      }
    }
    .contain_btn {
      margin-bottom: 10px;
    }
  }
  .payment {
    border: 0;
    padding: 0 4.445%;
    margin: 10px 0;
  }
</style>
