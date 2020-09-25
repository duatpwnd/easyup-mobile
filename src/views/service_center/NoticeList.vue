<template>
  <div class="notice">
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
    <h2>총<span class="num">9</span>건</h2>
    <BoardTitle>
      <template slot="header">
        <span>제목</span>
        <span>등록일시</span>
      </template>
    </BoardTitle>
    <ul class="item_wrap">
      <li @click="goToPath()">
        <span class="left"
          >[서비스 중단 안내] 서비스 개선 작업에 의한 중단</span
        >
        <span class="right">2020.06.12</span>
      </li>
      <li>
        <span class="left"
          >[서비스 중단 안내] 서비스 개선 작업에 의한 중단</span
        >
        <span class="right">2020.06.12</span>
      </li>
      <li>
        <span class="left"
          >[서비스 중단 안내] 서비스 개선 작업에 의한 중단</span
        >
        <span class="right">2020.06.12</span>
      </li>
      <li>
        <span class="left"
          >[서비스 중단 안내] 서비스 개선 작업에 의한 중단</span
        >
        <span class="right">2020.06.12</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import Search from "@/components/common/Search.vue";
  export default {
    components: { BoardTitle, Search },
    data() {
      return {};
    },
    methods: {
      goToPath() {
        this.$router.push("/help/notice/read").catch(() => {});
      },
    },
  };
</script>
<style scoped lang="scss">
  .notice {
    padding: 4.445%;
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
          width: 75%;
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
