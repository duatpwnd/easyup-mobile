<template>
  <div class="faq">
    <ul class="faq_gnb">
      <li
        @click="goToComponent('all')"
        :class="{ active: 'all' == $route.query.category }"
      >
        <span>전체</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="goToComponent('info')"
        :class="{ active: 'info' == $route.query.category }"
      >
        <span>회원 정보</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="goToComponent('register')"
        :class="{ active: 'register' == $route.query.category }"
      >
        <span>강의/코스등록</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="goToComponent('subscribe')"
        :class="{ active: 'subscribe' == $route.query.category }"
      >
        <span>강의/코스구독</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="goToComponent('view')"
        :class="{ active: 'view' == $route.query.category }"
      >
        <span>강의시청</span>
      </li>
      <li><span class="bar">｜</span></li>
      <li
        @click="goToComponent('ex')"
        :class="{ active: 'ex' == $route.query.category }"
      >
        <span>기타</span>
      </li>
    </ul>
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
    <h2>총<span class="num">9</span>건</h2>
    <List></List>
  </div>
</template>
<script>
  import List from "@/components//faq/list.vue";
  import Search from "@/components/common/search.vue";
  export default {
    components: {
      List,
      Search,
    },
    data() {
      return {};
    },
    methods: {
      goToComponent(path) {
        this.$router
          .push({
            query: {
              category: path,
            },
          })
          .catch(() => {});
      },
    },
  };
</script>
<style scoped lang="scss">
  .faq {
    padding: 4.445%;
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
          font-size: 1.25rem;
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
