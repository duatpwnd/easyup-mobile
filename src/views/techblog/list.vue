<template>
  <div>
    <input type="text" class="search_contents" />
    <TechBlogList>
      <template slot="contents">
        <img src="@/assets/images/common/thumbnail1.png" alt="" />
        <h2 @click="goToPath()" class="title">DB분산처리를 위한 Sharding</h2>
        <p class="brief">DB 분산 처리를 위한 샤딩 적용 경험을 공유합니다.</p>
        <span class="date">2020.07.20 테스트</span>
      </template>
    </TechBlogList>
    <TechBlogList>
      <template slot="contents">
        <img src="@/assets/images/common/thumbnail1.png" alt="" />
        <h2 @click="goToPath()" class="title">DB분산처리를 위한 Sharding</h2>
        <p class="brief">DB 분산 처리를 위한 샤딩 적용 경험을 공유합니다.</p>
        <span class="date">2020.07.20 테스트</span>
      </template>
    </TechBlogList>
  </div>
</template>
<script>
  import TechBlogList from "@/components/techblog/list.vue";
  export default {
    components: {
      TechBlogList,
    },
    data() {
      return {};
    },
    methods: {
      goToPath() {
        this.$router.push("/techBlog/read");
      },
    },
  };
</script>
<style scoped lang="scss">
  .search_contents {
    margin: 18px 4.445% 10px;
    border: 1px solid #333333;
    color: black;
    font-size: 1.25rem;
    width: 100%;
    line-height: 2.3;
    padding: 0 1.755%;
    padding-right: 10%;
    box-sizing: border-box;
    background: url("~@/assets/images/lec_list/search_btn.png") no-repeat 95%
      center / 5%;
  }
  .blog_list {
  }
</style>
