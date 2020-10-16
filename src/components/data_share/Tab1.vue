<template>
  <div class="tab1">
    <Search>
      <select slot="option" class="select" v-model="order">
        <option value="all">전체</option>
        <option value="course_name">강의명</option>
        <option value="file_name">파일명</option>
      </select>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="강의명을 검색하세요."
      />
      <button slot="search_btn" class="search_btn"></button>
    </Search>
    <div class="btn_wrap">
      <BlueBtn class="left">
        <button slot="blue_btn" @click="upload()">업로드</button>
      </BlueBtn>
      <BlueBtn class="right">
        <button slot="blue_btn" @click="deleteFile()">삭제</button>
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
    <div
      class="file_list"
      v-for="(list, index) in datashare_list.list"
      :key="index"
    >
      <BoardList>
        <CheckBox slot="checkbox">
          <input
            type="checkbox"
            :value="list.id"
            v-model="checked_list"
            slot="check"
            @change="partial_check()"
          />
        </CheckBox>
        <template slot="top">
          <span class="td left_td">{{ list.course_name }}</span>
          <span class="td right_td">{{ list.title }}</span>
        </template>
        <template slot="bottom">
          <span class="td left_td">종류 : {{ list.title.split(".")[1] }}</span>
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
      return {
        order: "",
        datashare_list: "",
      };
    },
    methods: {
      // 공유한 파일 삭제
      deleteFile() {
        console.log(this.checked_list);
        const data = {
          action: "delete_dropbox_file",
          type: "sent",
          id: this.checked_list,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            this.$Util.default.noticeMessage(result.data.data[0]);
            this.getDropBoxList(
              this.$route.query.pageCurrent,
              this.$route.query.order,
              this.$route.query.keyword
            );
            // this.$router
            //   .push({
            //     query: {
            //       action: this.$route.query.action,
            //       pageCurrent: num,
            //       order: order,
            //       keyword: keyword,

            //       category_code: this.$route.query.category_code,
            //       tag: this.$route.query.tag,
            //     },
            //   })
            //   .catch(() => {});
            // this.order = order;
            // this.keyword = keyword;
            // this.current = num;
          });
      },
      getDropBoxList(num, order, keyword) {
        const data = {
          action: "get_dropbox_list",
          type: "sent",
          current: num == undefined ? 1 : num,
          search_status: order == undefined ? "all" : order,
          keyword: keyword == undefined ? "" : keyword,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            this.datashare_list = result.data.data;
            // this.$router
            //   .push({
            //     query: {
            //       action: this.$route.query.action,
            //       pageCurrent: num,
            //       order: order,
            //       keyword: keyword,

            //       category_code: this.$route.query.category_code,
            //       tag: this.$route.query.tag,
            //     },
            //   })
            //   .catch(() => {});
            // this.order = order;
            // this.keyword = keyword;
            // this.current = num;
          });
      },
    },
    mounted() {},
    created() {
      this.getDropBoxList(
        this.$route.query.pageCurrent,
        this.$route.query.order,
        this.$route.query.keyword
      );
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
