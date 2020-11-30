<template>
  <div v-if="notice_list">
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="all">전체</option>
          <option value="course_name">강의명</option>
          <option value="subject">제목</option>
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
          @click="getDropBoxList($route.query.type, 1, order, keyword)"
        ></button>
      </Search>
    </div>

    <BoardTitle></BoardTitle>
    <p v-if="notice_list.list.length == 0" class="no_result">
      검색된 공지사항이 없습니다.
    </p>
    <div
      v-else
      class="list"
      @click="read(list.id, list.c_id)"
      v-for="(list, index) in notice_list.list"
      :key="index"
    >
      <BoardList>
        <template slot="top">
          <span class="td left_td">{{ list.course_name }}</span>
          <span class="td right_td">{{ list.title }}</span>
        </template>
        <span class="td" slot="bottom">{{ list.insert_date }}</span>
      </BoardList>
    </div>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="
            getNoticeList(Number(current) - 1, order, $route.query.keyword)
          "
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="notice_list.total_page != current && notice_list.total_page > 1"
          @click="
            getNoticeList(Number(current) + 1, order, $route.query.keyword)
          "
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Pagination from "@/components/common/Pagination.vue";

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
        notice_list: "",
      };
    },
    methods: {
      read(id, c_id) {
        this.$router.push({
          path: "/notice/read",
          query: { id: id, c_id: c_id },
        });
      },
      go_to_path() {
        this.$router.push("/notice/noticeRegister");
      },
      getNoticeList(num, order, keyword) {
        const data = {
          action: "get_my_notice_list",
          current: num == undefined ? 1 : num,
          search_status: order == undefined ? "all" : order,
          keyword: keyword == undefined ? "" : keyword,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.notice_list = result.data.data;
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
      this.getNoticeList(
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
  }
  .no_result {
    text-align: center;
    font-size: 16px;
    padding: 15px;
  }
</style>
