<template>
  <div class="register">
    <ConfirmModal @ok="register" v-if="toggleStore_confirmModal"></ConfirmModal>
    <h2 class="h2_tutle">쿠폰 등록</h2>
    <form class="form">
      <legend>회원가입</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="coupon_name">쿠폰명</label>
          <input type="text" id="coupon_name" v-model="name" />
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
                  value="percent"
                  v-model="discount_type"
                  id="discount_percent"
                />
              </BaseRadioBox>
              <label class="common_label" for="discount_percent">할인률</label>
              <input
                type="number"
                max="98"
                v-model="percent_enter"
                @input="limit"
              /><span class="unit">%</span>
            </div>
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  value="price"
                  name="coupon_benefit"
                  v-model="discount_type"
                  id="price"
                />
              </BaseRadioBox>
              <label for="price" class="common_label">금액</label>
              <input type="number" v-model="price_enter" @input="limit" /><span
                class="unit"
                >원</span
              >
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
                  v-model="limit_type"
                  slot="radio"
                  name="validity"
                  value="date"
                />
              </BaseRadioBox>
              <DatePicker @emitDatePick="datePick"></DatePicker>
            </div>
            <div class="dd_line">
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  value="days"
                  name="validity"
                  id="issue_date"
                  v-model="limit_type"
                />
              </BaseRadioBox>
              <label for="issue_date" class="common_label">발급일</label>
              <input type="number" v-model="limit_date" @input="limit" /><span
                class="unit"
                >일</span
              >
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
                  value=""
                  v-model="quantity"
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
                  name="quantity_limit"
                  v-model="quantity"
                  id="quantity_limit"
                />
              </BaseRadioBox>
              <label for="quantity_limit" class="common_label">수량제한</label>
              <input type="text" v-model="quantity_count" @input="limit" /><span
                class="unit"
                >개</span
              >
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
                  value="ing"
                  v-model="state"
                  id="issuing"
                />
              </BaseRadioBox>
              <label class="common_label " for="issuing">발급중</label>
              <BaseRadioBox>
                <input
                  type="radio"
                  slot="radio"
                  name="issue_status"
                  value="end"
                  v-model="state"
                  id="end"
                />
              </BaseRadioBox>
              <label class="common_label " for="end">종료</label>
            </div>
          </div>
        </div>
        <div class="btn_wrap">
          <BlueBtn class="left" @click.native="isRegister()">
            <button slot="blue_btn" type="button">
              등록
            </button>
          </BlueBtn>
          <BlueBtn
            class="right"
            @click.native="
              $router.push({
                path: '/couponManageTeacher/list',
                query: {
                  order: '',
                  pageCurrent: 1,
                  keyword: '',
                },
              })
            "
          >
            <button slot="blue_btn" type="button">
              취소
            </button>
          </BlueBtn>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import BaseRadioBox from "@/components/common/BaseRadioBox.vue";
  import DatePicker from "@/components/common/DatePicker.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { mapState, mapMutations } from "vuex";

  export default {
    components: { BlueBtn, DatePicker, BaseRadioBox, ConfirmModal },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
    data() {
      return {
        name: "", // 쿠폰명
        discount_type: "percent", // 할인률인지 금액인지
        percent_enter: "", // 퍼센트금액
        price_enter: "", // 금액
        limit_type: "date", // 유효기간
        limit_date: "",
        limit_start_date: "",
        limit_end_date: "",
        issue_date: "1",
        quantity: "",
        quantity_count: "",
        state: "ing",
      };
    },
    methods: {
      limit(event) {
        const unit = event.target.nextElementSibling.innerText;
        const value = event.target.value;
        if (value >= 98 && unit == "%") {
          this.percent_enter = "";
        } else if (value < 1 && unit == "%") {
          this.percent_enter = "";
        } else if (value < 1 && unit == "원") {
          this.price_enter = "";
        } else if (value < 1 && unit == "일") {
          this.limit_date = "";
        } else if (value < 1 && unit == "개") {
          this.quantity_count = "";
        }
      },
      datePick(result) {
        console.log(this.$dateFormat(result[0]));
        this.limit_start_date = this.$dateFormat(result[0]);
        this.limit_end_date = this.$dateFormat(result[1]);
      },
      isRegister() {
        this.$confirmMessage("쿠폰을 발급 하시겠습니까?");
      },
      register() {
        const data = {
          action: "add_coupon",
          name: this.name,
          c_id: 61,
          discount_type: this.discount_type,
          discount_price:
            this.discount_type == "percent"
              ? this.percent_enter
              : this.price_enter,
          limit_type: this.limit_type,
          quantity: this.quantity == "" ? "" : this.quantity_count,
          state: this.state,
        };
        if (this.limit_type == "days") {
          data["limit_date"] = this.limit_date;
        } else {
          data["limit_start_date"] = this.limit_start_date;
          data["limit_end_date"] = this.limit_end_date;
        }
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.$noticeMessage("쿠폰이 발급 되었습니다.");
          });
      },
      getMyCourse() {
        const data = {
          action: "get_my_course_teacher",
          search_status: "active",
          keyword: "",
          return_type: "simple",
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
          });
      },
    },
    created() {
      this.getMyCourse();
    },
  };
</script>
<style scoped lang="scss">
  .register {
    padding: 4.445%;
    padding-bottom: 65px;
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
              margin-right: 1%;
            }
            .common_label {
              width: 25%;
              margin-right: 1%;
              line-height: 29px;
              display: inline-block;
              font-family: unset;
            }

            input {
              width: 48%;
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
              width: 83%;
              box-sizing: border-box;
              vertical-align: middle;
              display: inline-block;
              .mx-input-wrapper {
                .mx-input {
                  height: 28px;
                  line-height: 13px;
                  width: 87%;
                  font-size: 12px;

                  border-right: 1px solid #ccc;
                  color: #333333;
                  &::placeholder {
                    color: #333333;
                  }
                }
                .mx-icon-calendar {
                  width: 13%;
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
