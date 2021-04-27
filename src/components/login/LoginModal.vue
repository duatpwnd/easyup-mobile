<template>
  <keep-alive>
    <component v-bind:is="type"></component>
  </keep-alive>
</template>
<script lang="ts">
  import LoginForm from "./LoginForm.vue";
  import GoToLecture from "./go_to_lecture_list.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      LoginForm,
      GoToLecture,
    },
  })
  export default class LoginModal extends Vue {
    private type = "LoginForm";
    mounted() {
      this.$EventBus.$on("GoToLecture", () => {
        console.log("Go");
        this.type = "GoToLecture";
      });
      this.$EventBus.$on("LoginForm", () => {
        this.type = "LoginForm";
      });
    }
  }
</script>
<style scoped lang="scss"></style>
