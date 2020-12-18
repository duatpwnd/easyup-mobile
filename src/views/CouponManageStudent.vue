<template>
  <div class="coupon_manage" v-if="list">
    <section>
      <div class="register_line">
        <input
          type="text"
          class="register_btn"
          v-model="couponNumber"
          placeholder="쿠혼 번호를 입력해 주세요."
        />
        <BaseButton @click.native="register()">
          <button slot="blue_btn">쿠폰 등록</button>
        </BaseButton>
      </div>
      <div class="coupon_info">
        <div class="left">
          <h2 class="dt">사용가능 할인쿠폰</h2>
          <span class="dd">{{ list.total_info.available }}</span>
          <span class="unit"> 개</span>
        </div>
        <div class="right">
          <h2 class="dt">만료임박 할인쿠폰</h2>
          <span class="dd">{{ list.total_info.remain_3days }}</span>
          <span class="unit"> 개</span>
        </div>
      </div>
    </section>
    <div>
      <router-link
        class="tab"
        :to="{
          query: {
            type: 'available',
            pageCurrent: 1,
          },
        }"
        ><span class="active_bar"></span>사용가능
      </router-link>
      <router-link
        :class="'tab'"
        :to="{
          query: {
            type: 'used',
            pageCurrent: 1,
          },
        }"
        ><span class="active_bar"></span>사용완료/기간만료</router-link
      >
    </div>
    <Tab :list="list"></Tab>
  </div>
</template>
<script>
  import BaseButton from "@/components/common/BaseButton.vue";
  import Tab from "@/components/coupon_manage/Tab.vue";

  export default {
    components: { BaseButton, Tab },
    data() {
      return { list: "", couponNumber: "" };
    },
    methods: {
      register() {
        if (this.couponNumber.trim().length == 0) {
          this.$noticeMessage("쿠폰번호를 입력해주세요.");
        } else {
          const data = {
            action: "coupon_regedit",
            coupon_number: this.couponNumber,
          };
          console.log(data);
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              this.getList();
            });
        }
      },
      getList() {
        const data = {
          action: "my_coupon_list",
          search_status: this.$route.query.type,
          current: this.$route.query.pageCurrent,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
          });
      },
    },
    watch: {
      $route(to, from) {
        if (to.query.type != from.query.type) {
          this.getList();
        }
      },
    },
    created() {
      this.getList();
    },
  };
</script>
<style scoped lang="scss">
  .coupon_manage {
    padding-bottom: 65px;
    section {
      padding: 4.445%;
      .register_line {
        .register_btn {
          border: 1px solid #707070;
          border-radius: 4px;
          height: 40px;
          font-size: 14px;
          outline: none;
          width: 78%;
          box-sizing: border-box;
          margin-right: 2%;
          padding-left: 10px;
          &::placeholder {
            color: #dbdbdb;
          }
        }
        ::v-deep .blue_btn {
          display: inline-block;
          width: 20%;
          button {
            height: 40px;
            line-height: 31px;
          }
        }
      }
      .coupon_info {
        padding: 10px;
        margin-top: 10px;
        border: 1px solid #333333;
        border-radius: 4px;

        .left,
        .right {
          text-align: center;
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          .dt {
            font-size: 12px;
            color: #999999;
          }
          .dd {
            font-size: 16px;
          }
        }
        .left {
          border-right: 1px solid #333333;
        }
      }
    }

    .tab {
      font-size: 16px;
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
    .router-link-exact-active {
      color: black;
      background: #ffffff;
      .active_bar {
        background: #114fff;
      }
    }
  }
</style>
