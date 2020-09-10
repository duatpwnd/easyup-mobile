<template>
  <div class="modal">
    <keep-alive>
      <component v-bind:is="type"></component>
    </keep-alive>
  </div>
</template>
<script>
  import LoginProfile from "./login_profile";
  import GoToLecture from "./go_to_lecture_list";
  export default {
    components: {
      LoginProfile,
      GoToLecture,
    },
    data() {
      return {
        type: "LoginProfile",
      };
    },
    methods: {},
    mounted() {
      this.$nextTick(() => {
        this.$EventBus.$on("GoToLecture", () => {
          this.type = "GoToLecture";
        });
        this.$EventBus.$on("LoginProfile", () => {
          this.type = "LoginProfile";
        });
      });
    },
  };
</script>
<style scoped lang="scss"></style>
