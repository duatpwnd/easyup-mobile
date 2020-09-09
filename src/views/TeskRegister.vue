<template>
  <div class="register">
    <RegisterComponent>
      <h2 class="title" slot="title">과제등록</h2>
    </RegisterComponent>
  </div>
</template>
<script>
  import RegisterComponent from "@/components/common/multiple_register.vue";
  export default {
    components: {
      RegisterComponent,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .register {
    padding: 4.445%;
  }
</style>
