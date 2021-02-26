<template>
  <div>
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
    <div
      class="list"
      @click="goToPath(li.id)"
      v-for="(li, index) in list.list"
      :key="index"
    >
      <TechBlogList>
        <template slot="contents">
          <img :src="li.thumbnail" :alt="li.title" :title="li.title" />
          <h2 class="title">{{ li.title }}</h2>
          <p class="brief">{{ li.intro_txt }}</p>
          <span class="date">{{ li.wdate }}</span>
        </template>
      </TechBlogList>
    </div>
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
  import Search from "@/components/common/Search.vue";
  import TechBlogList from "@/components/techblog/List.vue";
  export default {
    components: {
      Pagination,
      TechBlogList,
      Search,
    },
    data() {
      return {
        list: "",
        keyword: "",
        current: "",
      };
    },
    methods: {
      goToPath(id) {
        this.$router.push({
          path: "/techBlog/read",
          query: {
            id: id,
          },
        });
      },
      getList(num, keyword) {
        const data = {
          action: "get_blog_list", //필수
          current: num, //필수
          keyword: keyword, //옵션
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("기술블로그", result);
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
    },
    created() {
      this.getList(this.$route.query.pageCurrent, this.$route.query.keyword);
    },
  };
</script>
<style scoped lang="scss">
  .search {
    margin-top: 0;
    .search_contents {
      width: 100%;
      margin-left: 0;
    }
  }
  .list {
    border-bottom: 4px solid #f8f8f8;
    padding: 10px 0;
  }
</style>
