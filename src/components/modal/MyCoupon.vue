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
              <span class="date" v-if="li.limit_type == 'date'"
                >{{ li.limit_date }}일까지</span
              >
              <span class="date" v-else
                >발급일로부터 {{ li.limit_date }}일</span
              >
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
      <Pagination>
        <template slot="paging">
          <li
            class="prev"
            @click="getList(Number(current) - 1)"
            v-if="current > 1"
          >
            이전페이지
          </li>
          <li
            class="next"
            v-if="list.total_page != current && list.total_page > 1"
            @click="getList(Number(current) + 1)"
          >
            다음페이지
          </li>
        </template>
      </Pagination>
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
import Pagination from "@/components/common/Pagination.vue";

export default {
  components: { CheckBox, BaseButton, Pagination },
  data() {
    return { list: "", checked_list: [], current: "" };
  },
  methods: {
    close() {
      this.$emit("emitCloseModal");
    },
    getList(num) {
      const data = {
        action: "my_coupon_list",
        search_status: "available",
        current: num
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log(result);
          this.list = result.data.data;
          this.current = num;
        });
    }
  },
  created() {
    this.getList(1);
  }
};
</script>
<style scoped lang="scss">
.mask {
  .coupon_modal {
    background: white;
    max-width: 720px;
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
      margin-top: 30px;
      .coupon {
        border-top: 1px solid #333333;
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .left {
          display: inline-block;
          padding: 10px 0;
          width: 86%;
          box-sizing: border-box;
          vertical-align: middle;
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
      }
    }
    .btn_wrap {
      margin-top: 20px;
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
