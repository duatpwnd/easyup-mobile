<template>
  <div class="tab1" v-if="list">
    <ConfirmModal
      @ok="deleteMessage($route.name)"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
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
        @click="getList($route.name, 1, keyword)"
      ></button>
    </Search>
    <div class="btn_wrap">
      <BlueBtn class="left" v-if="userStore_userinfo.info.is_admin">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/msg/newMessage',
              query: {
                view: $route.query.view,
              },
            })
          "
        >
          새메시지
        </button>
      </BlueBtn>
      <BlueBtn
        class="right"
        :style="[
          userStore_userinfo.info.is_admin == false
            ? { width: '100%' }
            : { width: '48%' },
        ]"
      >
        <button slot="blue_btn" @click="confirm()">
          삭제
        </button>
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
    <p class="no_result" v-if="list.list.length == 0">
      검색된 내용이 없습니다.
    </p>
    <div v-else class="row" v-for="(li, index) in list.list" :key="index">
      <BoardList>
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
          <span
            class="td not_read"
            @click="goToPath(li.id)"
            :class="[{ read: li.msg_status == 1 }]"
            >{{ li.title }}</span
          >
        </template>
        <template slot="bottom">
          <span class="td " @click="goToPath(li.id)"
            >{{ li.user_name }} {{ li.send_date }}</span
          >
        </template>
      </BoardList>
    </div>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="getList($route.name, Number(current) - 1, keyword)"
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="list.total_page != current && list.total_page > 1"
          @click="getList($route.name, Number(current) + 1, keyword)"
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      Pagination,
      ConfirmModal,
      CheckBox,
      BoardList,
      BoardTitle,
      BlueBtn,
      Search,
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
    data() {
      return {
        list: "",
        keyword: "",
        current: "",
        checked_list: [],
        allCheck: false,
      };
    },
    methods: {
      all_check() {
        this.allCheck = !this.allCheck;
        if (this.allCheck) {
          console.log(this.list.list);
          this.list.list.forEach((el, index) => {
            this.checked_list.push(el.id);
          });
        } else {
          this.checked_list = [];
        }
      },
      // 부분체크
      partial_check() {
        if (this.list.list.length != this.checked_list.length) {
          this.allCheck = false;
        } else {
          this.allCheck = true;
        }
      },
      goToPath(id) {
        this.$router
          .push({
            path: "/msg/read",
            query: {
              type: this.$route.name,
              id: id,
              view: this.$route.query.view,
            },
          })
          .catch(() => {});
      },
      confirm() {
        if (this.checked_list.length == 0) {
          this.$noticeMessage("삭제할 메시지를 선택해주세요.");
        } else {
          this.$confirmMessage("삭제하시겠습니까?");
        }
      },
      deleteMessage(type) {
        const data = {
          action: "delete_message",
          type: type,
          id: this.checked_list,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("메시지", result);
            this.getList(type, 1, "");
            this.allCheck = false;
          });
      },
      getList(type, num, keyword) {
        const data = {
          action: "get_message_list",
          type: type,
          current: num, //필수
          keyword: keyword, //옵션
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log("메시지", result);
            this.list = result.data.data;
            this.$router
              .push({
                query: {
                  pageCurrent: num,
                  keyword: keyword,
                  view: this.$route.query.view,
                },
              })
              .catch(() => {});
            this.keyword = keyword;
            this.current = num;
          });
      },
    },
    watch: {
      $route(to, from) {
        this.getList(
          to.name,
          this.$route.query.pageCurrent,
          this.$route.query.keyword
        );
      },
    },
    created() {
      console.log(this.$route.name);
      this.getList(
        this.$route.name,
        this.$route.query.pageCurrent,
        this.$route.query.keyword
      );
    },
  };
</script>
<style scoped lang="scss">
  .tab1 {
    padding: 4.445%;
    padding-top: 0;
    .no_result {
      text-align: center;
      font-size: 16px;
      padding: 15px;
    }
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
      .not_read {
        font-weight: 100;
      }
      .read {
        font-weight: bold;
      }
    }
  }
</style>
