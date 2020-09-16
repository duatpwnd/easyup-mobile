<template>
  <ul>
    <li
      class="tab"
      @click="goToPath('/help/notice', 0)"
      :class="{ 'li-active': active == 0 }"
    >
      <span class="active_bar"></span>공지사항
    </li>
    <li
      class="tab"
      @click="goToPath('/help/faq', 1)"
      :class="{ 'li-active': active == 1 }"
    >
      <span class="active_bar"></span>FAQ
    </li>
    <li
      class="tab"
      @click="goToPath('/help/inquiry', 2)"
      :class="{ 'li-active': active == 2 }"
    >
      <span class="active_bar"></span>1:1문의
    </li>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
      };
    },
    methods: {
      goToPath(route, index) {
        this.active = index;
        this.$router.push(route).catch(() => {});
      },
      switch_fn(route) {
        switch (route) {
          case "/help/notice":
            this.active = 0;
            break;
          case "/help/faq":
            this.active = 1;
            break;
          case "/help/inquiry":
            this.active = 2;
            break;
        }
      },
    },
    created() {
      console.log(this.$route.path);
      this.switch_fn(this.$route.path);
    },
  };
</script>
<style scoped lang="scss">
  .tab {
    font-size: 2rem;
    font-weight: 600;
    width: 33.333%;
    display: inline-block;
    text-align: center;
    background: #f8f8f8;
    padding: 2% 0;
    position: relative;
    color: #999999;
  }
  .active_bar {
    background: #f8f8f8;
    padding: 1.5%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .li-active {
    color: black;
    background: #ffffff;
    .active_bar {
      background: #114fff;
    }
  }
</style>
