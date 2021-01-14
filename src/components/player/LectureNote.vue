<template>
  <div v-html="note"></div>
</template>
<script>
export default {
  props: {
    note: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss"></style>
