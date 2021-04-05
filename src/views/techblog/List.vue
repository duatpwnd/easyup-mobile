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
    <div class="list-wrap">
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
            <div class="date">{{ li.wdate.split(" ")[0] }} {{ li.writer }}</div>
          </template>
        </TechBlogList>
      </div>
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
<script lang="ts">
  import Search from "@/components/common/Search.vue";
  import TechBlogList from "@/components/techblog/List.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      Pagination,
      TechBlogList,
      Search,
    },
  })
  export default class List extends Vue {
    list = "";
    keyword = "";
    current = 1;
    goToPath(id: number): void {
      this.$router.push({
        path: "/techBlog/read",
        query: {
          id: id,
        },
      });
    }
    getList(num: number, keyword: string): void {
      const data = {
        action: "get_blog_list", //필수
        current: num, //필수
        keyword: keyword, //옵션
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
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
    }
    created() {
      this.getList(this.$route.query.pageCurrent, this.$route.query.keyword);
    }
  }
</script>
<style scoped lang="scss">
  .search {
    margin-top: 0;
    .search_contents {
      width: 100%;
      margin-left: 0;
    }
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list {
      margin-top: 24px;
      vertical-align: middle;
      width: 49%;
      .blog-li {
        img {
          border-radius: 10px;
        }
      }
    }
  }
</style>
