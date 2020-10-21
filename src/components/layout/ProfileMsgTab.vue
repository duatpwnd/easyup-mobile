<template>
  <ul class="gnb">
    <li v-for="(list, index) in menu" :key="index">
      <router-link
        :to="{
          path: list.path,
          query: list.query,
        }"
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
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        active: -1,
        menu: [
          {
            title: "프로필 편집",
            path: "/profileModify",
            name: require("@/assets/images/common/profile_ico.png"),
            active: require("@/assets/images/common/profile_active_ico.png"),
          },
          {
            title: "메시지",
            path: "/msg/receivedList",
            name: require("@/assets/images/common/msg_ico.png"),
            active: require("@/assets/images/common/msg_active_ico.png"),
            query: {
              pageCurrent: 1,
              keyword: "",
            },
          },
        ],
      };
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .gnb {
    background: white;
    position: fixed;
    bottom: 0;
    max-width: 720px;
    width: 100%;
    z-index: 2;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    li {
      width: 50%;
      float: left;
      text-align: center;
      a {
        display: inline-block;
        width: 100%;
        padding: 10% 0;
        .ico_1 {
          width: 8.333%; /* 30px/360px */
        }
        .ico_2 {
          width: 9.167%; /* 33px/360px */
        }
        h3 {
          color: #999999;
          font-size: 1.125rem;
          font-weight: 500;
          margin-top: 5%;
        }
      }
      .router-link-active {
        h3 {
          color: #114fff;
        }
      }
    }
  }
</style>
