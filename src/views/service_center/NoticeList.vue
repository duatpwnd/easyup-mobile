<template>
  <div class="notice">
    <Search>
      <input
        v-model="keyword"
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
      <button
        slot="search_btn"
        class="search_btn"
        @click="getList(1, keyword)"
      ></button>
    </Search>
    <h2>
      총<span class="num">{{ list.total_count }}</span
      >건
    </h2>
    <BoardTitle>
      <template slot="header">
        <span>제목</span>
        <span>등록일시</span>
      </template>
    </BoardTitle>
    <ul class="item_wrap">
      <li
        v-for="(li, index) in list.list"
        :key="index"
        @click="goToPath(li.id)"
      >
        <span class="left">{{ li.title }}</span>
        <span class="right">{{ li.created_at }}</span>
      </li>
    </ul>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList(Number(current) - 1, keyword)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList(Number(current) + 1, keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Pagination from "@/components/common/Pagination.vue";

  import BoardTitle from "@/components/common/BoardTitle.vue";
  import Search from "@/components/common/Search.vue";
  export default {
    components: { BoardTitle, Search, Pagination },
    data() {
      return {
        list: "",
        keyword: "",
        current: "",
      };
    },
    methods: {
      getList(num, keyword) {
        const data = {
          action: "get_cs_list", //필수
          current: num, //필수
          type: "notice",
          keyword: keyword, //옵션
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            this.$router
              .push({
                query: {
                  pageCurrent: num,
                  keyword: keyword,
                },
              })
              .catch(() => {});
            this.list = result.data.data;
            this.keyword = keyword;
            this.current = num;
          });
      },
      goToPath(id) {
        this.$router
          .push({
            path: "/help/notice/read",
            query: {
              id: id,
            },
          })
          .catch(() => {});
      },
    },
    mounted() {
      this.getList(this.$route.query.pageCurrent, this.$route.query.keyword);
    },
  };
</script>
<style scoped lang="scss">
  .notice {
    padding: 4.445%;
    .search {
      .search_contents {
        width: 100%;
        margin-left: 0;
      }
    }
    h2 {
      font-size: 1.375rem;
      margin-top: 2.5%;
      .num {
        color: #114fff;
      }
    }
    .title_wrap {
      span {
        text-align: right;
      }
    }
    .item_wrap {
      li {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        padding: 2%;
        &:nth-child(even) {
          background: #f8f8f8;
        }
        span {
          color: #333333;
          font-size: 1.25rem;
        }
        .left {
          float: left;
          width: 55%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right {
          float: right;
        }
      }
    }
  }
</style>
