<template>
  <div class="blog-li">
    <slot name="contents">
      <img src="@/assets/images/common/thumbnail1.png" alt="" />
      <h2 class="title">DB분산처리를 위한 Sharding</h2>
      <p class="brief">DB 분산 처리를 위한 샤딩 적용 경험을 공유합니다.</p>
      <span class="date">2020.07.20 강동원</span>
    </slot>
  </div>
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
  .title {
    font-size: 18px;
    color: #333333;
    margin-top: 10px;
    height: 55px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
  }
  .brief {
    color: #666666;
    font-size: 1.25rem;
    margin: 5px 0;
  }
  .date {
    color: #999999;
    font-size: 1.125rem;
  }
</style>
