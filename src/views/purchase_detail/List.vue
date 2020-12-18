<template>
  <div>
    <div class="filter">
      <Search>
        <select
          slot="option"
          class="select"
          v-model="order"
          @change="getList(1, order, keyword)"
        >
          <option value="">전체</option>
          <option value="success">결제완료</option>
          <option value="refund">환불완료</option>
          <option value="cancel">취소신청</option>
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
          @click="getList(1, '', keyword)"
        ></button>
      </Search>
      <DatePicker @emitDatePick="datePick"></DatePicker>
    </div>
    <Row v-for="(li, index) in list.list" :key="index">
      <template slot="row">
        <div class="row contain_btn">
          <h2 class="date">
            {{ li.payment_date.split(" ")[0] }}
          </h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/purchase/detail',
                query: { trans_id: li.trans_id },
              })
            "
          >
            <button class="btn_id" slot="blue_btn">{{ li.trans_id }}</button>
          </BaseButton>
        </div>
        <div class="row">
          <span class="dt lec" v-if="li.type == 'course'">강의</span>
          <span class="dt course" v-else>코스</span>
          <span class="dd">
            {{ li.product_name }}
          </span>
        </div>
        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd"
            >{{
              li.price.original
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">할인 금액</span>
          <span class="dd"
            >{{
              li.price.discount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="dt">결제 금액</span>
          <span class="dd"
            >{{
              li.price.final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}원</span
          >
        </div>
        <div class="row">
          <span class="status" v-if="li.status == 'success'">결제완료</span>
          <span class="status" v-else-if="li.status == 'refund'">환불완료</span>
          <span class="status" v-else-if="li.status == 'cancel'">취소신청</span>
        </div>
      </template>
    </Row>

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
  import BaseButton from "@/components/common/BaseButton.vue";
  import Search from "@/components/common/Search.vue";
  import DatePicker from "@/components/common/DatePicker.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import Row from "@/components/common/Row.vue";
  export default {
    components: { BaseButton, Search, DatePicker, Pagination, Row },
    data() {
      return {
        keyword: "",
        order: "",
        current: "",
        list: "",
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
            },
          })
          .catch(() => {});
        this.getList(1, this.$route.query.order, this.$route.query.keyword);
      },
      getList(num, order, keyword) {
        const data = {
          action: "order_list",
          current: num,
          keyword: keyword,
          search_status: order,
          search_start_date: this.$route.query.start_date,
          searh_end_date: this.$route.query.end_date,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
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
                },
              })
              .catch(() => {});
            this.order = order;
            this.keyword = keyword;
            this.current = num;
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
  .filter {
    padding: 0 4.445%;
    .box {
      margin-top: 15px;
    }
  }
  .li {
    padding: 4.445%;
    border-bottom: 4px solid #f8f8f8;
    .contain_btn {
      margin-bottom: 10px;
    }
  }
</style>
