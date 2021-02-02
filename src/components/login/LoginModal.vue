<template>
  <keep-alive>
    <component v-bind:is="type"></component>
  </keep-alive>
</template>
<script>
  import LoginForm from "./LoginForm.vue";
  import GoToLecture from "./go_to_lecture_list.vue";
  export default {
    components: {
      LoginForm,
      GoToLecture,
    },
    data() {
      return {
        type: "LoginForm",
      };
    },

    methods: {},
    mounted() {
      this.$EventBus.$on("GoToLecture", () => {
        console.log("Go");
        this.type = "GoToLecture";
      });
      this.$EventBus.$on("LoginForm", () => {
        this.type = "LoginForm";
      });
    },
  };
</script>
<style scoped lang="scss"></style>
