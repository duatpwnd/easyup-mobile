<template>
  <div class="faq">
    <ul class="faq_gnb">
      <li
        @click="getList('all', '', 1)"
        :class="{ active: 'all' == $route.query.category }"
      >
        <span>전체</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="getList('info', '', 1)"
        :class="{ active: 'info' == $route.query.category }"
      >
        <span>회원 정보</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="getList('regist', '', 1)"
        :class="{ active: 'regist' == $route.query.category }"
      >
        <span>강의/코스등록</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="getList('subscribe', '', 1)"
        :class="{ active: 'subscribe' == $route.query.category }"
      >
        <span>강의/코스구독</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="getList('player', '', 1)"
        :class="{ active: 'player' == $route.query.category }"
      >
        <span>강의시청</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="getList('etc', '', 1)"
        :class="{ active: 'etc' == $route.query.category }"
      >
        <span>기타</span>
      </li>
    </ul>
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
        @click="getList($route.query.category, keyword, 1)"
      ></button>
    </Search>
    <h2>
      총<span class="num">{{ list.total_count }}</span
      >건
    </h2>
    <List v-for="(li, index) in list.list" :key="index">
      <template slot="category">
        <span @click="slide(index)">[{{ li.category }}]{{ li.title }}</span>
      </template>
      <dd slot="dd" ref="dd" v-show="active" v-html="li.contents"></dd>
    </List>
  </div>
</template>
<script>
  import List from "@/components/faq/List.vue";
  import Search from "@/components/common/Search.vue";
  export default {
    components: {
      List,
      Search,
    },
    data() {
      return {
        list: "",
        keyword: "",
        active: false,
      };
    },
    methods: {
      slide(index) {
        if (this.$refs.dd[index].style.display == "none") {
          this.$refs.dd[index].style.display = "block";
        } else {
          this.$refs.dd[index].style.display = "none";
        }
      },
      getList(category, keyword, current) {
        console.log(category, keyword, current);
        const data = {
          action: "get_cs_list", //필수
          current: current, //필수
          type: "faq",
          category: category,
          keyword: keyword, //옵션
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {})
          .then((result) => {
            if (this.$refs.dd != undefined) {
              this.$refs.dd.forEach((el, index) => {
                el.style.display = "none";
              });
            }
            this.list = result.data.data;
            this.keyword = keyword;
            this.$router
              .push({
                query: {
                  category: category,
                  keyword: keyword,
                  current: current,
                },
              })
              .catch(() => {});
          });
      },
    },
    created() {
      this.getList(
        this.$route.query.category,
        this.$route.query.keyword,
        this.$route.query.current
      );
    },
  };
</script>
<style scoped lang="scss">
  .faq {
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
      padding-bottom: 2%;
      border-bottom: 2px solid #333333;
      .num {
        color: #114fff;
      }
    }
    .search {
      margin-top: 4%;
    }
    .faq_gnb {
      background: #f4f4f4;
      padding: 2%;
      border-radius: 30px;
      display: flex;
      justify-content: space-around;
      line-height: 1;
      li {
        span {
          font-size: 10px;
          color: #999999;
          vertical-align: middle;
        }
        .bar {
          font-size: 1rem;
        }
      }
      .active {
        span {
          color: black;
        }
      }
    }
  }
</style>
