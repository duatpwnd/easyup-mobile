<template>
  <div>
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
          placeholder="검색어를 입력하세요."
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
    <BoardTitle></BoardTitle>
    <div class="list">
      <BoardList v-for="(list, index) in bookmark_list.list" :key="index">
        <template slot="top">
          <span class="td left_td">{{ list.course_name }}</span>
          <span class="td right_td">{{ list.title }}</span>

          <img
            v-if="list.button_type == 'view'"
            src="@/assets/images/bookmark_manage/bookmark_read_btn.png"
            alt="책갈피 메모읽기"
            title="책갈피 메모읽기"
            class="bookmark_read_btn"
            @click="go_to_path('/bookmarkManage/read', list.id)"
          />
          <img
            v-else
            src="@/assets/images/bookmark_manage/bookmark_add_btn.png"
            alt="책갈피 메모생성"
            title="책갈피 메모생성"
            class="bookmark_add_btn"
            @click="go_to_path('/bookmarkManage/add', list.id)"
          />
        </template>
        <span class="td" slot="bottom">{{ list.created_at }}</span>
      </BoardList>
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
          v-if="
            bookmark_list.total_page != current && bookmark_list.total_page > 1
          "
          @click="getList(Number(current) + 1, order, $route.query.keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Pagination from "@/components/common/Pagination.vue";

  import Search from "@/components/common/Search.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  export default {
    components: {
      Pagination,
      BoardTitle,
      BoardList,
      Search,
    },
    data() {
      return {
        current: "", //현재번호
        order: "",
        keyword: "",
        bookmark_list: "",
      };
    },
    methods: {
      go_to_path(url, id) {
        this.$router
          .push({
            path: url,
            query: {
              id: id,
            },
          })
          .catch(() => {});
      },
      async getList(num, order, keyword) {
        const data = {
          action: "get_bookmark_list",
          current: num,
          search_status: order,
          keyword: keyword,
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
            this.bookmark_list = result.data.data;
            this.$router
              .push({
                query: {
                  pageCurrent: num,
                  order: order,
                  keyword: keyword,
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
  .search_area {
    margin: 3.5% 0;
  }
  .list {
    &:nth-child(even) {
      background: #f8f8f8;
    }

    .bookmark_add_btn {
      position: absolute;
      top: 0;
      right: 5px;
      width: 18.5px;
      height: 18px;
      bottom: 0;
      margin: auto;
    }
    .bookmark_read_btn {
      @extend .bookmark_add_btn;
      width: 15px;
      height: 16px;
    }
    .list_wrap {
      .left_td,
      .right_td {
        width: 50%;
      }
    }
  }
</style>
