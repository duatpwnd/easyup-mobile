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
          <label class="dt row_title">쿠폰 혜택</label>
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
          <label class="dt row_title">유효 기간</label>
          <div class="dd">
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  v-model="issue_date"
                  slot="radio"
                  name="validity"
                  value="1"
                />
              </BaseRadioBox>
              <DatePicker></DatePicker>
            </div>
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  value="2"
                  name="validity"
                  id="issue_date"
                  v-model="issue_date"
                />
              </BaseRadioBox>
              <label for="issue_date" class="common_label">발급일</label>
              <input type="text" /><span class="unit">일</span>
            </div>
          </div>
        </div>
        <div class="row">
          <label class="dt row_title">수량</label>
          <div class="dd">
            <div class="dd_line quantity_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  name="quantity_limit"
                  value="1"
                  v-model="quantity_limit"
                  id="discount_percent"
                />
              </BaseRadioBox>
              <label class="common_label infinite_label" for="infinite"
                >무제한</label
              >
            </div>
            <div class="dd_line ">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  value="2"
                  name="quantity_limit"
                  v-model="quantity_limit"
                  id="quantity_limit"
                />
              </BaseRadioBox>
              <label for="quantity_limit" class="common_label">수량제한</label>
              <input type="text" /><span class="unit">개</span>
            </div>
          </div>
        </div>
        <div class="row">
          <label class="dt row_title">발급 상태</label>
          <div class="dd">
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  name="issue_status"
                  value="1"
                  v-model="issue_status"
                  id="issuing"
                />
              </BaseRadioBox>
              <label class="common_label " for="issuing">발급중</label>
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  name="issue_status"
                  value="2"
                  v-model="issue_status"
                  id="end"
                />
              </BaseRadioBox>
              <label class="common_label " for="end">종료</label>
            </div>
          </div>
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
  import DatePicker from "@/components/common/DatePicker.vue";

  export default {
    components: { BlueBtn, DatePicker, BaseRadioBox },
    data() {
      return {
        coupon_benefit: "1",
        issue_date: "1",
        quantity_limit: "1",
        issue_status: "1",
      };
    },
    methods: {
      datePick(result) {
        console.log(result);
      },
    },
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
          width: calc(100% - 30%);
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          padding: 5px 6px;
          height: 40px;
          line-height: 28px;
          box-sizing: border-box;
          vertical-align: middle;
        }
        select {
          background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat
            95% center / 7px 5px;
        }

        .dt {
          width: 30%;
          display: inline-block;
          font-size: 14px;
          font-family: "NotoSansCJKkr-Regular";
          vertical-align: middle;
        }
        .row_title {
          vertical-align: top;
        }
        .dd {
          font-size: 14px;
          width: calc(100% - 30%);
          display: inline-block;
          vertical-align: middle;

          .dd_line {
            &:not(:first-child) {
              margin-top: 5px;
            }
            .container-radiobox {
              width: 15%;
            }
            .common_label {
              width: 25%;
              line-height: 29px;
              display: inline-block;
            }

            input {
              width: 50%;
            }
            .unit {
              vertical-align: middle;
              line-height: 29px;
              width: 10%;
              text-align: center;
              display: inline-block;
            }
            ::v-deep .box {
              margin-top: 0;
              border: 1px solid #ccc;
              border-radius: 4px;
              overflow: hidden;
              width: 85%;
              box-sizing: border-box;
              vertical-align: middle;
              display: inline-block;
              .mx-input-wrapper {
                .mx-input {
                  height: 28px;
                  line-height: 13px;
                  width: 85%;
                  font-size: 12px;
                  border-right: 1px solid #ccc;
                  color: #333333;
                  &::placeholder {
                    color: #333333;
                  }
                }
                .mx-icon-calendar {
                  width: 15%;
                }
              }
            }
          }
        }
      }
      .btn_wrap {
        margin-top: 25px;
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .blue_btn {
          width: 48%;
          button {
            height: 40px;
            font-family: unset;
            line-height: 28px;
            font-size: 18px;
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
      }
    }
  }
</style>
