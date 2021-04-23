<template>
  <Search>
    <select slot="option" class="select" v-model="order" @change="search()">
      <option value="">전체</option>
      <option value="pay">결제완료</option>
      <option value="refund">취소완료</option>
    </select>
    <input
      slot="slot_input"
      class="search_contents"
      placeholder="검색어 입력"
      :value="keyword"
      v-on:input="keyword = $event.target.value"/>
    <button slot="search_btn" class="search_btn" @click="search()"></button
  ></Search>
</template>
<script lang="ts">
  import Search from "@/components/common/Search.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      Search,
    },
  })
  export default class SearchClass extends Vue {
    order = "";
    keyword = "";
    search(): void {
      this.$EventBus.$emit(`search`, {
        order: this.order,
        keyword: this.keyword,
      });
    }
  }
</script>
<style scoped lang="scss"></style>
