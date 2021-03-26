<template>
  <div class="progress_bar">
    <slot name="percent_txt"> </slot>
    <progress :max="max" :value="value"> </progress>
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  @Component
  export default class ProgressBar extends Vue {
    @Prop(Number) private max!: Number;
    @Prop(Number) private value!: Number;
  }
</script>
<style scoped lang="scss">
  .progress_bar {
    height: 20px;
    position: relative;
    width: 26.4%;
    margin: 5px 10px;
    vertical-align: middle;
    display: inline-block;
    .percent {
      color: #757575;
      height: 12px;
      line-height: 13px;
      text-align: center;
      font-size: 12px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 2;
    }
    progress {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      border-radius: 1px;
      overflow: hidden;
      height: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
    }
    progress::-webkit-progress-value {
      background: #114fff;
    }
    progress::-moz-progress-bar {
      background: #114fff;
    }
    progress::-webkit-progress-bar {
      background: #dbdbdb;
    }
  }
</style>
