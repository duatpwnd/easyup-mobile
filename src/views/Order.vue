<template>
  <div v-if="list">
    <MyCoupon v-show="modal" @emitCloseModal="close()"></MyCoupon>
    <h2 class="h2_title">결제하기</h2>
    <LectureCourseList v-for="(li, index) in list.list" :key="'강의' + index">
      <template slot="title">
        <h3 class="h3_title" v-if="li.type == 'course'">강의</h3>
        <h3 class="h3_title" v-else>코스</h3>
      </template>
      <template slot="thumbnail">
        <img
          src="http://develop.hell0world.net/courses/PY08/course-pic.png"
          class="thumb"
          :alt="li.title"
          :title="li.title"
        />
      </template>
      <template slot="info">
        <div class="center">
          <h2>
            {{ li.title }}
          </h2>
          <div class="price">
            <del class="final_price">{{
              li.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</del>
            <span class="ori_price">{{
              li.price.original.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span>
          </div>
          <div>
            <span class="limit">수강기한 : {{ li.access_limit }}</span>
          </div>
        </div>
      </template>
      <template slot="list_info">
        <BaseButton class="right">
          <button slot="blue_btn">
            삭제
          </button>
        </BaseButton>
      </template>
    </LectureCourseList>
    <Row>
      <template slot="row">
        <div class="row order">
          <span class="dt">결제 금액</span>
        </div>
        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd"
            >{{
              list.price.original
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row ">
          <span class="dt">강의 할인</span>
          <span class="dd"
            >-{{
              list.price.discount_course
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row ">
          <span class="dt">코스 할인</span>
          <span class="dd"
            >-{{
              list.price.discount_session
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row line contain_btn">
          <span class="dt">쿠폰 할인</span>
          <span class="dt">
            <BaseButton @click.native="modal = !modal">
              <button slot="blue_btn">
                쿠폰조회
              </button>
            </BaseButton>
          </span>
          <span class="dd">원</span>
          <span class="dd discount_coupon"
            >-{{
              list.price.discount_coupon
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</span
          >
        </div>
        <div class="row amount">
          <span class="dt">최종 금액</span>
          <span class="dd">원</span>
          <span class="dd status">{{
            list.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
      </template>
    </Row>
    <div class="btn_wrap">
      <h2>결제 수단</h2>
      <BaseButton>
        <button slot="blue_btn">
          신용카드
        </button>
      </BaseButton>
      <BaseButton>
        <button slot="blue_btn">
          계좌이체
        </button>
      </BaseButton>
      <BaseButton>
        <button slot="blue_btn">
          간편결제
        </button>
      </BaseButton>
      <BaseButton>
        <button slot="blue_btn">
          휴대폰결제
        </button>
      </BaseButton>
    </div>
    <div class="isAgree">
      <span class="chk">
        <CheckBox>
          <input type="checkbox" id="agree" v-model="isAgree" slot="check" />
        </CheckBox>
      </span>
      <label for="agree" class="notice"
        >구매조건 확인 및 결제대행 서비스 약관 동의</label
      >
      <span class="view" @click="policyModal = true">(보기)</span>
    </div>
    <div class="mask" v-if="policyModal">
      <div class="policy_wrap">
        <Policy>
          <template slot="tab">
            <span
              class="tab"
              v-for="(tab, index) in types"
              :class="{ active: index == isActive }"
              :key="index"
              @click="toggle(tab.target, index)"
              ><span class="active_bar"></span>{{ tab.name }}</span
            >
            <component v-bind:is="type"></component>
          </template>
        </Policy>
        <BaseButton class="close_btn" @click.native="policyModal = false">
          <button slot="blue_btn">
            닫기
          </button>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import MyCoupon from "@/components/modal/MyCoupon.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import Policy from "@/views/Policy.vue";
  import Terms from "@/components/policy/Terms.vue";
  import Privacy from "@/components/policy/Privacy.vue";
  export default {
    components: {
      Policy,
      CheckBox,
      MyCoupon,
      Row,
      BaseButton,
      LectureCourseList,
      Terms,
      Privacy,
    },
    data() {
      return {
        policyModal: false,
        list: "",
        modal: false,
        isAgree: false,
        isActive: 0,
        type: "Terms",
        types: [
          { name: "이용약관", target: "Terms" },
          { name: "개인정보 취급방침", target: "Privacy" },
        ],
      };
    },
    methods: {
      toggle(type, index) {
        this.type = type;
        this.isActive = index;
      },
      close() {
        this.modal = false;
      },
      getList() {
        const data = {
          action: "pay_step1",
          cart_id: this.$route.query.cart_id.split(","),
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
          });
      },
    },
    created() {
      this.getList();
    },
  };
</script>
<style scoped lang="scss">
  .h2_title {
    font-size: 18px;
    padding: 4.445%;
    border-bottom: 4px solid #f8f8f8;
  }
  .h3_title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  ::v-deep .list_wrap {
    padding: 4.445%;
    border-bottom: 4px solid #f8f8f8;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .list_left {
      width: 20%;
    }
    .list_right {
      width: 80%;
      padding-left: 0 10px;
    }
    .price {
      .final_price {
        font-size: 12px;
        color: #bdbdbd;
      }
      .ori_price {
        font-weight: bold;
        margin-left: 5px;
        font-size: 14px;
        color: #114fff;
      }
    }
    .limit {
      font-size: 12px;
      color: #999999;
    }
    .right {
      float: right;
      width: 20%;
      button {
        background: white;
        color: #114fff;
      }
    }
  }
  .li {
    padding: 4.445%;
    border-bottom: 4px solid #f8f8f8;
    .line {
      border-bottom: 1px solid black;
      padding-bottom: 10px;
      .discount_coupon {
        color: #ff114a;
      }
      .blue_btn {
        float: unset;
        width: 100%;
        margin-left: 10px;
        button {
          background: white;
          color: #114fff;
        }
      }
    }
    .order {
      .dt {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .amount {
      padding-top: 10px;
      .dt,
      .dd {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .btn_wrap {
    padding: 4.445%;
    h2 {
      font-size: 16px;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .blue_btn {
      display: inline-block;
      width: 24.25%;
      &:not(:last-child) {
        margin-right: 1%;
      }
      button {
        background: white;
        color: #114fff;
      }
    }
  }
  .isAgree {
    text-align: center;
    padding-bottom: 20px;
    .chk {
      display: inline-block;
      vertical-align: middle;
      ::v-deep .container-checkbox {
        position: unset;
        width: unset;
        height: 24px;
        display: inline-block;
        .checkmark {
          position: unset;
          width: 24px;
          display: inline-block;
          height: 24px;
          padding: 0;
          box-sizing: border-box;
        }
      }
    }
    .view,
    .notice {
      font-size: 14px;
    }
    .notice {
      margin-left: 10px;
    }
    .view {
      color: #114fff;
    }
  }
  .policy_wrap {
    position: fixed;
    width: 90%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: white;
    max-width: 720px;
    height: 70%;
    overflow: hidden;
    ::v-deep .policy {
      height: calc(100% - 60px);

      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
      }
      .tab {
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        box-sizing: border-box;
      }
      pre {
        height: calc(100% - 40px);
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
      }
    }
    ::v-deep .close_btn {
      margin-top: 20px;
      button {
        height: 40px;
        line-height: 31px;
        border-radius: 0;
        font-size: 18px;
      }
    }
  }
</style>
