<template>
  <progress :max="max" :value="value"></progress>
</template>
<script>
  export default {
    props: {
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
  progress {
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
