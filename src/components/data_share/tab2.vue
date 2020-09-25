<template>
  <div class="tab1">
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="강의명을 검색하세요."
      />
    </Search>
    <div class="btn_wrap">
      <BlueBtn class="left">
        <button slot="blue_btn">업로드</button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn">삭제</button>
      </BlueBtn>
    </div>
    <BoardTitle>
      <template slot="header">
        <CheckBox>
          <input
            type="checkbox"
            @click="all_check()"
            v-model="allCheck"
            slot="check"
          />
        </CheckBox>
        <span>강좌명</span>
        <span>파일명</span>
      </template>
    </BoardTitle>
    <div class="file_list" v-for="(list, index) in arr" :key="index">
      <BoardList>
        <CheckBox slot="checkbox">
          <input
            type="checkbox"
            :value="index"
            v-model="checked_list"
            slot="check"
            @change="partial_check()"
          />
        </CheckBox>
        <template slot="top">
          <span class="td left_td">파이썬 완벽 뽀개기</span>
          <span class="td right_td">파이썬 초급 예제 2</span>
        </template>
        <template slot="bottom">
          <span class="td left_td">종류 : doc</span>
        </template>
      </BoardList>
    </div>
  </div>
</template>
<script>
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Search from "@/components/common/Search.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import mixin from "@/components/mixins/check_event.js";
  export default {
    mixins: [mixin],

    components: {
      CheckBox,
      BoardList,
      BoardTitle,
      BlueBtn,
      Search,
    },
    data() {
      return {};
    },

    mounted() {},
    created() {
      this.arr = [0, 1, 2, 3, 4, 5, 6];
    },
  };
</script>
<style scoped lang="scss">
  .tab1 {
    padding: 4.445%;
    padding-top: 0;
    .btn_wrap {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      .blue_btn {
        width: 48%;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
        button {
          background: white;
          color: #114fff;
        }
      }
    }
    .search {
      margin: 2% 0;
    }
    .file_list {
      &:nth-child(odd) {
        background: #f8f8f8;
      }
    }
    .list_wrap {
      ::v-deep .top_tr {
        .left_td {
          padding-left: 9%;
          width: 39%;
        }
        .right_td {
          width: 61%;
        }
      }
      ::v-deep .bottom_tr {
        .left_td {
          padding-left: 9%;
        }
      }
    }
  }
</style>
