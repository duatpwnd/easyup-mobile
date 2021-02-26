<template>
  <div class="list_wrap" v-if="list">
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
    <p class="no_result" v-if="list.list.length == 0">
      구매 내역 리스트가 없습니다.
    </p>
    <Row v-for="(li, index) in list.list" :key="index" v-else>
      <template slot="row">
        <div class="row contain_btn">
          <h2 class="date">
            {{ li.payment_date.split(" ")[0] }}
          </h2>
          <BaseButton
            @click.native="
              $router.push({
                path: '/purchase/detail',
                query: { order_id: li.order_id, view: $route.query.view },
              })
            "
          >
            <button class="btn_id" slot="blue_btn">{{ li.order_id }}</button>
          </BaseButton>
        </div>
        <div class="row">
          <span class="dt lec" v-if="li.type == 'course'">강의</span>
          <span class="dt course" v-else>코스</span>
          <span class="dd">{{ li.product_name }}</span>
        </div>
        <div class="row">
          <span class="dt">강의 비용</span>
          <span class="dd">{{ li.price.format_original }}원</span>
        </div>
        <div class="row">
          <span class="dt">할인 금액</span>
          <span class="dd">{{ li.price.format_pkg }}원</span>
        </div>
        <div class="row">
          <span class="dt">결제 금액</span>
          <span class="dd final-price">{{ li.price.format_final }}원</span>
        </div>
        <div class="row">
          <span class="dt">상태</span>
          <span class="dd">{{ li.status }}</span>
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
<script lang="ts">
  import BaseButton from "@/components/common/BaseButton.vue";
  import Search from "@/components/common/Search.vue";
  import DatePicker from "@/components/common/DatePicker.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import Row from "@/components/common/Row.vue";
  import { Vue, Component } from "vue-property-decorator";
  interface BodyData {
    action: string;
    current: number;
    keyword: string;
    search_status: string;
    search_start_date: string;
    search_end_date: string;
  }
  @Component({
    components: { BaseButton, Search, DatePicker, Pagination, Row },
  })
  export default class List extends Vue {
    $dateFormat!: Function;
    keyword = "";
    order = "";
    current = 1;
    list = "";
    datePick(result: [object, object]): void {
      this.$router
        .push({
          query: {
            keyword: this.$route.query.keyword,
            pageCurrent: 1,
            order: this.$route.query.order,
            start_date: this.$dateFormat(result[0]),
            end_date: this.$dateFormat(result[1]),
            view: this.$route.query.view,
          },
        })
        .catch(() => {});
      this.getList(
        1,
        this.$route.query.order as string,
        this.$route.query.keyword as string
      );
    }
    getList(num: number, order: string, keyword: string): void {
      const data: BodyData = {
        action: "order_list",
        current: num,
        keyword: keyword,
        search_status: order,
        search_start_date: this.$route.query.start_date as string,
        search_end_date: this.$route.query.end_date as string,
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
                view: this.$route.query.view,
              },
            })
            .catch(() => {});
          this.order = order;
          this.keyword = keyword;
          this.current = num;
        });
    }
    created() {
      this.getList(
        (this.$route.query.pageCurrent as unknown) as number,
        this.$route.query.order as string,
        this.$route.query.keyword as string
      );
    }
  }
</script>
<style scoped lang="scss">
  .list_wrap {
    padding: 0 16px;

    .filter {
      .box {
        margin-top: 15px;
      }
      .search {
        margin-top: 0;
      }
    }
    .no_result {
      text-align: center;
      font-size: 16px;
      margin-top: 15px;
    }
    .li {
      padding: 4.445% 0;
      border-bottom: 4px solid #f8f8f8;
      .contain_btn {
        margin-bottom: 10px;
      }
      .row {
        .final-price {
          font-weight: bold;
        }
      }
    }
  }
</style>
