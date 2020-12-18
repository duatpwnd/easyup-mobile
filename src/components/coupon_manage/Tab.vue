<template>
  <div class="coupon_wrap">
    <p class="notice" v-if="$route.query.type == 'used'">
      사용완료/기간만료 쿠폰은 최근 6개월 내역만 조회 가능합니다.​
    </p>
    <div class="coupon" v-for="(li, index) in list.list" :key="index">
      <div class="left">
        <img
          src="@/assets/images/common/used_txt.png"
          v-if="$route.query.type == 'used'"
        />
        <!-- <img src="@/assets/images/common/expired_txt.png" /> -->
        <div class="row1">
          <span class="name">{{ li.coupon_name }}</span>
        </div>
        <div class="row2">
          <span class="date" v-if="li.limit_type == 'date'"
            >{{ li.limit_date }}일까지</span
          >
          <span class="date" v-else>발급일로부터 {{ li.limit_date }}일</span>
        </div>
      </div>
      <div
        class="right"
        :style="[
          { background: $route.query.type == 'used' ? '#DBDBDB' : '#ff114a' },
        ]"
      >
        <h2>10%</h2>
        <span
          >최대{{
            li.discount_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}원</span
        >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Object,
        required: true,
      },
    },
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .coupon_wrap {
    padding: 0 4.445%;
    .notice {
      margin-top: 10px;
      color: #999999;
      font-size: 12px;
      background: url("~@/assets/images/common/notice_ico1.png") no-repeat left
        center / 16px 16px;
      padding-left: 20px;
    }
    .coupon {
      border: 1px solid black;
      margin-top: 10px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .left {
        float: left;
        padding: 10px;
        width: 75%;
        box-sizing: border-box;
        position: relative;
        img {
          width: 40%;
          position: absolute;
          top: 0;
          right: 10%;
          bottom: 0;
          margin: auto;
        }
        .row1 {
          .name {
            font-size: 14px;
          }
        }
        .row2 {
          .date {
            font-size: 12px;
            color: #999999;
          }
        }
      }
      .right {
        color: white;
        text-align: center;
        float: right;
        width: 25%;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
</style>
