<template>
  <Search>
    <select slot="option" class="select" v-model="order" @change="search()">
      <option value="">전체</option>
      <option value="success">결제완료</option>
      <option value="refund">환불완료</option>
    </select>
    <input
      slot="slot_input"
      class="search_contents"
      placeholder="강의명을 검색하세요."
      :value="keyword"
      v-on:input="keyword = $event.target.value"/>
    <button
      slot="search_btn"
      class="search_btn"
      @click="getList(1, 'type_date', keyword)"
    ></button
  ></Search>
</template>
<script>
import Search from "@/components/common/Search.vue";

export default {
  components: {
    Search
  },
  data() {
    return { order: "", keyword: "" };
  },
  methods: {
    search() {
      this.$EventBus.$emit(`search`, {
        order: this.order,
        keyword: this.keyword
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
