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
        <button slot="blue_btn" @click="goToPath('/msg/newMessage')">
          새메시지
        </button>
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
    <div class="row" v-for="(list, index) in arr" :key="index">
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
          <span class="td left_td" @click="goToPath('/msg/read')"
            >파이썬 완벽 뽀개기</span
          >
        </template>
        <template slot="bottom">
          <span class="td left_td" @click="goToPath('/msg/read')"
            >종류 : doc</span
          >
          <span class="td" @click="goToPath('/msg/read')">크기 : 31.46k</span>
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
    methods: {
      goToPath(url) {
        this.$router.push(url).catch(() => {});
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
      .bottom_tr {
        .td {
          width: 25%;
        }
      }
    }
  }
</style>
