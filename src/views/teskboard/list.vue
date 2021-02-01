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
    <div class="write">
      <BlueBtn>
        <button slot="blue_btn" @click="go_to_path()">
          글쓰기
        </button>
      </BlueBtn>
    </div>
    <BoardTitle></BoardTitle>
    <div class="list" @click="read()"><BoardList></BoardList></div>
    <div class="list" @click="read()"><BoardList></BoardList></div>
    <div class="list" @click="read()"><BoardList></BoardList></div>
    <div class="list" @click="read()"><BoardList></BoardList></div>
    <div class="list" @click="read()"><BoardList></BoardList></div>
    <div class="list" @click="read()"><BoardList></BoardList></div>
  </div>
</template>
<script>
import BoardTitle from "@/components/common/BoardTitle.vue";
import Search from "@/components/common/Search.vue";
import BoardList from "@/components/common/BoardList.vue";
import BlueBtn from "@/components/common/BaseButton.vue";
export default {
  components: {
    BoardTitle,
    BlueBtn,
    BoardList,
    Search
  },
  data() {
    return {};
  },
  methods: {
    read() {
      this.$router.push("/teskboard/read");
    },
    go_to_path() {
      this.$router.push("/teskboard/teskregister");
    }
  }
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
.list {
  &:nth-child(odd) {
    background: #f8f8f8;
  }
}
</style>
