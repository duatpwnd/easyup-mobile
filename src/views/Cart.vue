<template>
  <div v-if="list" id="cart">
    <h2 class="h2_title">강의바구니</h2>
    <LectureCourseList
      v-for="(li, index) in list.list"
      :key="'강의바구니' + index"
    >
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
        <div class="chk">
          <CheckBox>
            <input
              type="checkbox"
              v-model="checked_list"
              slot="check"
              :value="li.id"
              @change="partial_check()"
          /></CheckBox>
        </div>
      </template>
      <template slot="list_info">
        <BaseButton class="right" @click.native="cartRemove([li.id])">
          <button slot="blue_btn">
            삭제
          </button>
        </BaseButton>
      </template>
    </LectureCourseList>
    <Row>
      <template slot="row">
        <div class="row order">
          <span class="dt">주문시 금액</span>
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
        <div class="row line">
          <span class="dt">할인 금액</span>
          <span class="dd"
            >{{
              list.price.discount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row amount">
          <span class="dt">총 결제 금액</span>
          <span class="dd">원</span>
          <span class="dd status">{{
            list.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span>
        </div>
      </template>
    </Row>
    <div class="btn_wrap">
      <div class="chk">
        <CheckBox>
          <input
            type="checkbox"
            @click="all_check()"
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
    methods: {
      goToOrder() {
        if (this.checked_list.length == 0) {
          this.list.list.forEach((el, index) => {
            this.checked_list.push(el.id);
          });
        }
        this.$router.push({
          path: "/order",
          query: {
            cart_id: this.checked_list.toString(),
          },
        });
      },
      cartRemove(id) {
        if (id.length == 0) {
          this.$noticeMessage("삭제할 강의를 선택해주세요.");
        } else {
          const data = {
            action: "delete_cart",
            cart_id: id,
          };
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              this.getList();
            });
        }
      },
      all_check() {
        this.allCheck = !this.allCheck;
        if (this.allCheck) {
          console.log(this.list.list);
          this.list.list.forEach((el, index) => {
            this.checked_list.push(el.id);
          });
        } else {
          this.checked_list = [];
        }
      },
      // 부분체크
      partial_check() {
        if (this.list.list.length != this.checked_list.length) {
          this.allCheck = false;
        } else {
          this.allCheck = true;
        }
      },
      getList() {
        const data = {
          action: "cart_list",
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
      this.getList(this.$route.query.pageCurrent);
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
    padding: 4.445%;
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
    padding: 0 4.445%;
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
