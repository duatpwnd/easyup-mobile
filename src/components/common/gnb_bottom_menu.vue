<template>
  <div id="gnb_bottom_menu">
    <ul class="gnb">
      <li v-for="(list, index) in menu" :key="index" @click="active = index">
        <router-link
          :to="list.path"
          :class="{ 'router-link-active': active == index }"
        >
          <img
            v-if="index == active"
            :src="list.active"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <img
            v-else
            :src="list.name"
            :alt="list.title"
            :title="list.title"
            :class="'ico_' + Number(index + 1)"
          />
          <h3>{{ list.title }}</h3></router-link
        >
      </li>
      <!-- <li>
        <router-link to="/teskboard"
          ><img
            src="@/assets/images/common/board_ico.png"
            alt="과제게시판"
            title="과제게시판"
            class="ico_2"
          />
          <h3>과제게시판</h3></router-link
        >
      </li>
      <li>
        <router-link to="/mylecture1/mycourse/notice"
          ><img
            src="@/assets/images/common/notice_ico.png"
            alt="공지사항"
            title="공지사항"
            class="ico_3"
          />
          <h3>공지사항</h3></router-link
        >
      </li>
      <li>
        <router-link to="/mylecture1/mycourse/share"
          ><img
            src="@/assets/images/common/share_ico.png"
            alt="자료공유"
            title="자료공유"
            class="ico_4"
          />
          <h3>자료공유</h3></router-link
        >
      </li> -->
    </ul>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        active: -1,
        menu: [
          {
            title: "내 강좌/코스",
            path: "/myclass",
            name: require("@/assets/images/common/lec_course_ico.png"),
            active: require("@/assets/images/common/lec_course_active_ico.png"),
          },
          {
            title: "과제게시판",
            path: "/teskboard/list",
            name: require("@/assets/images/common/board_ico.png"),
            active: require("@/assets/images/common/board_active_ico.png"),
          },
          {
            title: "공지사항",
            path: "/notice/list",
            name: require("@/assets/images/common/notice_ico.png"),
            active: require("@/assets/images/common/notice_active_ico.png"),
          },
          {
            title: "자료공유",
            path: "/share",
            name: require("@/assets/images/common/share_ico.png"),
            active: require("@/assets/images/common/share_active_ico.png"),
          },
        ],
      };
    },
    methods: {},
    mounted() {
      window.onload = () => {
        switch (this.$router.currentRoute.path) {
          case "/myclass":
            this.active = 0;
            break;
          case "/teskboard/list":
            this.active = 1;
            break;
          case "/teskboard/read":
            this.active = 1;
            break;
          case "/teskregister":
            this.active = 1;
            break;
          case "/notice/list":
            this.active = 2;
            break;
          case "/notice/read":
            this.active = 2;
            break;
          case "/noticeRegister":
            this.active = 2;
            break;
          case "/share":
            this.active = 3;
            break;

          default:
            this.active = -1;
            break;
        }
      };
    },
  };
</script>
<style scoped lang="scss">
  #gnb_bottom_menu {
    background: white;
    position: fixed;
    bottom: 0;
    max-width: 720px;
    width: 100%;
    z-index: 2;
    .gnb {
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      li {
        width: 25%;
        float: left;
        text-align: center;
        a {
          display: inline-block;
          width: 100%;
          padding: 10% 0;
          .ico_1 {
            width: 17.78%;
          }
          .ico_2 {
            width: 18.34%;
          }
          .ico_3 {
            width: 15.56%;
          }
          .ico_4 {
            width: 18.34%;
          }
          h3 {
            color: #999999;
            font-size: 1.125rem;
            font-weight: 500;
            margin-top: 5%;
          }
        }
        .router-link-active {
          img {
            color: #114fff;
          }
          h3 {
            color: #114fff;
          }
        }
      }
    }
  }
</style>
