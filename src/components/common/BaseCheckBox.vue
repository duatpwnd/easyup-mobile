<template>
  <label class="container-checkbox">
    <slot name="check">
      <input type="checkbox" checked="checked" />
    </slot>
    <span class="checkmark"></span>
  </label>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class BaseCheckBox extends Vue {}
</script>
<style scoped lang="scss">
  .container-checkbox {
    position: absolute;
    top: 0;
    left: 1%;
    width: 5%;
    bottom: 0;
    margin: auto;
    input {
      display: none;
    }
  }
  input[type="checkbox"] + .checkmark {
    padding: 30.5%;
    background-color: white;
    border-radius: 3px;
    border: 1px solid #d1d1d1;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
  input[type="checkbox"]:checked + .checkmark {
    background: url("~@/assets/images/common/check_ico.png") no-repeat center /
      80%;
  }
</style>
