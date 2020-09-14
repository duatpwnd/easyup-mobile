<template>
  <div>
    <ul class="nav">
      <li
        v-for="(tab, index) in types"
        :class="{ active: index == isActive }"
        :key="index"
        @click="toggle(tab.target, index)"
      >
        <span>{{ tab.name }}</span>
      </li>
    </ul>
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script>
  import UploadTab1 from "@/components/data_share/upload_tab1.vue";
  import UploadTab2 from "@/components/data_share/upload_tab2.vue";
  export default {
    components: {
      UploadTab1,
      UploadTab2,
    },
    data() {
      return {
        isActive: 0,
        type: "UploadTab1",
        types: [
          { name: "업로드", target: "UploadTab1" },
          { name: "업로드(Simple)", target: "UploadTab2" },
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
  .nav {
    border-bottom: 1px solid #ddd;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    li {
      float: left;
      span {
        padding: 2% 3%;
        display: inline-block;
        font-size: 1rem;
      }
    }
    .active {
      color: #555;
      cursor: default;
      background-color: #fff;
      border: 1px solid #ddd;
      border-bottom-color: transparent;
      margin-bottom: -1px;
    }
  }
</style>
