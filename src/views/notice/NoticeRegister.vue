<template>
  <div class="register">
    <RegisterComponent>
      <h2 class="title" slot="title">공지사항</h2>
    </RegisterComponent>
  </div>
</template>
<script lang="ts">
  import RegisterComponent from "@/components/common/multiple_register.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      RegisterComponent,
    },
  })
  export default class NoticeRegister extends Vue {}
</script>
<style scoped lang="scss">
  .register {
    padding: 4.445%;
  }
</style>
