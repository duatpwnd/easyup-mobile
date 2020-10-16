<template>
  <div id="lec_list">
    <div class="breadcrumb">
      <span>강의 > 전체</span>
    </div>
    <Search>
      <select
        slot="option"
        class="select"
        v-model="order"
        @change="getList(1, order, keyword)"
      >
        <option value="type_date">최신 등록순</option>
        <option value="type_name">이름순</option>
        <option value="type_rating">평점순</option>
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
        @click="getList(1, 'type_date', keyword)"
      ></button>
    </Search>
    <h2 class="total">
      전체 검색 총<span class="count">{{ category_list.total_count }}</span
      >건
    </h2>
    <div class="lec_list_wrap">
      <div class="li" v-for="(list, index) in category_list.list" :key="index">
        <LecItem>
          <router-link
            class="lec_list"
            slot="router"
            :to="{
              path: $route.name == 'course' ? '/courseDetail' : '/lecDetail',
              query: {
                id: list.id,
              },
            }"
          >
            <img :src="list.thumbnail" alt="이지업" title="이지업" />
          </router-link>
          <h4 slot="teacher">{{ list.teacher }}</h4>
          <h2 class="subtitle" slot="subtitle">{{ list.title }}</h2>
          <span slot="grade" class="score">{{ list.ranking }}</span>
          <h1 class="free" slot="free" v-if="list.is_free == 'Y'">
            FREE
          </h1>
        </LecItem>
      </div>
    </div>
    <ul class="paging">
      <li
        class="prev"
        @click="getList(Number(current) - 1, order, keyword)"
        v-if="current > 1"
      >
        이전페이지
      </li>
      <li
        class="next"
        v-if="category_list.total_page != current"
        @click="getList(Number(current) + 1, order, keyword)"
      >
        다음페이지
      </li>
    </ul>
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";
  import LecItem from "@/components/common/LectureItem.vue";
  export default {
    components: {
      LecItem,
      Search,
    },
    data() {
      return {
        current: "", //현재번호
        order: "",
        keyword: "",
        category_list: "",
      };
    },
    methods: {
      async getList(num, order, keyword) {
        const data = {
          action: this.$route.query.action,
          current: num,
          order: order,
          keyword: keyword,
          category_code: this.$route.query.category_code
            ? this.$route.query.category_code
            : null,
          tag: this.$route.query.tag,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            this.category_list = result.data.data;
            this.$router
              .push({
                query: {
                  action: this.$route.query.action,
                  pageCurrent: num,
                  order: order,
                  keyword: keyword,

                  category_code: this.$route.query.category_code,
                  tag: this.$route.query.tag,
                },
              })
              .catch(() => {});
            this.order = order;
            this.keyword = keyword;
            this.current = num;
          });
      },
    },
    watch: {
      $route(to, from) {
        console.log(to, from);

        if (to.query.category_code != from.query.category_code) {
          this.getList(
            this.$route.query.pageCurrent,
            this.$route.query.order,
            this.$route.query.keyword
          );
        }
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
  #lec_list {
    padding: 4.445%;
    padding-bottom: 8.89%;
    .breadcrumb {
      background: #f8f8f8;
      height: 20px;
      font-size: 10px;
      line-height: 14px;
      padding: 3px 10px;
      box-sizing: border-box;
      color: #999999;
    }
    .total {
      display: inline-block;
      font-size: 11px;
      margin-top: 11px;
      .count {
        display: inline-block;
        color: #114fff;
      }
    }
    .lec_list_wrap {
      margin-top: 3%;
      &:after {
        display: block;
        clear: both;
        content: "";
      }
      .li {
        float: left;
        width: 48.782%;
        &:nth-child(odd) {
          margin-right: 2.436%;
        }
      }
    }
    .paging {
      margin-top: 30px;
      &:after {
        display: block;
        clear: both;
        content: "";
      }
      li {
        border: 1px solid #dbdbdb;
        color: #363636;
        padding: 9px;
        border-radius: 4px;
      }
      .prev {
        float: left;
      }
      .next {
        float: right;
      }
    }
  }
</style>
