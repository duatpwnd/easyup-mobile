<template>
  <div class="counpon_list">
    <ConfirmModal
      @ok="couponRemove"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <h2 class="h2_title">쿠폰 관리</h2>
    <div class="search_area">
      <Search>
        <select
          slot="option"
          class="select"
          v-model="order"
          @change="getList(1, order, keyword)"
        >
          <option value="">전체</option>
          <option value="ing">발급중</option>
          <option value="end">종료</option>
        </select>
        <input
          slot="slot_input"
          class="search_contents"
          placeholder="강의명을 검색하세요."
          :value="keyword"
          v-on:input="keyword = $event.target.value"
        />
        <button
          slot="search_btn"
          class="search_btn"
          @click="getList(1, order, keyword)"
        ></button>
      </Search>
    </div>
    <div class="btn_wrap">
      <BlueBtn
        class="left"
        @click.native="$router.push('/couponManageTeacher/register')"
      >
        <button slot="blue_btn">
          쿠폰 생성
        </button>
      </BlueBtn>
      <BlueBtn class="right" @click.native="isRemove()">
        <button slot="blue_btn">
          쿠폰 삭제
        </button>
      </BlueBtn>
    </div>
    <div class="coupon" v-for="(li, index) in list.list" :key="index">
      <div class="left">
        <CheckBox slot="checkbox">
          <input
            type="checkbox"
            :value="li.id"
            v-model="checked_list"
            slot="check"
        /></CheckBox>
      </div>
      <div class="right">
        <div class="top_section">
          <span class="title">{{ li.course_title }}</span>
          <div class="row1">
            <span class="name">{{ li.coupon_name }}</span>
          </div>
          <div class="row2">
            <span class="date" v-if="li.limit_type == 'date'"
              >{{ li.limit_date }}일까지</span
            >
            <span class="date" v-else>발급일로부터 {{ li.limit_date }}일</span>
          </div>
        </div>
        <div
          :class="['row3', li.status == 'ing' ? 'ing_line' : 'end_line']"
          :style="[{ background: li.status == 'ing' ? '#114FFF' : '#DBDBDB' }]"
        >
          <span v-if="li.status == 'ing'" class="status ing">발급 중</span>
          <span v-else-if="li.status == 'end'" class="status end">종료</span>
          <BlueBtn
            class="list"
            @click.native="
              $router.push({
                path: '/couponManageTeacher/detail',
                query: {
                  keyword: '',
                  pageCurrent: 1,
                  order: '',
                  start_date: $dateFormat(),
                  end_date: $dateFormat(),
                  c_id: li.id,
                  coupon_id: li.c_id,
                },
              })
            "
          >
            <button slot="blue_btn">
              내역 조회
            </button>
          </BlueBtn>
          <BlueBtn class="modify">
            <button slot="blue_btn">
              쿠폰 수정
            </button>
          </BlueBtn>
        </div>
      </div>
    </div>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList(Number(current) - 1, order, $route.query.keyword)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList(Number(current) + 1, order, $route.query.keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import Search from "@/components/common/Search.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: { BlueBtn, Search, CheckBox, ConfirmModal, Pagination },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
    data() {
      return {
        current: "",
        order: "",
        keyword: "",
        list: "",
        checked_list: [],
      };
    },
    methods: {
      isRemove() {
        this.$confirmMessage(
          "선택한 쿠폰을 삭제 하시겠습니까?<br>쿠폰을 삭제해도 사전에 발행된 쿠폰은 사용이<br> 가능하며 상세 내역 확인은 불가 합니다."
        );
      },
      couponRemove() {
        if (this.checked_list.length == 0) {
          this.$noticeMessage("삭제할 쿠폰을 선택해주세요.");
        } else {
          const data = {
            action: "delete_coupon",
            coupon_id: this.checked_list,
          };
          console.log(data);
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
              console.log(result);
              this.getList();
            });
        }
      },
      getList(num, order, keyword) {
        const data = {
          action: "get_course_coupon_list",
          search_status: order,
          current: num,
          keyword: keyword,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
            this.order = order;
            this.keyword = keyword;
            this.current = num;
            this.$router
              .push({
                query: {
                  order: order,
                  pageCurrent: num,
                  keyword: keyword,
                  view: this.$route.query.view,
                },
              })
              .catch(() => {});
          });
      },
    },
    created() {
      this.getList(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .counpon_list {
    padding: 0 16px 65px;
    margin-top: 13px;
    .h2_title {
      font-size: 18px;
      padding-bottom: 13px;
    }
    .btn_wrap {
      margin-top: 10px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .blue_btn {
        width: 48%;
        button {
          height: 40px;
          line-height: 28px;
          font-size: 18px;
          font-family: unset;
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
    .coupon {
      margin-top: 15px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .left {
        width: 15%;
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
      .right {
        display: inline-block;
        border: 1px solid #333333;
        vertical-align: middle;
        box-sizing: border-box;
        width: 85%;
        .top_section {
          padding: 10px;
          .title {
            font-size: 14px;
          }
          .row1 {
            .name {
              font-size: 12px;
            }
          }
          .row2 {
            .date {
              font-size: 12px;
              color: #999999;
            }
          }
        }

        .row3 {
          padding: 10px;
          &:after {
            display: block;
            content: "";
            clear: both;
          }
          .status {
            float: left;
            font-size: 16px;
          }
          .ing {
            color: white;
            font-family: unset;
            line-height: 28px;
          }
          .end {
            color: #999999;
          }
          .modify,
          .list {
            width: 26%;
            float: right;
            button {
              background: white;
              color: #114fff;
              border: 0;
              font-family: unset;
            }
          }
          .list {
            margin-left: 5px;
          }
        }
        .end_line {
          .list,
          .modify {
            button {
              color: #666666;
            }
          }
        }
      }
    }
  }
</style>
