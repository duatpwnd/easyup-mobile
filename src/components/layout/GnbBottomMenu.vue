<template>
  <div id="gnb_bottom_menu">
    <ul class="gnb">
      <li v-for="(list, index) in menu" :key="index">
        <router-link
          :to="{ path: list.path, query: list.query }"
          :class="[
            {
              'router-link-active':
                list.path.indexOf($route.path.split('/')[1]) >= 0 &&
                $route.path.indexOf(list.path) < 0,
            },
          ]"
        >
          <img
            v-if="list.path.indexOf($route.path.split('/')[1]) >= 0"
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
            path: "/myClass/lecture",
            name: require("@/assets/images/common/lec_course_ico.png"),
            active: require("@/assets/images/common/lec_course_active_ico.png"),
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "",
            },
          },
          // {
          //   title: "과제게시판",
          //   path: "/teskboard",
          //   name: require("@/assets/images/common/board_ico.png"),
          //   active: require("@/assets/images/common/board_active_ico.png"),
          // },
          {
            title: "공지사항",
            path: "/notice/list",
            name: require("@/assets/images/common/notice_ico.png"),
            active: require("@/assets/images/common/notice_active_ico.png"),
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "all",
            },
          },
          {
            title: "자료공유",
            path: "/dataShare/sent",
            name: require("@/assets/images/common/share_ico.png"),
            active: require("@/assets/images/common/share_active_ico.png"),
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "all",
            },
          },
          {
            title: "책갈피 관리",
            path: "/bookmarkManage/list",
            name: require("@/assets/images/common/bookmark_ico.png"),
            active: require("@/assets/images/common/bookmark_active_ico.png"),
            query: {
              keyword: "",
              pageCurrent: 1,
              order: "",
            },
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
        width: 25%;

        float: left;
        text-align: center;
        a {
          display: inline-block;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          img {
            height: 17px;
            width: 20%;
          }
          h3 {
            color: #999999;
            font-size: 11px;
            font-weight: 500;
            margin-top: 2.3px;
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
