<template>
  <div class="tab1">
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="검색어를 입력하세요."
      />
    </Search>
    <div class="btn_wrap">
      <BlueBtn class="left">
        <button slot="blue_btn" @click="new_msg()">새메시지</button>
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
        <span>메시지</span>
      </template>
    </BoardTitle>
    <div class="row" @click="read()" v-for="(list, index) in arr" :key="index">
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
          <span class="td">강사님께.</span>
        </template>
        <template slot="bottom">
          <span class="td ">윤계상 2020.06.12</span>
        </template>
      </BoardList>
    </div>
  </div>
</template>
<script>
  import CheckBox from "@/components/common/checkbox.vue";
  import BoardTitle from "@/components/common/board_title.vue";
  import BoardList from "@/components/common/board_list.vue";
  import Search from "@/components/common/search.vue";
  import BlueBtn from "@/components/common/blue_btn.vue";
  export default {
    components: {
      CheckBox,
      BoardList,
      BoardTitle,
      BlueBtn,
      Search,
    },
    data() {
      return {
        arr: [0, 1, 2, 3],
        checked_list: [],
        allCheck: false,
      };
    },
    methods: {
      read() {
        this.$router.push("/msg/read");
      },
      new_msg() {
        this.$router.push("/msg/newMessage");
      },
      // 전체 체크
      all_check() {
        this.allCheck = !this.allCheck;
        if (this.allCheck) {
          this.checked_list = this.arr;
        } else {
          this.checked_list = [];
        }
      },
      // 부분체크
      partial_check() {
        if (this.arr.length != this.checked_list.length) {
          this.allCheck = false;
        } else {
          this.allCheck = true;
        }
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
  .tab1 {
    padding: 4.445%;
    padding-top: 0;
    .row {
      &:nth-child(odd) {
        background: #f8f8f8;
      }
    }
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
    .list_wrap {
      .td {
        padding-left: 9%;
        width: 100%;
      }
    }
  }
</style>
