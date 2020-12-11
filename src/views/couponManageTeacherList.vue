<template>
  <div class="counpon_list">
    <h2 class="h2_title">쿠폰 관리</h2>
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="">전체</option>
          <option value="course_name">강의명</option>
          <option value="section_name">섹션명</option>
          <option value="title">책갈피제목</option>
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
      <BlueBtn class="right">
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
            <span class="date">{{ li.limit_date }}</span>
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
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";

  export default {
    components: { BlueBtn, Search, CheckBox },
    data() {
      return {
        order: "",
        keyword: "",
        list: "",
        checked_list: [],
      };
    },
    methods: {
      getList() {
        const data = {
          action: "get_course_coupon_list",
          search_status: this.$route.query.order,
          current: this.$route.query.pageCurrent,
          keyword: this.$route.query.keyword,
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
  .counpon_list {
    padding: 4.445%;
    .h2_title {
      font-size: 18px;
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
        width: 8%;
        display: inline-block;
        position: relative;
        .container-checkbox {
          width: 100%;
        }
      }
      .right {
        display: inline-block;
        border: 1px solid #333333;

        box-sizing: border-box;
        width: 92%;
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
          line-height: 28px;
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
          }
          .end {
            color: #999999;
          }
          .modify,
          .list {
            width: 25%;
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
