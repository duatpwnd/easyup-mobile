<template>
  <div class="settlement_payment">
    <router-link
      v-if="$route.name != 'paymentDetail'"
      :class="[
        'tab',
        {
          'router-link-active': $route.name == 'detail',
        },
      ]"
      :to="{
        path: '/settlementAndPayment/settleList',
        query: {
          start_date: undefined,
          end_date: undefined,
          pageCurrent: 1,
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>정산
    </router-link>
    <router-link
      v-if="$route.name != 'paymentDetail'"
      class="tab"
      :to="{
        path: '/settlementAndPayment/payList',
        query: {
          start_date: undefined,
          end_date: undefined,
          keyword: '',
          pageCurrent: 1,
          order: '',
          view: this.$route.query.view,
        },
      }"
      ><span class="active_bar"></span>결제</router-link
    >
    <div class="filter">
      <select
        v-if="$route.name == 'settleList'"
        class="settle-filter"
        v-model="order"
        @change="search()"
      >
        <option value="">전체</option>
        <option value="pay">정산예정</option>
        <option value="refund">정산보류</option>
        <option value="refund">정산완료</option>
      </select>
      <router-view name="Search"></router-view>
      <DatePicker
        :style="[
          $route.name == 'settleList'
            ? {
                width: '70%',
                'margin-left': '2%',
                'box-sizing': 'border-box',
                'margin-top': 0,
                display: 'inline-block',
                'vertical-align': 'middle',
              }
            : { width: '100%', 'margin-left': 0 },
        ]"
        v-if="$route.name != 'paymentDetail'"
        @emitDatePick="datePick"
      ></DatePicker>
    </div>
    <router-view name="PayList"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
  import DatePicker from "@/components/common/DatePicker.vue";
  export default {
    components: { DatePicker },
    data() {
      return {
        order: "",
      };
    },
    methods: {
      search() {
        this.$EventBus.$emit(`search`, {
          order: this.order,
          keyword: this.keyword,
        });
      },
      datePick(result) {
        console.log(result);
        if (this.$route.name == "payList") {
          this.$router
            .push({
              query: {
                pageCurrent: 1,
                order: this.$route.query.order,
                keyword: this.$route.query.keyword,
                start_date: this.$dateFormat(result[0]),
                end_date: this.$dateFormat(result[1]),
                view: this.$route.query.view,
              },
            })
            .catch(() => {});
        } else {
          this.$router
            .push({
              query: {
                pageCurrent: 1,
                start_date: this.$dateFormat(result[0]),
                end_date: this.$dateFormat(result[1]),
                view: this.$route.query.view,
                type: this.$route.query.type,
                settle_date: this.$route.query.settle_date,
              },
            })
            .catch(() => {});
        }

        this.$EventBus.$emit(`${this.$route.name}_datePick`, true);
      },
    },

    mounted() {},
  };
</script>
<style scoped lang="scss">
  .settlement_payment {
    padding-bottom: 65px;
    .tab {
      font-size: 18px;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
      position: relative;
      .active_bar {
        background: #f8f8f8;
        height: 4px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
      }
    }
    .router-link-active {
      color: black;
      background: #ffffff;
      .active_bar {
        background: #114fff;
      }
    }
    .filter {
      padding: 0 4.445%;
      margin-top: 10px;
      .box {
        margin-top: 10px;
      }
      .settle-filter {
        width: 28%;
        vertical-align: middle;
        border: 1px solid #333333;
        padding: 0 1.755%;
        height: 42px;
        font-size: 1.25rem;
        color: #333333;
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 92%
          center / 7px 5px;
        display: inline-block;
      }
    }
  }
</style>
