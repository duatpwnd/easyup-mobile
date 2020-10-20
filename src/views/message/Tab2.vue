<template>
  <div class="tab2">
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
        @click="getList('sent', 1, keyword)"
      ></button>
    </Search>
    <div class="btn_wrap">
      <BlueBtn class="left">
        <button slot="blue_btn" @click="goToPath('/msg/newMessage')">
          새메시지
        </button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn" @click="deleteMessage('sent')">삭제</button>
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
    <div class="row">
      <BoardList v-for="(li, index) in list.list" :key="index">
        <CheckBox slot="checkbox">
          <input
            type="checkbox"
            :value="li.id"
            v-model="checked_list"
            slot="check"
            @change="partial_check()"
          />
        </CheckBox>
        <template slot="top">
          <span class="td" @click="goToPath('/msg/read')">{{ li.title }}</span>
        </template>
        <template slot="bottom">
          <span class="td " @click="goToPath('/msg/read')"
            >{{ li.user_name }} {{ li.send_date }}</span
          >
        </template>
      </BoardList>
      <Pagination>
        <template slot="paging">
          <li
            class="prev"
            @click="getList('sent', Number(current) - 1, keyword)"
            v-if="current > 1"
          >
            이전페이지
          </li>
          <li
            class="next"
            v-if="list.total_page != current && list.total_page > 1"
            @click="getList('sent', Number(current) + 1, keyword)"
          >
            다음페이지
          </li>
        </template>
      </Pagination>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/common/Pagination.vue";

  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Search from "@/components/common/Search.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import mixin from "./mixin.js";
  export default {
    mixins: [mixin],
    components: {
      Pagination,

      CheckBox,
      BoardList,
      BoardTitle,
      BlueBtn,
      Search,
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {},
    created() {
      this.getList(
        "sent",
        this.$route.query.pageCurrent,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .tab2 {
    padding: 4.445%;
    padding-top: 0;
    .search {
      .search_contents {
        width: 100%;
        margin-left: 0;
      }
    }
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
