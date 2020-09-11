<template>
  <div>
    <Video></Video>
    <Scorm></Scorm>
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
  import Tab1 from "@/components/player/lecture_list.vue";
  import Tab2 from "@/components/player/lecture_note.vue";
  import Video from "@/components/player/video.vue";
  import Scorm from "@/components/player/scorm.vue";
  export default {
    components: { Tab1, Tab2, Video, Scorm },
    data() {
      return {
        isActive: 0,
        type: "Tab1",
        types: [
          { name: "강의 목록", target: "Tab1" },
          { name: "강의 노트", target: "Tab2" },
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
  }
  .active {
    background: #ffffff;
    .active_bar {
      display: block;
      background: #114fff;
      padding: 1.5%;
    }
  }
</style>
