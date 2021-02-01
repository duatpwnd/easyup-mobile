<template>
  <keep-alive>
    <component v-bind:is="type"></component>
  </keep-alive>
</template>
<script>
import LoginForm from "./LoginForm";

import GoToLecture from "./go_to_lecture_list";
export default {
  components: {
    LoginForm,
    GoToLecture
  },
  data() {
    return {
      type: "LoginForm"
    };
  },

  methods: {},
  mounted() {
    this.$EventBus.$on("GoToLecture", () => {
      this.type = "GoToLecture";
    });
    this.$EventBus.$on("LoginForm", () => {
      this.type = "LoginForm";
    });
  }
};
</script>
<style scoped lang="scss"></style>
