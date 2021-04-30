<template>
  <div v-if="list">
    <Row class="amount_wrap" v-if="list.list.length != 0">
      <template slot="row">
        <div class="row">
          <span class="dt amount">누적 수익 금액</span>
          <span class="dd unit">원</span>
          <span class="dd settlement"> {{ priceInfo.settle_amount }}</span>
        </div>
      </template>
    </Row>
    <div class="settlement_info" v-if="list.list.length != 0">
      <div class="abox">
        <h2 class="dt">결제 금액</h2>
        <span class="dd">{{ priceInfo.final_price }}</span>
        <span class="unit"> 원</span>
      </div>
      <div class="bbox">
        <h2 class="dt">정산 예정 금액</h2>
        <span class="dd">{{ priceInfo.settle_amount }}</span>
        <span class="unit"> 원</span>
      </div>
      <div class="cbox">
        <h2 class="dt">정산 완료 금액</h2>
        <span class="dd">
          {{ priceInfo.settle_amount_complete }}
        </span>
        <span class="unit">원</span>
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
                  start_date: $route.query.start_date,
                  end_date: $route.query.end_date,
                  pageCurrent: 1,
                  view: $route.query.view,
                  settle_date: li.settlement_date,
                  type: li.type,
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
          <span class="dt ">결제 금액</span>
          <span class="dd special-default">{{ li.price.final }}원</span>
        </div>
        <div class="row">
          <span class="dt">이월 금액</span>
          <span class="dd">{{ li.price.carryover }}원</span>
        </div>
        <div class="row">
          <span class="dt">정산 수수료</span>
          <span class="dd">{{ li.price.commission }}원</span>
        </div>
        <div class="row">
          <span class="dt ">정산 금액</span>
          <span class="dd special-default">원</span>
          <span class="dd status special-default">{{
            li.price.settlement
          }}</span>
        </div>
        <div class="row">
          <span class="dt">상태</span>
          <span class="dd" v-if="li.type == 'wait'">정산예정</span>
          <span
            @click="
              $noticeMessage(
                '<h1 style=font-size:18px;>정산 보류 사유</h1><br>' +
                  li.hold_reason
              )
            "
            class="dd waiting-btn"
            v-else-if="li.type == 'hold'"
            >정산대기</span
          >
          <span class="dd" v-else-if="li.type == 'complete'">정산완료</span>
        </div>
      </template>
    </Row>
    <p class="no_result" v-if="list.list.length == 0">
      정산 내역 리스트가 없습니다.
    </p>
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
  import { Component, Vue } from "vue-property-decorator";
  @Component({
    components: {
      Row,
      BaseButton,
      Pagination,
    },
  })
  export default class SettleList extends Vue {
    private list = "";
    private current = 1;
    private priceInfo = "";
    private settleAmount(): void {
      const data = {
        action: "get_settlement_summary",
        search_start_date:
          this.$route.query.start_date == undefined
            ? ""
            : this.$route.query.start_date,
        search_end_date:
          this.$route.query.end_date == undefined
            ? ""
            : this.$route.query.end_date,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.priceInfo = result.data.data;
        });
    }
    private getList(num: number): void {
      const data = {
        action: "get_settlement_list",
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
              },
            })
            .catch(() => {});
          this.current = num;
          this.settleAmount();
        });
    }
    beforeDestroy() {
      this.$EventBus.$off(`settleList_datePick`);
    }
    created() {
      this.$EventBus.$on(
        `search`,
        (result: { order: string; keyword: string }) => {
          console.log(result);
          this.getList(1);
        }
      );
      this.$EventBus.$on(`settleList_datePick`, () => {
        this.getList(1);
      });
      this.getList(this.$route.query.pageCurrent);
    }
  }
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
        font-weight: bold;
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
    .abox,
    .bbox,
    .cbox {
      text-align: center;
      display: inline-block;
      width: 33.333%;
      box-sizing: border-box;
      .dt {
        font-size: 12px;
        color: #999999;
      }

      .dd {
        font-size: 16px;
      }
    }
    .abox,
    .bbox {
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
    .waiting-btn {
      background: #114fff;
      border: 2px solid #114fff;
      color: white;
      border-radius: 5px;
      width: 20%;
      text-align: center;
    }
  }
  .amount_wrap {
    border: 0;
    padding: 0 4.445%;
    margin: 10px 0;
  }
</style>
