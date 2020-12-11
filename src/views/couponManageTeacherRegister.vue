<template>
  <div class="register">
    <h2 class="h2_tutle">쿠폰 등록</h2>
    <form class="form">
      <legend>회원가입</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="coupon_name">쿠폰명</label>
          <input type="text" id="coupon_name" />
        </div>
        <div class="row">
          <label class="dt">강의</label>
          <select>
            <option value="all">강의를 선택해 주세요.</option>
            <option value="info">회원정보</option>
            <option value="regist">강의/코스 등록</option>
            <option value="subscribe">강의/코스 구독</option>
            <option value="player">강의시청</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div class="row">
          <label class="dt benefit_title">쿠폰 혜택</label>
          <div class="dd">
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  name="coupon_benefit"
                  value="1"
                  v-model="coupon_benefit"
                  id="discount_percent"
                />
              </BaseRadioBox>
              <label class="common_label" for="discount_percent">할인률</label>
              <input type="text" /><span class="unit">%</span>
            </div>
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  value="2"
                  name="coupon_benefit"
                  v-model="coupon_benefit"
                  id="price"
                />
              </BaseRadioBox>
              <label for="price" class="common_label">금액</label>
              <input type="text" /><span class="unit">원</span>
            </div>
          </div>
        </div>

        <div class="row">
          <label class="dt">휴대폰</label>
          <input type="tell" id="phone" />
        </div>

        <div class="btn_wrap">
          <BlueBtn class="left">
            <button slot="blue_btn">
              등록
            </button>
          </BlueBtn>
          <BlueBtn class="right">
            <button slot="blue_btn">
              취소
            </button>
          </BlueBtn>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";
  import BaseRadioBox from "@/components/common/BaseRadioBox.vue";
  export default {
    components: { BlueBtn, BaseRadioBox },
    data() {
      return {
        coupon_benefit: "1",
      };
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .register {
    padding: 4.445%;
    .h2_title {
      font-size: 18px;
    }
    .form {
      margin-top: 10px;
      .row {
        margin-top: 10px;

        input,
        select {
          font-family: "NotoSansCJKkr-Regular";
          font-size: 14px;
          width: calc(100% - 35%);
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          padding: 5px 6px;
          height: 28px;
          line-height: 13px;
          box-sizing: border-box;
        }
        select {
          background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat
            95% center / 7px 5px;
        }

        .dt {
          width: 35%;
          display: inline-block;
          font-size: 14px;
          font-family: "NotoSansCJKkr-Regular";
        }
        .benefit_title {
          vertical-align: top;
        }
        .dd {
          font-size: 14px;
          width: calc(100% - 35%);
          display: inline-block;
          vertical-align: middle;

          .dd_line {
            display: flex;
            line-height: 29px;
            justify-content: space-between;
            &:not(:first-child) {
              margin-top: 5px;
            }
            .container-radiobox {
              width: 5%;
            }
            .common_label {
              margin-left: 5px;
              width: 20%;
            }
            input {
              vertical-align: middle;
              width: 50%;
            }
            .unit {
              vertical-align: middle;
            }
          }
        }
      }
      .btn_wrap {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
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
      }
    }
  }
</style>
