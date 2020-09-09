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
    <div class="write" @click="go_to_path()">
      <WriteBtn></WriteBtn>
    </div>
    <div class="title_wrap">
      <span>강좌명</span>
      <span>제목</span>
    </div>
    <div @click="read()">
      <BoardList></BoardList>
    </div>
    <BoardList></BoardList>
    <BoardList></BoardList>
    <BoardList></BoardList>
    <BoardList></BoardList>
    <BoardList></BoardList>
    <BoardList></BoardList>
  </div>
</template>
<script>
  import Search from "@/components/common/search.vue";
  import WriteBtn from "@/components/common/write_btn.vue";
  import BoardList from "@/components/common/board_list.vue";

  export default {
    components: {
      BoardList,
      WriteBtn,
      Search,
    },
    data() {
      return {};
    },
    methods: {
      read() {
        this.$router.push("/teskboard/read");
      },
      go_to_path() {
        this.$router.push("/teskregister");
      },
    },
  };
</script>
<style scoped lang="scss">
  .search_area {
    margin: 3.5% 0;
  }
  .title_wrap {
    border-top: 2px solid black;
    margin-top: 3%;
    background: #f8f8f8;
    padding: 1%;
    span {
      display: inline-table;
      width: 50%;
      text-align: center;
      color: #333333;
      font-size: 1.25rem;
    }
  }
</style>
