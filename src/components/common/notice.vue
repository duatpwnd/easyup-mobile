<template>
  <ul class="notice">
    <slot name="list">
      <li>
        <p>
          · 각 강의별 과제를 제출할 수 있습니다.
        </p>
      </li>
      <li>
        <p>
          · 지정된 제출일을 반드시 확인하시어 기한을 넘기지 않도록 합니다.
        </p>
      </li>
      <li>
        <p>
          · 다른 강의에 등록하지 않도록 주의해 주세요.
        </p>
      </li>
    </slot>
  </ul>
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
  .notice {
    border-radius: 5px;
    margin-top: 4%;
    background: #f8f8f8;
    padding: 1.39% 2.778%;
    li {
      margin-top: 1%;
      p {
        font-size: 1.25rem;
        color: #757575;
        text-align: left;
      }
    }
  }
</style>
