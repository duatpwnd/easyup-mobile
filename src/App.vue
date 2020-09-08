<template>
  <div id="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <div class="router-view">
          <MenuModal v-if="this.$store.state.header_menu"></MenuModal>
          <router-view />
        </div>
      </keep-alive>
    </transition>

    <Footer v-if="this.$store.state.isFooter"></Footer>
  </div>
</template>
<script>
  import Header from "@/components/common/header.vue";
  import Footer from "@/components/common/footer.vue";
  import MenuModal from "@/components/common/menu_modal.vue";
  export default {
    components: {
      MenuModal,
      Header,
      Footer,
    },
    data() {
      return {
        // transitionName: "fade",
      };
    },
    methods: {},

    // watch: {
    //   $route(to, from) {
    //     const toDepth = to.path.split("/").length;
    //     const fromDepth = from.path.split("/").length;
    //     console.log(toDepth, fromDepth);
    //     this.transitionName = toDepth < fromDepth ? "fade" : "slide-left";
    //   },
    // },
  };
</script>

<style lang="scss">
  @import "@/assets/scss/common.scss";
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(14em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-14em, 0);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  #app {
    max-width: 720px;
    margin: 0 auto;
  }
  .router-view {
    position: relative;
  }
  @media all and (max-width: 600px) {
    html {
      font-size: 11px;
    }
  }
</style>
