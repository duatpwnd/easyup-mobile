<template>
  <div class="detail_contents" v-if="list">
    <!-- <h2 class="h2_title">상세내역</h2> -->
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
                  type: li.type,
                  item_id: li.item_id,
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
        <!-- <div class="row">
          <span class="dt">구매자</span>
          <span class="dd">{{ li.pay_user_name }}</span>
        </div> -->

        <!-- <div class="row">
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
        </div> -->
        <div class="row">
          <span class="dt t">결제 금액</span>
          <span class="dd special-default">{{ li.price.final }}원</span>
        </div>
        <!-- <div class="row">
          <span class="dt">환불 금액</span>
          <span class="dd">원</span>
          <span class="dd">{{
            li.price.refund.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div> -->
        <div class="row">
          <span class="dt">정산 수수료</span>
          <span class="dd">원</span>
          <span class="dd">{{ li.price.commission }}</span>
        </div>
        <div class="row">
          <span class="dt ">정산 금액</span>
          <span class="dd special-default">원</span>
          <span class="dd status special-default">{{
            li.price.settlement
          }}</span>
        </div>
      </template>
    </Row>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList(Number(current) - 1)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList(Number(current) + 1)"
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
    components: {
      Row,
      BaseButton,
      Pagination,
    },
  })
  export default class Detail extends Vue {
    list = "";
    current = 1;
    getList(num: number): void {
      console.log("type", this.$route.query.type);
      const data = {
        action: "get_settlement_detail",
        type: this.$route.query.type,
        settle_date:
          this.$route.query.settle_date == "hold"
            ? ""
            : this.$route.query.settle_date,
        current: num,
        search_start_date:
          this.$route.query.start_date == undefined
            ? ""
            : this.$route.query.start_date,
        search_end_date:
          this.$route.query.end_date == undefined
            ? ""
            : this.$route.query.end_date,
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
                start_date: this.$route.query.start_date,
                end_date: this.$route.query.end_date,
                view: this.$route.query.view,
                type: this.$route.query.type,
                settle_date: this.$route.query.settle_date,
              },
            })
            .catch(() => {});
          this.current = num;
        });
    }
    beforeDestroy() {
      this.$EventBus.$off(`detail_datePick`);
    }
    created() {
      this.$EventBus.$on(`detail_datePick`, () => {
        console.log("데이트픽왔다");
        this.getList(1);
      });
      this.getList(this.$route.query.pageCurrent);
    }
  }
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
      .contain_btn {
        margin-bottom: 10px;
      }
      .special-default {
        font-weight: bold;
      }
      .blue_btn {
        width: 55%;
        button {
          font-size: 16px;
          height: 30px;
          line-height: 21px;
        }
      }
      .row {
        .type {
          width: 8%;
        }
        .subtitle {
          width: 92%;
        }
      }
    }
  }
</style>
