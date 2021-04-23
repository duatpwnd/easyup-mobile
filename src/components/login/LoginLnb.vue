<template>
  <div class="modal">
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
  import LoginInfo from "./LoginInfo.vue";
  import GoToLecture from "./go_to_lecture_list.vue";
  import { Component, Vue } from "vue-property-decorator";
  @Component({
    components: {
      LoginInfo,
      GoToLecture,
    },
  })
  export default class LoginLnb extends Vue {
    private type = "LoginInfo";
    mounted() {
      this.$EventBus.$on("GoToLecture", () => {
        this.type = "GoToLecture";
      });
      this.$EventBus.$on("LoginInfo", () => {
        this.type = "LoginInfo";
      });
    }
  }
</script>
<style scoped lang="scss"></style>
