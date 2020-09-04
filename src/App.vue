<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from "@/components/common/header.vue";
  import Footer from "@/components/common/footer.vue";
  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="scss">
  @import "@/assets/scss/common.scss";

  #app {
    border: 2px solid #ccc;
  }

  #app {
    max-width: 720px;
    margin: 0 auto;
  }
  @media all and (max-width: 600px) {
    html {
      font-size: 11px;
    }
  }
</style>
