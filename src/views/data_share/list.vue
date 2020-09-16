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
  import Tab1 from "@/components/data_share/tab1.vue";
  import Tab2 from "@/components/data_share/tab2.vue";
  export default {
    components: {
      Tab1,
      Tab2,
    },
    data() {
      return {
        isActive: 0,
        type: "Tab1",
        types: [
          { name: "공유한 파일", target: "Tab1" },
          { name: "공유받은 파일", target: "Tab2" },
        ],
      };
    },
    methods: {
      toggle(type, index) {
        this.type = type;
        this.isActive = index;
      },
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
    padding: 1.5%;
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
