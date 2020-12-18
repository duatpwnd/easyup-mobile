<template>
  <div class="detail_wrap" v-if="list">
    <ConfirmModal
      @ok="cancelLecture = true"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <CancelLecture
      v-if="cancelLecture"
      @emitClose="cancelLecture = false"
      :lecture_info="list.lecture_info"
    ></CancelLecture>
    <Row>
      <template slot="row">
        <div class="section">
          <div class="row">
            <h2 class="title">결제번호 {{ list.trans_id }}</h2>
          </div>
        </div>
        <!-- 구매자 정보 :: S -->
        <div class="section">
          <h2 class="title">구매자 정보</h2>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.name }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.email }}</span>
          </div>
          <div class="row">
            <span class="dt">{{ list.pay_user_info.phone }}</span>
          </div>
        </div>
        <!-- 구매자 정보 :: E -->

        <!-- 강의 정보 :: S -->
        <div class="section">
          <h2 class="title">강의 정보</h2>
          <div
            class="row"
            v-for="(li, index) in list.lecture_info"
            :key="index"
          >
            <span class="dt"
              ><span class="lec" v-if="li.type == 'course'">강의</span>
              <span class="course" v-else>코스</span>{{ li.title }}</span
            >
            <div class="clear_both">
              <span class="dt">{{ li.teacher_name }}</span>
              <del class="dt final_price">{{
                li.price.original
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</del>
              <span class="dt ori_price">{{
                li.price.discount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}</span>
            </div>
          </div>
        </div>
        <!-- 강의 정보 :: E -->

        <!-- 결제 정보 :: S -->
        <div class="section">
          <h2 class="title">결제 정보</h2>
          <div class="row">
            <span class="dt">
              {{ list.pay_info.pay_date.split(" ")[0] }}
            </span>
          </div>
          <div class="row">
            <span class="dt">
              결제수단
            </span>
            <span class="dd" v-if="list.pay_info.method == 'card'"
              >신용카드</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'transfer'"
              >계좌이체</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'simple'"
              >간편결제</span
            >
            <span class="dd" v-else-if="list.pay_info.method == 'phone'"
              >휴대폰</span
            >
          </div>
          <div class="row">
            <span class="dt">
              강의비용
            </span>
            <span class="dd">
              {{
                list.pay_info.price.original
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
          <div class="row">
            <span class="dt">
              패키지 할인
            </span>
            <span class="dd">
              {{
                list.pay_info.price.discount_pkg
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
          <div class="row">
            <span class="dt">
              쿠폰
            </span>
            <span class="dd">
              {{
                list.pay_info.price.discount_coupon
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
          <div class="row">
            <span class="dt">
              결제금액
            </span>
            <span class="dd">
              {{
                list.pay_info.price.final
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
        </div>
        <!-- 결제 정보 :: E -->

        <!-- 취소 요청 :: S -->
        <div class="section">
          <h2 class="title">취소 요청</h2>
        </div>
        <!-- 취소 요청 :: E -->

        <!-- 환불 계좌 :: S -->
        <div class="section">
          <h2 class="title">환불 계좌</h2>
          <div class="row">
            <span class="dt">예금주</span> <span class="dd">염세종</span>
          </div>
          <div class="row">
            <span class="dt">은행명</span> <span class="dd"> </span>
          </div>
          <div class="row">
            <span class="dt">계좌번호</span> <span class="dd"> </span>
          </div>
        </div>
        <!-- 환불 계좌 :: E -->

        <!-- 환불 정보 :: S -->
        <div class="section">
          <h2 class="title">환불 정보</h2>
          <div class="row">
            <span class="dt">
              {{ list.refund_info.refund_date.split(" ")[0] }}
            </span>
          </div>
          <div class="row">
            <span class="dt">공제 금액</span>
            <span class="dd">
              {{
                list.refund_info.penalty
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
          <div class="row">
            <span class="dt">환불 정보</span>
            <span class="dd">
              {{
                list.refund_info.refund_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}원
            </span>
          </div>
        </div>
        <!-- 환불 정보 :: E -->
      </template>
    </Row>
    <div class="btn_wrap">
      <BaseButton class="left">
        <button
          slot="blue_btn"
          v-if="list.cancel_btn_status == 'request'"
          @click="isCancel()"
        >
          취소 요청
        </button>
        <button
          slot="blue_btn"
          class="cancel_req_btn"
          v-else-if="list.cancel_btn_status == 'exceeded'"
        >
          취소 요청
        </button>
        <button slot="blue_btn" v-if="list.cancel_btn_status == 'ing'">
          취소 진행
        </button>
      </BaseButton>
      <BaseButton class="right">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/purchase/list',
              query: {
                keyword: '',
                pageCurrent: 1,
                order: '',
              },
            })
          "
        >
          목록
        </button>
      </BaseButton>
    </div>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import { mapState, mapMutations } from "vuex";
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import CancelLecture from "@/components/modal/CancelLecture.vue";
  export default {
    components: {
      CancelLecture,
      ConfirmModal,
      Row,
      BaseButton,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
    data() {
      return {
        list: "",
        cancelLecture: false,
      };
    },
    methods: {
      isCancel() {
        this.$confirmMessage(
          "구매하신 강의를 취소 하시겠습니까?<br>취소 신청 시 강의 시청이 불가 합니다."
        );
      },
      getList() {
        const data = {
          action: "order_info",
          trans_id: this.$route.query.trans_id,
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
  .detail_wrap {
    .section {
      padding: 4.445%;
      border-bottom: 4px solid #f8f8f8;
    }
    .clear_both {
      clear: both;
      line-height: 20px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .final_price {
        font-size: 14px;
        color: #bdbdbd;
        margin-left: 4px;
      }
      .ori_price {
        font-weight: bold;
        margin-left: 5px;
        font-size: 14px;
        color: #114fff;
      }
    }
    .btn_wrap {
      padding: 4.445%;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .blue_btn {
        width: 48%;
        button {
          height: 40px;
          line-height: 31px;
          font-size: 16px;
        }
      }
      .left {
        float: left;
      }
      .right {
        float: right;
        button {
          background: white;
          color: #114fff;
        }
      }
      .cancel_req_btn {
        border: 1px solid #dbdbdb;
        background: #dbdbdb;
        color: white;
      }
    }
  }
</style>
