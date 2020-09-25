<template>
  <div id="lec_list">
    <div class="breadcrumb">
      <span>강의 > 전체</span>
    </div>
    <Search>
      <input
        slot="slot_input"
        class="search_contents"
        placeholder="강의명을 검색하세요."
      />
    </Search>
    <h2 class="total">전체 검색 총<span class="count">120</span>건</h2>
    <div class="lec_list_wrap">
      <div class="li">
        <LecItem>
          <router-link class="lec_list" slot="router" to="/lecDetail">
            <img
              src="@/assets/images/main/popular_lec1.png"
              alt="이지업"
              title="이지업"
            />
          </router-link>
        </LecItem>
      </div>
    </div>
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";
  import LecItem from "@/components/common/LectureItem.vue";
  export default {
    components: {
      LecItem,
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
    .breadcrumb {
      background: #f8f8f8;
      height: 20px;
      font-size: 10px;
      line-height: 14px;
      padding: 3px 10px;
      box-sizing: border-box;
      color: #999999;
    }
    .total {
      display: inline-block;
      font-size: 11px;
      margin-top: 11px;
      .count {
        display: inline-block;
        color: #114fff;
      }
    }
    .lec_list_wrap {
      margin-top: 3%;
      &:after {
        display: block;
        clear: both;
        content: "";
      }
      .li {
        float: left;
        width: 48.782%;
        &:nth-child(odd) {
          margin-right: 2.436%;
        }
      }
    }
  }
</style>
