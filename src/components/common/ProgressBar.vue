<template>
  <progress :max="max" :value="value" :percent="percent"></progress>
</template>
<script>
  export default {
    props: {
      percent: {
        type: String || null,
      },
      max: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  progress:before {
    content: attr(percent);
    font-size: 9px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 13px;
    width: 18px;
    color: #757575;
  }
  progress {
    position: relative;
    width: 85%;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
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
</style>
