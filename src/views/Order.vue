<template>
  <div v-if="list">
    <MyCoupon v-show="modal" @emitCloseModal="close()"></MyCoupon>
    <h2 class="h2_title">결제하기</h2>
    <LectureCourseList
      v-for="(li, index) in [...list.info.course, ...list.info.session]"
      :key="'강의' + index"
    >
      <template slot="title">
        <h3 class="h3_title" v-if="li.type == 'course'">강의</h3>
        <h3 class="h3_title" v-else>코스</h3>
      </template>
      <template slot="thumbnail">
        <img
          :src="li.thumbnail"
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
            <del
              class="final_price"
              v-if="li.price.format_original != li.price.format_final"
              >{{ li.price.format_original }}</del
            >
            <span class="ori_price">{{ li.price.format_final }}</span>
          </div>
          <div>
            <span class="limit" v-if="li.type == 'course'"
              >수강기한 : {{ li.access_string }}</span
            >
            <span class="limit" v-else>{{ li.first_course }}</span>
          </div>
        </div>
      </template>
      <!-- <template slot="list_info">
        <BaseButton class="right">
          <button slot="blue_btn">
            삭제
          </button>
        </BaseButton>
      </template> -->
    </LectureCourseList>
    <Row>
      <template slot="row">
        <div class="row order">
          <span class="dt">결제 금액</span>
        </div>
        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd"
            >{{ list.info.calculate_price_info.format_sum_original }}원</span
          >
        </div>
        <div class="row ">
          <span class="dt">강의 할인</span>
          <span class="dd"
            >{{
              list.info.calculate_price_info.format_sum_discount_course
            }}원</span
          >
        </div>
        <div class="row ">
          <span class="dt">코스 할인</span>
          <span class="dd"
            >{{
              list.info.calculate_price_info.format_sum_discount_session
            }}원</span
          >
        </div>
        <!-- <div class="row line contain_btn">
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
        </div> -->
        <div class="row amount">
          <span class="dt">최종 금액</span>
          <span class="dd">원</span>
          <span class="dd status">{{
            list.info.calculate_price_info.format_sum_final
          }}</span>
        </div>
      </template>
    </Row>

    <div class="btn_wrap">
      <h2>결제 수단</h2>
      <div class="payMethod">
        <BaseButton
          @click.native="payMethod = '1000000000'"
          :class="{ active: payMethod == '1000000000' }"
        >
          <button slot="blue_btn">
            카드결제(간편결제)
          </button>
        </BaseButton>
        <BaseButton
          @click.native="payMethod = '0100000000'"
          :class="{ active: payMethod == '0100000000' }"
        >
          <button slot="blue_btn">
            무통장 입금
          </button>
        </BaseButton>
        <BaseButton
          @click.native="payMethod = '0000010000'"
          :class="{ active: payMethod == '0000010000' }"
        >
          <button slot="blue_btn">
            휴대폰 결제
          </button>
        </BaseButton>
      </div>
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
    <div class="payMent">
      <BaseButton @click.native="_pay($refs.authFrmFrame.$el)">
        <button slot="blue_btn">
          결제하기
        </button>
      </BaseButton>
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
    <!-- 결제 Form -->
    <OrderForm
      v-show="formData"
      ref="authFrmFrame"
      v-model="payMethod"
      :info="list"
    ></OrderForm>
  </div>
</template>
<script lang="ts">
  import Row from "@/components/common/Row.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import LectureCourseList from "@/components/common/LectureCourseList.vue";
  import MyCoupon from "@/components/modal/MyCoupon.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import Policy from "@/views/Policy.vue";
  import Terms from "@/components/policy/Terms.vue";
  import Privacy from "@/components/policy/Privacy.vue";
  import OrderForm from "@/components/order/OrderForm.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      Policy,
      CheckBox,
      MyCoupon,
      Row,
      BaseButton,
      LectureCourseList,
      Terms,
      Privacy,
      OrderForm,
    },
  })
  export default class Order extends Vue {
    policyModal = false; // 약관동의 모달
    list = ""; // 결제할 리스트
    modal = false; // 쿠폰조회 모달
    isAgree = false; // 동의 여부
    isActive = 0;
    type = "Terms";
    types = [
      { name: "이용약관", target: "Terms" },
      { name: "개인정보 취급방침", target: "Privacy" },
    ];
    payMethod = "1000000000"; // 결제수단
    formData = false; //form 가리기
    toggle(type: string, index: number): void {
      this.type = type;
      this.isActive = index;
    }
    close(): void {
      this.modal = false;
    }
    getList(): void {
      interface ReqData {
        action: string;
        type: string;
        code: number;
        items: number[];
      }
      let data: Omit<ReqData, "items"> | Omit<ReqData, "type" | "code">;
      // 강의 상세에서 들어온경우
      if (this.$route.query.type != undefined) {
        data = {
          action: "get_order_item_code",
          type: this.$route.query.type as string,
          code: (this.$route.query.cart_id as unknown) as number,
        };
      } else {
        // 강의 바구니에서 들어온경우
        data = {
          action: "get_order_item_cart",
          items: ([...this.$route.query.cart_id] as unknown) as number[],
        };
      }
      console.log("결제하기 리스트 데이터:", data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log("결제하기 리스트 결과:", result);
          this.list = result.data.data;
        });
    }
    _pay(_frm): void {
      if (this.isAgree == false) {
        this.$noticeMessage(
          "구매조건 확인 및 결제대행 서비스 약관에 동의해주세요"
        );
      } else {
        // sndReply는 kspay_wh_rcv.php (결제승인 후 결과값들을 본창의 KSPayWeb Form에 넘겨주는 페이지)의 절대경로를 넣어줍니다.
        _frm.sndReply.value = `${process.env.VUE_APP_API_URL}/main/order/mobile_order_result.php`;
        const agent: string = navigator.userAgent;
        const midx: number = agent.indexOf("MSIE");
        const out_size = midx != -1 && agent.charAt(midx + 5) < "7";
        //_frm.target = '_blank';
        _frm.action =
          "https://kspay.ksnet.to/store/KSPayMobileV1.4/KSPayPWeb.jsp"; //리얼
        //_frm.action ='http://210.181.28.134/store/KSPayMobileV1.4/KSPayPWeb.jsp';  //테스트
        _frm.submit();
      }
    }

    created() {
      this.getList();
    }
  }
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
    .list_right {
      padding: 0 10px;
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
    .payMethod {
      .blue_btn {
        display: inline-block;
        width: 32.666%;
        &:not(:last-child) {
          margin-right: 1%;
        }
        button {
          background: white;
          color: #114fff;
          height: 40px;
          line-height: 28px;
          font-size: 14px;
          font-family: unset;
        }
      }
      .active {
        button {
          background: #114fff;
          color: white;
        }
      }
    }
  }
  .payMent {
    padding: 4.445%;
    padding-bottom: 40px;
    .blue_btn {
      button {
        height: 40px;
        line-height: 28px;
        font-size: 18px;
        font-family: unset;
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
