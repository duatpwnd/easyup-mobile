<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="강의명을 검색하세요"
        />
      </Search>
    </div>
    <!-- <div class="write">
      <BlueBtn>
        <button slot="blue_btn" @click="go_to_path()">
          글쓰기
        </button>
      </BlueBtn>
    </div> -->
    <BoardTitle></BoardTitle>
    <div class="list" @click="read()">
      <BoardList>
        <template slot="top">
          <span class="td left_td">파이썬 완벽 뽀개기</span>
          <span class="td right_td">전체 휴강 안내드립니다.</span>
        </template>
        <span class="td" slot="bottom">2020.06.12</span>
      </BoardList>
    </div>
    <div class="list" @click="read()">
      <BoardList>
        <template slot="top">
          <span class="td left_td">파이썬 완벽 뽀개기</span>
          <span class="td right_td">전체 휴강 안내드립니다.</span>
        </template>
        <span class="td" slot="bottom">2020.06.12</span>
      </BoardList>
    </div>
  </div>
</template>
<script>
  import Search from "@/components/common/search.vue";
  import BoardTitle from "@/components/common/board_title.vue";
  import BoardList from "@/components/common/board_list.vue";
  // import BlueBtn from "@/components/common/blue_btn.vue";
  export default {
    components: {
      BoardTitle,
      // BlueBtn,
      BoardList,
      Search,
    },
    data() {
      return {};
    },
    methods: {
      read() {
        this.$router.push("/notice/read");
      },
      go_to_path() {
        this.$router.push("/notice/noticeRegister");
      },
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
</style>
