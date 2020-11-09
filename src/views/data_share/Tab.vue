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
        :value="keyword"
        v-on:input="keyword = $event.target.value"
      />
      <button
        slot="search_btn"
        class="search_btn"
        @click="getDropBoxList($route.meta.type, 1, order, keyword)"
      ></button>
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
          <span
            class="td right_td"
            @click="fileDownload(list.id, list.course_id, list.title)"
            >{{ list.title }}</span
          >
        </template>
        <template slot="bottom">
          <span class="td left_td">종류 : {{ list.title.split(".")[1] }}</span>
        </template>
      </BoardList>
    </div>
    <Pagination>
      <template slot="paging">
        <li
          class="prev"
          @click="
            getDropBoxList(
              $route.meta.type,
              Number(current) - 1,
              order,
              $route.query.keyword
            )
          "
          v-if="current > 1"
        >
          이전페이지
        </li>
        <li
          class="next"
          v-if="
            datashare_list.total_page != current &&
              datashare_list.total_page > 1
          "
          @click="
            getDropBoxList(
              $route.meta.type,
              Number(current) + 1,
              order,
              $route.query.keyword
            )
          "
        >
          다음페이지
        </li>
      </template>
    </Pagination>
  </div>
</template>
<script>
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import BoardTitle from "@/components/common/BoardTitle.vue";
  import BoardList from "@/components/common/BoardList.vue";
  import Search from "@/components/common/Search.vue";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import Pagination from "@/components/common/Pagination.vue";
  export default {
    components: {
      Pagination,

      CheckBox,
      BoardList,
      BoardTitle,
      BlueBtn,
      Search,
    },
    data() {
      return {
        checked_list: [],
        allCheck: false,
        datashare_list: "",
        current: "", //현재번호
        order: "",
        keyword: "",
      };
    },
    methods: {
      upload() {
        this.$router.push("/dataShare/upload");
      },
      fileDownload(id, course_id, file_name) {
        const data = {
          action: "get_file_download_info",
          id: id,
          course_id: course_id,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, data, {
            responseType: "blob",
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            console.log(file_name);
            if (window.navigator.msSaveOrOpenBlob) {
              // IE 10+
              window.navigator.msSaveOrOpenBlob(result.data, filename);
            } else {
              // not IE
              let link = document.createElement("a");
              link.href = window.URL.createObjectURL(result.data);
              link.target = "_self";
              link.download = file_name;
              link.click();
              window.URL.revokeObjectURL(result.data);
            }
          });
      },
      all_check() {
        this.allCheck = !this.allCheck;
        if (this.allCheck) {
          this.datashare_list.list.forEach((el, index) => {
            this.checked_list.push(el.id);
          });
        } else {
          this.checked_list = [];
        }
      },
      // 부분체크
      partial_check() {
        if (this.datashare_list.list.length != this.checked_list.length) {
          this.allCheck = false;
        } else {
          this.allCheck = true;
        }
      },
      // 공유한 파일 삭제
      deleteFile() {
        const data = {
          action: "delete_dropbox_file",
          type: this.$route.meta.type,
          id: this.checked_list,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.$noticeMessage(result.data.data[0]);
            this.allCheck = false;
            this.getDropBoxList(
              this.$route.meta.type,
              this.$route.query.pageCurrent,
              this.$route.query.order,
              this.$route.query.keyword
            );
          });
      },
      getDropBoxList(type, num, order, keyword) {
        const data = {
          action: "get_dropbox_list",
          type: type,
          current: num == undefined ? 1 : num,
          search_status: order == undefined ? "all" : order,
          keyword: keyword == undefined ? "" : keyword,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            if (result.data.error != true) {
              this.datashare_list = result.data.data;
              this.$router
                .push({
                  query: {
                    pageCurrent: num,
                    order: order,
                    keyword: keyword,
                  },
                })
                .catch(() => {});
              this.order = order;
              this.keyword = keyword;
              this.current = num;
            }
          });
      },
    },
    mounted() {},
    watch: {
      $route(to, from) {
        this.getDropBoxList(
          to.meta.type,
          this.$route.query.pageCurrent,
          this.$route.query.order,
          this.$route.query.keyword
        );
      },
    },
    created() {
      this.getDropBoxList(
        this.$route.meta.type,
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
