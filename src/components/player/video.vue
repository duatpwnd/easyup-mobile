<template>
  <div class="video">
    <iframe
      width="100%"
      src="https://www.youtube.com/embed/fO5fO-gelfA"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .video {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
</style>
