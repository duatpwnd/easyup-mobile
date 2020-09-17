<template>
  <div id="gnb_bottom_menu">
    <ul class="gnb">
      <li v-for="(list, index) in menu" :key="index">
        <router-link :to="list.path">
          <img
            v-if="list.path == '/' + $route.path.split('/')[1]"
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
    </ul>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
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
          {
            title: "책갈피 관리",
            path: "/bookmark_manage",
            name: require("@/assets/images/common/bookmark_ico.png"),
            active: require("@/assets/images/common/bookmark_active_ico.png"),
          },
        ],
      };
    },
    methods: {},
    mounted() {},
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
        width: 20%;
        float: left;
        text-align: center;
        a {
          display: inline-block;
          width: 100%;
          padding: 10% 0;
          .ico_1 {
            width: 22.222%; /* 32px/144px */
          }
          .ico_2,
          .ico_4 {
            width: 22.917%; /* 33px/144px */
          }
          .ico_3 {
            width: 19.444%; /* 28px/144px */
          }
          .ico_5 {
            width: 20.833%; /* 30px/144px */
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
