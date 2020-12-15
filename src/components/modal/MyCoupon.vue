<template>
  <div class="mask">
    <div class="coupon_modal">
      <h2 class="h2_title">내 쿠폰</h2>
      <input
        type="text"
        placeholder="쿠폰번호를 입력해 주세요."
        class="register"
      />
      <BaseButton>
        <button slot="blue_btn">
          쿠폰 등록
        </button>
      </BaseButton>
      <div class="coupon_wrap">
        <div class="coupon" v-for="(li, index) in list.list" :key="index">
          <div class="left">
            <div class="row1">
              <span class="name">{{ li.coupon_name }}</span>
            </div>
            <div class="row2">
              <span class="date">{{ li.limit_date }}</span>
            </div>
          </div>
          <div class="right">
            <CheckBox>
              <input
                type="checkbox"
                v-model="checked_list"
                slot="check"
                :value="li.id"
            /></CheckBox>
          </div>
        </div>
      </div>
      <div class="btn_wrap">
        <BaseButton>
          <button class="confirm_ok" slot="blue_btn" @click="confirmOk()">
            적용
          </button>
        </BaseButton>
        <BaseButton>
          <button class="cancel" slot="blue_btn" @click="close()">취소</button>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseButton from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";

  export default {
    components: { CheckBox, BaseButton },
    data() {
      return { list: "", checked_list: [] };
    },
    methods: {
      close() {
        this.$emit("emitCloseModal");
      },
      getList() {
        const data = {
          action: "my_coupon_list",
          search_status: "available",
          current: 1,
        };
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
  .mask {
    .coupon_modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 90%;
      height: 90%;
      max-width: 720px;
      background: white;
      padding: 4.445%;
      box-sizing: border-box;
      .h2_title {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .register {
        border: 1px solid #707070;
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        font-size: 14px;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
      }
      .blue_btn {
        button {
          height: 40px;
          line-height: 31px;
          font-size: 16px;
        }
      }
      .coupon_wrap {
        margin-top: 20px;
        .coupon {
          border-top: 1px solid #333333;
          &:after {
            display: block;
            content: "";
            clear: both;
          }
          .left {
            float: left;
            padding: 10px 0;
            width: 86%;
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
            width: 14%;
            text-align: right;
            float: right;
            position: relative;
            line-height: 50px;
            ::v-deep .container-checkbox {
              position: unset;
              .checkmark {
                position: unset;
                padding: 2% 22%;
              }
            }
          }
        }
      }
      .btn_wrap {
        position: absolute;
        bottom: 15px;
        width: 90%;
        max-width: 720px;
        margin: 0 auto;
        box-sizing: border-box;
        .blue_btn {
          text-align: center;
          width: 50%;
          display: inline-block;
          .confirm_ok,
          .cancel {
            width: 90%;
          }
          .cancel {
            background: #ccc;
            border: 2px solid #ccc;
          }
        }
      }
    }
  }
</style>
