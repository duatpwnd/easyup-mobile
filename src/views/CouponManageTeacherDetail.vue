<template>
  <div class="coupon_detail" v-if="list">
    <h2 class="h2_title">쿠폰 내역</h2>
    <div class="filter">
      <DatePicker @emitDatePick="datePick"></DatePicker>
      <div class="search_area">
        <div class="chk">
          <CheckBox
            @change.native="getList(1, order == true ? 'use' : '', keyword)"
          >
            <input type="checkbox" value="use" v-model="order" slot="check"
          /></CheckBox>
          <label class="isuse">사용</label>
        </div>
        <Search>
          <input
            slot="slot_input"
            class="search_contents"
            placeholder="검색어를 검색하세요."
            :value="keyword"
            v-on:input="keyword = $event.target.value"
            @change="getList(1, order, keyword)"
          />
          <button
            slot="search_btn"
            class="search_btn"
            @click="getList(1, order, keyword)"
          ></button>
        </Search>
      </div>
    </div>
    <div class="coupon_info">
      <div class="left">
        <h2 class="dt">총 사용 인원</h2>
        <span class="dd">{{ list.total_info.cnt_use }}</span>
        <span class="unit"> 건</span>
      </div>
      <div class="right">
        <h2 class="dt">총 할인 금액</h2>
        <span class="dd">
          {{
            list.total_info.discount_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </span>
        <span class="unit"> 원</span>
      </div>
    </div>
    <section>
      <Row v-for="(li, index) in list.list" :key="index">
        <template slot="row">
          <div class="coupon">
            <div class="row">
              <span class="dt">{{ li.name }}</span>
              <span class="dt email">{{ li.email }}</span>
            </div>
            <div class="row">
              <span class="dt issuance">{{ li.issued_date }}발급</span>
            </div>
            <div class="row" v-if="li.use">
              <span class="dt">사용완료</span>
              <span class="dd">{{ li.use_date }}</span>
            </div>
            <div class="row" v-else>
              <span class="dt" v-if="li.limit_type == 'date'"
                >{{ li.limit_date }}일까지</span
              >
              <span class="dt" v-else>발급일로부터 {{ li.limit_date }}일</span>
            </div>
          </div>
        </template>
      </Row>
    </section>
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
import Search from "@/components/common/Search.vue";
import Pagination from "@/components/common/Pagination.vue";
import DatePicker from "@/components/common/DatePicker.vue";
import CheckBox from "@/components/common/BaseCheckBox.vue";
import Row from "@/components/common/Row.vue";
export default {
  components: { Search, DatePicker, CheckBox, Row, Pagination },
  data() {
    return {
      list: "",
      keyword: "",
      order: "",
      current: ""
    };
  },
  methods: {
    datePick(result) {
      this.$router
        .push({
          query: {
            keyword: this.$route.query.keyword,
            pageCurrent: 1,
            order: this.$route.query.order,
            start_date: this.$dateFormat(result[0]),
            end_date: this.$dateFormat(result[1]),
            c_id: this.$route.query.c_id,
            coupon_id: this.$route.query.coupon_id
          }
        })
        .catch(() => {});
      this.getList(1, this.$route.query.order, this.$route.query.keyword);
    },
    getList(num, order, keyword) {
      console.log(num, order, keyword);
      const data = {
        action: "get_coupon_use_list",
        current: num,
        keyword: keyword,
        search_status: order,
        search_start_date: this.$route.query.start_date,
        searh_end_date: this.$route.query.end_date,
        c_id: this.$route.query.c_id,
        coupon_id: this.$route.query.coupon_id
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log(result);
          this.list = result.data.data;
          this.$router
            .push({
              query: {
                keyword: keyword,
                pageCurrent: num,
                order: order,
                start_date: this.$route.query.start_date,
                end_date: this.$route.query.end_date,
                c_id: this.$route.query.c_id,
                coupon_id: this.$route.query.coupon_id
              }
            })
            .catch(() => {});
          this.order = order;
          this.keyword = keyword;
          this.current = num;
        });
    }
  },
  created() {
    this.getList(
      this.$route.query.pageCurrent,
      this.$route.query.order,
      this.$route.query.keyword
    );
  }
};
</script>
<style scoped lang="scss">
.coupon_detail {
  padding: 4.445%;
  padding-bottom: 65px;
  .h2_title {
    font-size: 18px;
  }
  .filter {
    margin-top: 15px;
    .search_area {
      margin-top: 15px;
      .chk {
        width: 23%;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        ::v-deep .container-checkbox {
          position: unset;
          height: 24px;
          width: 24px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          .checkmark {
            position: unset;
            width: 24px;
            display: inline-block;
            height: 24px;
            padding: 0;
            box-sizing: border-box;
          }
        }
        .isuse {
          width: calc(100% - 34px);
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
        }
      }

      .search {
        width: 77%;
        vertical-align: middle;
        margin-top: 0;
        display: inline-block;
        .search_contents {
          width: 100%;
          margin: 0;
        }
      }
    }
  }
  .coupon_info {
    padding: 10px;
    margin-top: 15px;
    border-radius: 4px;
    background: #f8f8f8;
    .left,
    .right {
      text-align: center;
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      .dt {
        font-size: 12px;
        color: #999999;
      }
      .dd {
        font-size: 16px;
      }
      .unit {
        font-size: 12px;
      }
    }
    .left {
      border-right: 1px solid #333333;
    }
  }
  section {
    .li {
      border: 1px solid #333333;
      margin-top: 15px;
      padding: 10px;
      .coupon {
        .email {
          color: #999999;
          margin-left: 5px;
        }
        .issuance {
          color: #999999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
