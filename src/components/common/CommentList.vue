<template>
  <div class="comment_list">
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
    <p class="contents">
      바로 한 번 더 볼 예정입니다. 그 만큼 한번으로는 흡수하기 힘든 깊은
      인사이트들이 많은 것 같아요. 특히 제가 현업에서 일하면서 궁금해하고
      고민하고 목말라했던 것들이 다 담겨있었습니다. 저도 직접 현업에 녹여내면서
      해보는 중인데 앞으로도 도움 많이받겠습니다! 좋은 강의 진심으로
      감사드립니다. 저의 커리어의 좋은 나침반이 되어주셔서 감사합니다! 다음
      강의도 정말 기대가 됩니당..ㅠ!
    </p>
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
    margin-top: 9%;
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
      font-size: 1.375rem;
      margin-top: 2%;
    }
  }
</style>
