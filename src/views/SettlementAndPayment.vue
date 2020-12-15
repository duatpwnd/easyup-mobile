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
        path: '/settlementAndPayment/settlelList',
        query: {
          start_date: this.$dateFormat(),
          end_date: this.$dateFormat(),
          pageCurrent: 1,
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
          start_date: this.$dateFormat(),
          end_date: this.$dateFormat(),
          keyword: '',
          pageCurrent: 1,
          order: '',
        },
      }"
      ><span class="active_bar"></span>결제</router-link
    >

    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .settlement_payment {
    padding-bottom: 65px;
    .tab {
      font-size: 2rem;
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
    .date_section {
      padding: 0 4.445%;
      margin-top: 10px;
      .box {
        margin-top: 0;
      }
    }
  }
</style>
