<template>
  <div id="my_lecture" v-if="dashboard_list">
    <UserInfo>
      <span slot="isTeacher" class="class">님의강의실</span>
      <template slot="info">
        <li>
          <h3>진행중인 강의</h3>
          <span>{{ top_count.course.ing_count }}건</span>
        </li>
        <li>
          <h3>
            진행중인 코스
          </h3>
          <span>{{ top_count.session.ing_count }}건</span>
        </li>
        <li>
          <h3>
            종료된 강의
          </h3>
          <span>{{ top_count.course.end_count }}건</span>
        </li>
        <li>
          <h3>
            종료된 코스
          </h3>
          <span>{{ top_count.session.end_count }}건</span>
        </li>
      </template>

      <span slot="convert" @click="convert()" class="convert">강사전환</span>
    </UserInfo>
    <div class="contents">
      <h2>현재 구독중인 강의</h2>
      <List
        class="subscribed_lec"
        v-for="(list, index) in dashboard_list.ing_course"
        :key="'lec' + index"
      >
        <span class="td td1" slot="td1">
          {{ list.title }}
        </span>
        <template slot="right">
          <span class="td_wrap">
            <span class="td date">{{ list.expired_on }}</span>
            <!-- <span class="td progress"
              ><span class="progress_bar"
                ><span class="percent">60%</span></span
              ></span
            > -->
            <ProgressBar
              :max="100"
              :value="Number(list.progress)"
              :percent="list.progress + '%'"
            ></ProgressBar>
          </span>
        </template>
      </List>

      <h2>현재 구독중인 코스</h2>
      <List
        v-for="(list, index) in dashboard_list.ing_session"
        :key="'course' + index"
      >
        <span class="td td1" slot="td1">
          {{ list.session_name }}
        </span>
        <span slot="right" class="td td2">{{ list.expired_on }}</span>
      </List>
      <h2>과제 게시판</h2>
      <List
        class="board_list"
        v-for="(list, index) in dashboard_list.publication"
        :key="'board' + index"
      >
        <span slot="td1" class="td td1"
          >[{{ list.course_name }}]{{ list.title }}</span
        >
        <template slot="right">
          <span class="td td2">{{ list.expires_on }}</span>
          <span class="td td3">{{ list.sent_date }}</span>
        </template>
      </List>

      <h2>공지사항</h2>
      <List
        v-for="(list, index) in dashboard_list.announcement"
        :key="'notice' + index"
      >
        <span class="td td1" slot="td1">
          [{{ list.course_name }}]{{ list.title }}
        </span>
        <span slot="right" class="td td2">{{ list.insert_date }}</span>
      </List>
      <h2>타임라인</h2>
      <List> </List>
    </div>
  </div>
</template>
<script>
  import List from "@/components/my_lecture_room/list.vue";
  import UserInfo from "@/components/my_lecture_room/user_info.vue";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  export default {
    components: {
      ProgressBar,
      List,
      UserInfo,
    },
    data() {
      return {
        top_count: "",
        dashboard_list: "",
      };
    },
    methods: {
      convert() {
        this.$router.push("/teacherClassRoom");
      },

      getMyLecture(action) {
        const obj = {
          action: action,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(obj), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            if (action == "get_top_count") {
              this.top_count = result.data.data;
            } else {
              this.dashboard_list = result.data.data;
            }
          });
      },
    },
    created() {
      this.getMyLecture("get_top_count");

      this.getMyLecture("get_dashboard_list");
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
        ::v-deep progress {
          width: 57%;
          margin-left: 5%;
          height: 16px;
          vertical-align: middle;
          border: 1px solid #cacaca;
        }
        progress::-webkit-progress-value {
          background: #ecedee;
        }
        progress::-moz-progress-bar {
          background: #ecedee;
        }
        progress::-webkit-progress-bar {
          background: white;
        }
        // .progress {
        //   width: 57%;
        //   margin-left: 5%;
        //   background: white;
        //   border-radius: 4px;
        //   text-align: left;
        //   border: 1px solid #cacaca;
        //   .progress_bar {
        //     display: inline-block;
        //     border-radius: 4px;
        //     background: #ecedee;
        //     width: 65%;
        //     .percent {
        //       width: 100%;
        //       display: block;
        //     }
        //   }
        // }
      }
    }
    .board_list {
      ::v-deep .td1 {
        width: 62%;
      }
      .td2 {
        width: 23%;
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
