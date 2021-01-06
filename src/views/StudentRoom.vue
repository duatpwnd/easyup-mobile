<template>
  <div id="my_lecture" v-if="dashboard_list">
    <Profile
      v-show="profile_modal"
      @profileModalClose="profile_modal = false"
    ></Profile>
    <UserInfo v-if="top_count">
      <span slot="user_name" class="name"
        >{{ userStore_userinfo.info.username }}
      </span>
      <p slot="user_email" class="email">
        {{ userStore_userinfo.info.email }}
      </p>
      <template slot="convert"> </template>
      <span
        slot="convert"
        v-if="userStore_userinfo.info.status == 5"
        @click="convert('teacher')"
        class="convert"
        >강사전환</span
      >
      <template v-else slot="convert">
        <span class="report" @click="profile_modal = true">프로필</span>
        <span class="convert" @click="convert('student')">학생전환</span>
      </template>
      <p class="update_date" slot="update_date">
        최근 접속일: {{ userStore_userinfo.info.last_login }}
      </p>
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
    </UserInfo>

    <div class="contents">
      <h2>현재 구독중인 강의</h2>
      <span class="no_register" v-if="dashboard_list.ing_course.length == 0"
        >진행중인 강의가 없습니다.</span
      >
      <List
        v-else
        class="subscribed_lec"
        v-for="(list, index) in dashboard_list.ing_course"
        :key="'lec' + index"
      >
        <span
          class="td td1"
          slot="td1"
          @click="
            $router.push({
              path: '/play',
              query: {
                course_id: list.id,
                lp_id: list.lp_id,
              },
            })
          "
        >
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
            <ProgressBar :max="100" :value="Number(list.progress)"
              ><span class="percent" slot="percent_txt">{{
                list.progress + "%"
              }}</span></ProgressBar
            >
          </span>
        </template>
      </List>

      <h2>현재 구독중인 코스</h2>
      <span class="no_register" v-if="dashboard_list.ing_session.length == 0"
        >진행중인 코스가 없습니다.</span
      >
      <List
        v-else
        v-for="(list, index) in dashboard_list.ing_session"
        :key="'course' + index"
      >
        <span
          class="td td1"
          slot="td1"
          @click="
            $router.push({
              path: '/courseDetail',
              query: { id: list.session_id },
            })
          "
        >
          {{ list.session_name }}
        </span>
        <span
          slot="right"
          class="td td2"
          @click="
            $router.push({
              path: '/courseDetail',
              query: { id: list.session_id },
            })
          "
          >{{ list.expired_on }}</span
        >
      </List>
      <!-- <h2>과제 게시판</h2>
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
          <span class="td td3">{{ list.sent_date.split(" ")[0] }}</span>
        </template>
      </List> -->

      <h2>공지사항</h2>
      <span class="no_register" v-if="dashboard_list.announcement.length == 0"
        >등록된 공지사항이 없습니다.</span
      >
      <List
        v-else
        v-for="(list, index) in dashboard_list.announcement"
        :key="'notice' + index"
      >
        <span
          class="td td1"
          slot="td1"
          @click="
            $router.push({
              path: '/notice/read',
              query: { id: list.id, c_id: list.c_id },
            })
          "
        >
          [{{ list.course_name }}]{{ list.title }}
        </span>
        <span
          slot="right"
          @click="
            $router.push({
              path: '/notice/read',
              query: { id: list.id, c_id: list.c_id },
            })
          "
          class="td td2"
          >{{ list.insert_date.split(" ")[0] }}</span
        >
      </List>
      <TimeLine></TimeLine>
    </div>
  </div>
</template>
<script>
  import TimeLine from "@/components/my_lecture_room/TimeLine.vue";
  import List from "@/components/my_lecture_room/list.vue";
  import UserInfo from "@/components/my_lecture_room/user_info.vue";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import Profile from "@/components/modal/Profile.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      Profile,
      TimeLine,
      ProgressBar,
      List,
      UserInfo,
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    data() {
      return {
        profile_modal: false,
        top_count: "",
        dashboard_list: "",
      };
    },
    methods: {
      convert(type) {
        console.log(type);
        this.$router.push({
          query: {
            type: type,
          },
        });
        let userinfo = this.userStore_userinfo;
        if (type == "student") {
          userinfo.info.status = 5;
        } else {
          userinfo.info.status = 1;
        }
        this.$store.commit("userStore/loginToken", this.userStore_userinfo);
      },

      getMyLecture(action) {
        const obj = {
          action: action,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
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
  #my_lecture {
    padding-bottom: 65px;
  }
  .contents {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
    .no_register {
      font-size: 14px;
      margin-top: 3px;
      display: inline-block;
    }
    .subscribed_lec {
      .td_wrap {
        width: 37%;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        ::v-deep .progress_bar {
          width: 55%;
          margin-left: 5px;
          margin-right: 0;
          height: 16px;
          position: relative;
          border: 1px solid #cacaca;
          progress::-webkit-progress-value {
            background: #ecedee;
          }
          progress::-moz-progress-bar {
            background: #ecedee;
          }
          progress::-webkit-progress-bar {
            background: white;
          }
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
        width: 50%;
      }
      .td2 {
        width: 20%;
      }
      .td3 {
        font-weight: bold;
        width: 30%;
        text-align: right;
        color: #333333;
      }
    }
  }
</style>
