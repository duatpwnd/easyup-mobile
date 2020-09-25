<template>
  <div class="modal">
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script>
  import LoginInfo from "./LoginInfo";
  import GoToLecture from "./go_to_lecture_list";
  export default {
    components: {
      LoginInfo,
      GoToLecture,
    },
    data() {
      return {
        type: "LoginInfo",
      };
    },
    methods: {},
    mounted() {
      this.$EventBus.$on("GoToLecture", () => {
        this.type = "GoToLecture";
      });
      this.$EventBus.$on("LoginInfo", () => {
        this.type = "LoginInfo";
      });
    },
  };
</script>
<style scoped lang="scss"></style>
