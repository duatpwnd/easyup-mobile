<template>
  <div class="file_wrap">
    <h2>자료 공유 게시판</h2>
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
  import Tab1 from "@/components/data_share/Tab1.vue";
  import Tab2 from "@/components/data_share/Tab2.vue";
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
  .file_wrap {
    margin-top: 2%;
    h2 {
      font-size: 2rem;
      padding: 0 4.445%;
      margin-bottom: 13px;
    }
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
      padding: 1.118%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .active {
      color: black;
      background: #ffffff;
      .active_bar {
        background: #114fff;
      }
    }
  }
</style>
