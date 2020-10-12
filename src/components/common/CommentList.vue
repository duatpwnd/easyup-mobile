<template>
  <div class="comment_list">
    <slot name="comment">
      <div class="comment_header">
        <img src="@/assets/images/common/mid_star.png" alt="" />
        <span class="name">김길동</span>
        <span class="date">4일전</span>
        <span class="btn_wrap">
          <span>수정</span>
          <span class="remove_btn">삭제</span>
          <span>댓글</span>
        </span>
      </div>

      <p class="contents"></p>
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
  .comment_list {
    &:not(:first-child) {
      margin-top: 9%;
    }
    .comment_header {
      position: relative;
      img {
        width: 12px;
        height: 11px;
      }
      .name {
        margin-left: 10px;
        color: #333333;
        font-size: 12px;
        vertical-align: middle;
      }
      .date {
        color: #999999;
        font-size: 10px;
        margin: 0 5px;
        vertical-align: middle;
      }
      .btn_wrap {
        position: absolute;
        top: 0;
        right: 0;
        span {
          color: #114fff;
          font-size: 9px;
        }
        .remove_btn {
          margin: 0 10px;
        }
      }
    }
    .contents {
      text-align: justify;
      color: #666666;
      font-size: 11px;
      margin-top: 2%;
    }
  }
</style>
