<template>
  <div id="gnb_bottom_menu">
    <ul class="gnb">
      <li
        v-for="(list, index) in menu"
        :key="index"
        @click="goToPath(list.path, index)"
      >
        <span :class="{ 'router-link-active': active == list.path }">
          <img
            v-if="active == list.path"
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
          <h3>{{ list.title }}</h3></span
        >
      </li>
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
            path: "/teskboard",
            name: require("@/assets/images/common/board_ico.png"),
            active: require("@/assets/images/common/board_active_ico.png"),
          },
          {
            title: "공지사항",
            path: "/notice",
            name: require("@/assets/images/common/notice_ico.png"),
            active: require("@/assets/images/common/notice_active_ico.png"),
          },
          {
            title: "자료공유",
            path: "/dataShare",
            name: require("@/assets/images/common/share_ico.png"),
            active: require("@/assets/images/common/share_active_ico.png"),
          },
        ],
      };
    },
    methods: {
      goToPath(route, index) {
        this.active = route;
        this.$router.push(route).catch(() => {});
      },
    },
    mounted() {
      window.onload = () => {
        this.active = this.$route.matched[0].path;
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
        span {
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
