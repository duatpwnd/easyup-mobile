<template>
  <div>
    <router-link class="tab" to="/help/notice"
      ><span class="active_bar"></span>공지사항
    </router-link>
    <router-link
      class="tab"
      :to="{
        name: 'faq',
        query: {
          category: 'all',
        },
      }"
      ><span class="active_bar"></span>FAQ</router-link
    >
    <router-link class="tab" to="/help/qna"
      ><span class="active_bar"></span>1:1문의</router-link
    >
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
      };
    },
    methods: {},
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
    .active_bar {
      background: #f8f8f8;
      padding: 1.118%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .router-link-active {
    color: black;
    background: #ffffff;
    .active_bar {
      background: #114fff;
    }
  }
</style>
