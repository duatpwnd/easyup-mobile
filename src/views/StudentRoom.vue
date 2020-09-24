<template>
  <div id="my_lecture">
    <UserInfo>
      <span slot="isTeacher" class="class">님의강의실</span>
      <h3 slot="info1">구독중인 강의</h3>
      <h3 slot="info2">구독중인 코스</h3>
      <h3 slot="info3">종료된 강의</h3>
      <h3 slot="info4">종료된 코스</h3>
      <span slot="convert" @click="convert()" class="convert">강사전환</span>
    </UserInfo>
    <div class="contents">
      <h2>현재 구독중인 강의</h2>
      <List class="subscribed_lec">
        <template slot="right">
          <span class="td_wrap">
            <span class="td date">무제한</span>
            <span class="td progress"
              ><span class="progress_bar"
                ><span class="percent">60%</span></span
              ></span
            >
          </span>
        </template>
      </List>
      <List class="subscribed_lec">
        <template slot="right">
          <span class="td_wrap">
            <span class="td date">무제한</span>
            <span class="td progress"
              ><span class="progress_bar"
                ><span class="percent">60%</span></span
              ></span
            >
          </span>
        </template>
      </List>
      <h2>현재 구독중인 코스</h2>
      <List></List>
      <h2>과제 게시판</h2>
      <List class="board_list">
        <template slot="right">
          <span class="td td2">2020.09.02</span>
          <span class="td td3">D-1</span>
        </template>
      </List>
      <List class="board_list">
        <template slot="right">
          <span class="td td2">2020.09.02</span>
          <span class="td td3">D-1</span>
        </template>
      </List>
      <h2>공지사항</h2>
      <List>
        <span slot="right" class="td td2">2020.06.20</span>
      </List>
      <h2>타임라인</h2>
      <List> </List>
    </div>
  </div>
</template>
<script>
  import List from "@/components/my_lecture_room/list.vue";
  import UserInfo from "@/components/my_lecture_room/user_info.vue";
  export default {
    components: {
      List,
      UserInfo,
    },
    data() {
      return {};
    },
    methods: {
      convert() {
        this.$router.push("/teacherClassRoom");
      },
    },
  };
</script>
<style scoped lang="scss">
  .contents {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
    .subscribed_lec {
      .td_wrap {
        width: 37%;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        .progress {
          width: 57%;
          margin-left: 5%;
          background: white;
          border-radius: 4px;
          text-align: left;
          border: 1px solid #cacaca;
          .progress_bar {
            display: inline-block;
            border-radius: 4px;
            background: #ecedee;
            width: 65%;
            .percent {
              width: 100%;
              display: block;
            }
          }
        }
      }
    }
    .board_list {
      ::v-deep .td1 {
        width: 70%;
      }
      .td2 {
        width: 15%;
      }
      .td3 {
        font-weight: bold;
        width: 15%;
        text-align: right;
        color: #333333;
      }
    }
  }
</style>
