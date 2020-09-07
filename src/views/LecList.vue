<template>
  <div id="lec_list">
    <Search></Search>
    <List></List>
  </div>
</template>
<script>
  import Search from "@/components/lecture_list/search.vue";
  import List from "@/components/lecture_list/list.vue";
  export default {
    components: {
      List,
      Search,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  #lec_list {
    padding: 4.445%;
    padding-bottom: 8.89%;
  }
</style>
