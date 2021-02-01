<template>
  <ul class="gnb">
    <li v-for="(list, index) in menu" :key="index">
      <router-link
        :to="{
          path: list.path,
          query: list.query
        }"
        :class="[
          {
            'router-link-active':
              list.path.indexOf($route.path.split('/')[1]) >= 0 &&
              $route.path.indexOf(list.path) < 0
          }
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
          active: require("@/assets/images/common/profile_active_ico.png")
        },
        {
          title: "메시지",
          path: "/msg/receivedList",
          name: require("@/assets/images/common/msg_ico.png"),
          active: require("@/assets/images/common/msg_active_ico.png"),
          query: {
            pageCurrent: 1,
            keyword: ""
          }
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.gnb {
  position: fixed;
  bottom: 0;
  max-width: 720px;
  width: 100%;
  z-index: 2;
  background: white;
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
      height: 48px;
      box-sizing: border-box;
      .ico_1 {
        width: 15px; /* 30px/360px */
        height: 17px;
        margin-top: 10px;
      }
      .ico_2 {
        margin-top: 10px;
        width: 16px; /* 33px/360px */
        height: 16px;
      }
      h3 {
        color: #999999;
        font-size: 9px;
        font-weight: 500;
        margin-top: 2.5px;
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
