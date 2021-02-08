<template>
  <div class="policy">
    <slot name="tab">
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
    </slot>
  </div>
</template>
<script lang="ts">
  import Terms from "@/components/policy/Terms.vue";
  import Privacy from "@/components/policy/Privacy.vue";
  import { Vue, Component, Watch } from "vue-property-decorator";
  @Component({
    components: { Terms, Privacy },
  })
  export default class Policy extends Vue {
    @Watch("$route")
    onPropertyChanged(current: object, previous: object) {
      this.compSet();
    }
    isActive = 0;
    type = "Terms";
    types = [
      { name: "이용약관", target: "Terms" },
      { name: "개인정보 취급방침", target: "Privacy" },
    ];

    toggle(type, index) {
      this.$router
        .push({
          name: "policy",
          query: {
            action: type,
            active: index,
          },
        })
        .catch(() => {});
    }
    compSet() {
      this.type = String(this.$route.query.action);
      this.isActive = Number(this.$route.query.active);
    }
    created() {
      this.compSet();
    }
  }
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
    color: #999999;
  }
  .active_bar {
    background: #f8f8f8;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .active {
    background: #ffffff;
    color: black;
    .active_bar {
      background: #114fff;
    }
  }
</style>
