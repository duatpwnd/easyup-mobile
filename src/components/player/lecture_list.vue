<template>
  <div class="list">
    <div class="toggle_btn" @click="all()">
      <img
        v-if="isActive"
        src="@/assets/images/player/expand_all_ico.png"
        alt="펼치기"
        title="펼치기"
      />
      <img
        v-else
        src="@/assets/images/player/reduce_all_ico.png"
        alt="펼치기"
        title="펼치기"
      />
      <h2 v-if="isActive">강의 목록 전체 펼치기</h2>
      <h2 v-else>강의 목록 전체 접기</h2>
    </div>
    <div class="item_section">
      <Item class="no_items"></Item>
    </div>
    <div class="item_section">
      <Item class="items">
        <template slot="contents">
          <img
            src="@/assets/images/player/reduce_ico.png"
            alt="접기"
            title="접기"
          />
          <span>2강. 강의제목</span>
        </template>
      </Item>
      <Item class="child_items">
        <template slot="contents">
          <img
            src="@/assets/images/player/complete_ico.png"
            alt="접기"
            title="접기"
          />
          <span>섹션 1. 이러지도 저러지도 못하는 초보 개발자</span>
          <img
            src="@/assets/images/player/active_bookmark_ico.png"
            alt="북마크 활성화"
            title="북마크 활성화"
            class="bookmark"
          />
        </template>
      </Item>
      <Item class="child_items">
        <template slot="contents">
          <img
            src="@/assets/images/player/complete_ico.png"
            alt="접기"
            title="접기"
          />
          <span>섹션 1. 이러지도 저러지도 못하는 초보 개발자</span>
          <img
            src="@/assets/images/player/active_bookmark_ico.png"
            alt="북마크 활성화"
            title="북마크 활성화"
            class="bookmark"
          />
        </template>
      </Item>
    </div>
  </div>
</template>
<script>
  import Item from "./item.vue";
  export default {
    components: {
      Item,
    },
    data() {
      return {
        isActive: true,
      };
    },
    methods: {
      all() {
        this.isActive = !this.isActive;
      },
    },
  };
</script>
<style scoped lang="scss">
  .list {
    .item_section {
      border-bottom: 3px solid #ccc;
      .items {
        border-bottom: 3px solid #ccc;
        padding: 2% 4.445%;
      }
      .no_items {
        padding: 2% 4.445%;
      }
      .child_items {
        position: relative;
        padding: 2% 4.445%;
        .bookmark {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .toggle_btn {
      text-align: center;

      position: relative;
      img {
        // width: 3.333%; /* 24px/720px */
        width: 4.583%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
      }
      h2 {
        font-size: 1.5rem;
        color: #999999;
        font-weight: 400;
      }
    }
  }
</style>
