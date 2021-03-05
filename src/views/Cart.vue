<template>
  <div v-if="list" id="cart">
    <h2 class="h2_title">강의바구니</h2>
    <LectureCourseList
      v-for="(li, index) in [...list.courses, ...list.sessions]"
      :key="'강의바구니' + index"
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
          @click="
            $router.push({
              path: li.type == 'course' ? '/lecDetail' : '/courseDetail',
              query: { id: li.item_id },
            })
          "
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
              >수강기한 : {{ li.access_limit }}</span
            >
            <span class="limit" v-else>{{ li.first_course }}</span>
          </div>
        </div>
        <div class="chk">
          <CheckBox>
            <input
              type="checkbox"
              v-model="checked_list"
              slot="check"
              :value="li"
              @change="partial_check(li)"
          /></CheckBox>
        </div>
      </template>
      <template slot="list_info">
        <BaseButton class="right" @click.native="cartRemove([li])">
          <button slot="blue_btn">
            삭제
          </button>
        </BaseButton>
      </template>
    </LectureCourseList>
    <Row v-if="list.calculate_price">
      <template slot="row">
        <div class="row order">
          <span class="dt">주문시 금액</span>
        </div>

        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd">{{ format_sum_original }}원</span>
        </div>
        <div class="row line">
          <span class="dt">할인 금액</span>
          <span class="dd">{{ format_sum_discount }}원</span>
        </div>
        <div class="row amount">
          <span class="dt">총 결제 금액</span>
          <span class="dd">원</span>
          <span class="dd status">{{ format_sum_final }}</span>
        </div>
      </template>
    </Row>
    <div class="btn_wrap" v-if="list.calculate_price">
      <div class="chk">
        <CheckBox>
          <input
            type="checkbox"
            @click="all_check()"
            @change="all()"
            v-model="allCheck"
            slot="check"
        /></CheckBox>
      </div>
      <BaseButton class="left" @click.native="cartRemove(checked_list)">
        <button slot="blue_btn">
          선택 삭제
        </button>
      </BaseButton>
      <BaseButton class="right" @click.native="goToOrder()">
        <button slot="blue_btn">
          구매하기
        </button>
      </BaseButton>
    </div>
  </div>
</template>
<script>
  import Row from "@/components/common/Row.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BaseButton from "@/components/common/BaseButton.vue";
  import LectureCourseList from "@/components/common/LectureCourseList.vue";

  export default {
    components: { Row, CheckBox, BaseButton, LectureCourseList },
    data() {
      return {
        list: "",
        checked_list: [],
        allCheck: false,
      };
    },
    computed: {
      // 강의 비용
      format_sum_original: {
        get() {
          return this.list.calculate_price.sum_original
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        set(value) {
          console.log(value);
          if (value.type == "all") {
            this.list.calculate_price.sum_original = value.price.original;
          } else {
            if (this.checked_list.indexOf(value) >= 0) {
              this.list.calculate_price.sum_original =
                this.list.calculate_price.sum_original + value.price.original;
            } else {
              this.list.calculate_price.sum_original =
                this.list.calculate_price.sum_original - value.price.original;
            }
          }
        },
      },
      // 할인 금액
      format_sum_discount: {
        get() {
          return this.list.calculate_price.sum_discount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        set(value) {
          if (value.info.length == 0) {
            this.list.calculate_price.sum_discount = 0;
          } else {
            console.log(this.format_sum_original.replace(/,/g, ""), value);
            this.list.calculate_price.sum_discount =
              this.format_sum_original.replace(/,/g, "") - value.sum;
          }
        },
      },
      // 총금액
      format_sum_final() {
        console.log(this.list.calculate_price.format_purchased_price);
        return this.$numberWithCommas(
          this.format_sum_original.replace(/,/g, "") -
            this.format_sum_discount.replace(/,/g, "") -
            this.list.calculate_price.format_purchased_price.replace(/,/g, "")
        );
      },
    },
    methods: {
      all() {
        let allList = [...this.list.courses, ...this.list.sessions];
        if (this.allCheck == false) {
          allList = [];
        }
        console.log(allList);
        const originalSum = allList.reduce((acc, current) => {
          return (acc += current.price.original);
        }, 0);
        const finalSum = allList.reduce((acc, current) => {
          return (acc += current.price.final);
        }, 0);
        this.format_sum_original = {
          type: "all",
          price: {
            original: originalSum,
          },
        };
        this.format_sum_discount = { info: allList, sum: finalSum };
      },
      // 전체체크
      all_check() {
        this.allCheck = !this.allCheck;
        if (this.allCheck) {
          this.checked_list = [...this.list.courses, ...this.list.sessions];
        } else {
          this.checked_list = [];
        }
      },
      // 부분체크
      partial_check(info) {
        console.log(this.checked_list);
        const sum = this.checked_list.reduce((acc, current) => {
          return (acc += current.price.final);
        }, 0);
        console.log(sum);
        this.format_sum_original = info;
        this.format_sum_discount = { info: info, sum: sum };
        if (
          this.list.courses.length + this.list.sessions.length !=
          this.checked_list.length
        ) {
          this.allCheck = false;
        } else {
          this.allCheck = true;
        }
      },
      goToOrder() {
        const map = this.checked_list.map((el) => {
          return el.type + "_" + el.item_id;
        });
        const data = {
          action: "check_cart_items",
          cart_items: map,
        };
        if (map.length == 0) {
          this.$noticeMessage("구매할 강의를 선택해주세요.");
        } else {
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              if (result.data.data.result) {
                this.$router.push({
                  path: "/order",
                  query: {
                    cart_id: this.checked_list.map((el) => el.cart_id),
                  },
                });
              }
            })
            .catch((err) => {
              this.$noticeMessage(
                "선택된 코스 및 강의가 중복돼 구매 진행이 불가하니 확인해 주세요."
              );
            });
        }
      },
      cartRemove(id) {
        if (id.length == 0) {
          this.$noticeMessage("삭제할 강의를 선택해주세요.");
        } else {
          const data = {
            action: "delete_cart",
            cart_id: id.map((el) => {
              return el.cart_id;
            }),
          };
          console.log(data);
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              this.getList().then((result) => {
                //삭제할 인덱스 찾기
                if (id.length == 1) {
                  const filter = this.checked_list.findIndex((el) => {
                    return el.cart_id == data.cart_id;
                  });
                  if (filter != -1) {
                    const removeChecked = this.checked_list.splice(filter, 1);
                  }
                } else {
                  this.checked_list = [];
                }
                if (this.checked_list.length == 0) {
                  this.all();
                }
                if (
                  this.list.courses.length + this.list.sessions.length !=
                  this.checked_list.length
                ) {
                  this.allCheck = false;
                } else {
                  this.allCheck = true;
                }
              });
            });
        }
      },
      getList() {
        const data = {
          action: "cart_list",
        };
        return this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
            return true;
          });
      },
    },
    created() {
      this.getList(this.$route.query.pageCurrent).then((result) => {
        console.log(result);
        this.all_check();
      });
    },
  };
</script>
<style scoped lang="scss">
  .h2_title {
    font-size: 18px;
    padding: 16px;
    border-bottom: 4px solid #f8f8f8;
  }
  .h3_title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  ::v-deep .list_wrap {
    padding: 16px;
    border-bottom: 4px solid #f8f8f8;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .list_left {
      width: 35%;
    }
    .list_right {
      width: 65%;
      padding: 0 10px;
      .center,
      .chk {
        display: inline-block;
      }
      .center {
        width: 80%;
      }
      .chk {
        width: 20%;
        position: relative;
        display: inline-block;
        text-align: right;
        vertical-align: top;
        .container-checkbox {
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
    padding: 16px;
    border-bottom: 4px solid #f8f8f8;
    .line {
      border-bottom: 1px solid black;
      padding-bottom: 10px;
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
    margin-top: 15px;
    padding: 0 16px;
    padding-bottom: 40px;
    .chk {
      width: 14%;
      display: inline-block;
      position: relative;
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
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .blue_btn {
      width: 42%;
      button {
        height: 40px;
        line-height: 28px;
        font-size: 18px;
        font-family: unset;
      }
    }
    .left {
      display: inline-block;
      vertical-align: middle;
      margin-right: 2%;
      button {
        background: #dbdbdb;
        color: white;
        border: 1px solid #dbdbdb;
      }
    }
    .right {
      display: inline-block;
      vertical-align: middle;
      button {
        background: #114fff;
        color: white;
      }
    }
  }
</style>
