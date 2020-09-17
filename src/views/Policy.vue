<template>
  <div>
    <span
      class="tab"
      v-for="(tab, index) in types"
      :class="{ active: index == isActive }"
      :key="index"
      @click="toggle(tab.target, index)"
      ><span class="active_bar"></span>{{ tab.name }}</span
    >
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script>
  import Terms from "@/components/policy/terms.vue";
  import Privacy from "@/components/policy/privacy.vue";
  export default {
    components: { Terms, Privacy },
    data() {
      return {
        isActive: 0,
        type: "Terms",
        types: [
          { name: "이용약관", target: "Terms" },
          { name: "개인정보 취급방침", target: "Privacy" },
        ],
      };
    },
    methods: {
      toggle(type, index) {
        this.$router.push({
          name: "policy",
          query: {
            action: type,
            active: index,
          },
        });
      },
      compSet() {
        this.type = this.$route.query.action;
        this.isActive = this.$route.query.active;
      },
    },
    watch: {
      $route(to, from) {
        this.compSet();
      },
    },
    created() {
      this.compSet();
    },
  };
</script>
<style scoped lang="scss">
  .tab {
    font-size: 2rem;
    font-weight: 600;
    width: 50%;
    display: inline-block;
    text-align: center;
    background: #f8f8f8;
    padding: 2% 0;
    position: relative;
  }
  .active_bar {
    background: #f8f8f8;
    padding: 1.118%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .active {
    background: #ffffff;
    .active_bar {
      background: #114fff;
    }
  }
</style>
