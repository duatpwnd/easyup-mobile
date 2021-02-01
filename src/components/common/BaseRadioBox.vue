<template>
  <label class="container-radiobox">
    <slot name="radio">
      <input type="radio" />
    </slot>
    <span class="checkmark"><span class="circle"></span></span>
  </label>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.container-radiobox {
  vertical-align: middle;
  display: inline-block;
  input {
    display: none;
  }
  input[type="radio"] + .checkmark {
    width: 24px;
    height: 24px;
    border: 1px solid #dbdbdb;
    background: white;
    display: inline-block;
    border-radius: 50px;
    position: relative;
  }
  input[type="radio"]:checked + .checkmark .circle {
    background: #114fff;
    width: 13px;
    height: 13px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50px;
  }
}
</style>
