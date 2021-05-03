<template>
  <div class="wrap" v-if="Object.keys(notice_list).length > 0">
    <ConfirmModal
      @ok="deleteNotice()"
      v-if="toggleStore_confirmModal"
    ></ConfirmModal>
    <div class="search_area">
      <Search>
        <select slot="option" class="select" v-model="order">
          <option value="all">전체</option>
          <option value="course_name">강의명</option>
          <option value="subject">제목</option>
        </select>
        <input
          slot="slot_input"
          class="search_contents"
          placeholder="강의명을 검색하세요."
          :value="keyword"
          v-on:input="keyword = $event.target.value"
        />
        <button
          slot="search_btn"
          class="search_btn"
          @click="getNoticeList(1, order, keyword)"
        ></button>
      </Search>
    </div>
    <div class="btn_wrap" v-if="$route.query.view == 'teacher'">
      <BlueBtn class="left">
        <button
          slot="blue_btn"
          @click="
            $router.push({
              path: '/notice/noticeRegister',
              query: {
                view: $route.query.view,
                type: 'write',
              },
            })
          "
        >
          등록
        </button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn" @click="confirm()">
          삭제
        </button>
      </BlueBtn>
    </div>
    <BoardTitle>
      <template slot="header">
        <CheckBox v-if="$route.query.view == 'teacher'">
          <input
            type="checkbox"
            @click="all_check()"
            v-model="allCheck"
            slot="check"
          />
        </CheckBox>
        <span>강의명</span>
        <span>제목</span>
      </template>
    </BoardTitle>
    <p v-if="notice_list.list.length == 0" class="no_result">
      검색된 공지사항이 없습니다.
    </p>
    <div
      v-else
      class="list"
      v-for="(list, index) in notice_list.list"
      :key="index"
    >
      <BoardList>
        <CheckBox slot="checkbox" v-if="$route.query.view == 'teacher'">
          <input
            type="checkbox"
            :value="list.id"
            v-model="checked_list"
            slot="check"
            @change="partial_check()"
          />
        </CheckBox>
        <template slot="top">
          <span
            class="td left_td"
            v-html="list.course_name"
            @click="read(list.id, list.c_id)"
            :style="[
              $route.query.view == 'teacher'
                ? { 'padding-left': '9%' }
                : { 'padding-left': 0 },
            ]"
          ></span>
          <span
            class="td right_td"
            v-html="list.title"
            @click="read(list.id, list.c_id)"
          ></span>
        </template>
        <span
          class="td"
          slot="bottom"
          :style="[
            $route.query.view == 'teacher'
              ? { 'padding-left': '9%' }
              : { 'padding-left': 0 },
          ]"
          >{{ list.insert_date.split(" ")[0] }}</span
        >
      </BoardList>
    </div>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="
            getNoticeList(Number(current) - 1, order, $route.query.keyword)
          "
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="notice_list.total_page != current && notice_list.total_page > 1"
          @click="
            getNoticeList(Number(current) + 1, order, $route.query.keyword)
          "
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script lang="ts">
  import Search from "@/components/common/Search.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Pagination from "@/components/common/Pagination.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import ConfirmModal from "@/components/common/ConfirmModal.vue";
  import { mapState } from "vuex";
  import { Vue, Component } from "vue-property-decorator";
  interface BodyData {
    action: string;
    current: number;
    search_status: string;
    keyword: string;
    view_mode: string;
  }
  @Component({
    components: {
      ConfirmModal,
      CheckBox,
      BlueBtn,
      Pagination,
      BoardTitle,
      BoardList,
      Search,
    },
    computed: {
      ...mapState("toggleStore", {
        toggleStore_confirmModal: "confirm_modal",
      }),
    },
  })
  export default class List extends Vue {
    private current = 1; //현재번호
    private order = "";
    private keyword = "";
    private notice_list: { [key: string]: any } = {};
    private checked_list: number[] = [];
    private allCheck = false;
    private confirm(): void {
      if (this.checked_list.length == 0) {
        this.$noticeMessage("삭제할 공지사항 선택해주세요.");
      } else {
        this.$confirmMessage("삭제하시겠습니까?");
      }
    }
    private all_check(): void {
      this.allCheck = !this.allCheck;
      if (this.allCheck) {
        this.notice_list.list.forEach((el: { [key: string]: any }) => {
          this.checked_list.push(el.id);
        });
      } else {
        this.checked_list = [];
      }
    }
    // 부분체크
    private partial_check(): void {
      if (this.notice_list.list.length != this.checked_list.length) {
        this.allCheck = false;
      } else {
        this.allCheck = true;
      }
    }
    private deleteNotice(): void {
      const data = {
        action: "delete_notice",
        id: this.checked_list,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log("공지사항삭제", result);
          this.getNoticeList(1, "all", "");
          this.allCheck = false;
        });
    }
    private read(id: number, c_id: number): void {
      this.$router.push({
        path:
          this.$route.query.view == "teacher"
            ? "/notice/noticeRegister"
            : "/notice/read",
        query: {
          id: id,
          c_id: c_id,
          view: String(this.$route.query.view),
          type: this.$route.query.view == "teacher" ? "modify" : null,
        },
      });
    }
    private getNoticeList(num: number, order: string, keyword: string): void {
      const data: BodyData = {
        action: "get_my_notice_list",
        current: num == undefined ? 1 : num,
        search_status: order == undefined ? "all" : order,
        keyword: keyword == undefined ? "" : keyword,
        view_mode: this.$route.query.view,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.notice_list = result.data.data;
          this.$router
            .push({
              query: {
                pageCurrent: num,
                order: order,
                keyword: keyword,
                view: this.$route.query.view,
              },
            })
            .catch(() => {});
          this.order = order;
          this.keyword = keyword;
          this.current = num;
        });
    }
    created() {
      this.getNoticeList(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
    }
  }
</script>
<style scoped lang="scss">
  .search_area {
    margin-bottom: 10px;
    .search {
      margin-top: 0;
    }
  }
  ::v-deep .list_wrap {
    .tr {
      .td {
        width: 50%;
      }
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
  .list {
    border-bottom: 2px solid #f8f8f8;
  }
  .no_result {
    text-align: center;
    font-size: 16px;
    padding: 15px;
  }
</style>
