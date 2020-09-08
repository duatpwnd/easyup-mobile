<template>
  <div>
    <div class="search_area">
      <Search>
        <input
          slot="slot_input"
          type="text"
          class="search_contents"
          placeholder="코스명을 입력하세요"
        />
      </Search>
    </div>
    <div class="section section2">
      <Compile>
        <span class="sum" slot="sum">구독수 : 21,004명</span>
      </Compile>
    </div>
  </div>
</template>
<script>
  import Search from "@/components/common/search.vue";
  import Compile from "@/components/common/compile.vue";
  export default {
    components: {
      Compile,
      Search,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .search_area,
  .section {
    padding: 4.445%;
  }
  .section2 {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
