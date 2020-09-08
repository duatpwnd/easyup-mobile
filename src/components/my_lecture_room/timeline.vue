<template>
  <section>
    <h2>타임라인</h2>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <span class="td td2">12명</span>
    </div>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <span class="td td2">12명</span>
    </div>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <span class="td td2">12명</span>
    </div>
    <div class="table">
      <span class="td td1">비전공자는 어떻게 개발자가 되는가</span>
      <span class="td td2">12명</span>
    </div>
  </section>
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
  section {
    padding: 4.445%;
    padding-bottom: 30%;
    h2 {
      font-size: 2rem;
    }
    .table {
      display: table;
      width: 100%;
      margin-top: 1%;
      .td {
        display: table-cell;
        font-size: 1.5rem;
        color: #666666;
      }
      .td1 {
        width: 70%;
      }
      .td2 {
        width: 30%;
        font-weight: bold;
        text-align: right;
        color: #333333;
      }
    }
  }
</style>
