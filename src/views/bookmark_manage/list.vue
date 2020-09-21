<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="검색어를 입력하세요."
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
    <div class="list">
      <BoardList>
        <template slot="top">
          <span class="td left_td">파이썬 완벽 뽀개기</span>
          <span class="td right_td">제목을 넣어주세요.</span>
          <img
            src="@/assets/images/bookmark_manage/bookmark_read_btn.png"
            alt="책갈피 메모읽기"
            title="책갈피 메모읽기"
            class="bookmark_read_btn"
            @click="go_to_path('/bookmark_manage/read')"
          />
        </template>
        <span class="td" slot="bottom">2020.06.12</span>
      </BoardList>
    </div>
    <div class="list">
      <BoardList>
        <template slot="top">
          <span class="td left_td">파이썬 완벽 뽀개기</span>
          <span class="td right_td">제목을 넣어주세요.</span>
          <img
            src="@/assets/images/bookmark_manage/bookmark_add_btn.png"
            alt="책갈피 메모생성"
            title="책갈피 메모생성"
            class="bookmark_add_btn"
            @click="go_to_path('/bookmark_manage/add')"
          />
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
      go_to_path(url) {
        this.$router.push(url).catch(() => {});
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
  }
</style>
