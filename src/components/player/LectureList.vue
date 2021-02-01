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
    <div class="list_wrapper" v-if="list.not_parents.length == 0">
      <Item
        :li="li"
        :allToggle="isActive"
        v-for="(li, index) in list.are_parents"
        :key="index"
      >
      </Item>
    </div>
    <div class="list_wrapper" v-else-if="list.are_parents.length == 0">
      <Item
        :li="li"
        :allToggle="isActive"
        v-for="(li, index) in list.not_parents"
        :key="index"
      >
      </Item>
    </div>
    <div class="list_wrapper" v-else>
      <Item
        :li="li"
        :allToggle="isActive"
        v-for="(li, index) in list.not_parents"
        :key="'a' + index"
      >
      </Item>
      <Item
        :li="li"
        :allToggle="isActive"
        v-for="(li, index) in list.are_parents"
        :key="'b' + index"
      >
      </Item>
    </div>
  </div>
</template>
<script>
import Item from "@/components/player/Item.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      isActive: true, // 강의 전체 토글
      current_index: ""
    };
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState("playerStore", {
      playerStore_current_item_id: "current_item_id"
    })
  },
  components: {
    Item
  },

  methods: {
    all() {
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    if (this.list.are_parents.length != 0) {
      this.all();
    }
  }
};
</script>
<style scoped lang="scss">
.list {
  .toggle_btn {
    text-align: center;
    padding: 2% 0;
    position: relative;
    border-bottom: 2px solid #f8f8f8;
    img {
      // width: 3.333%; /* 24px/720px */
      width: 4.583%;
      position: absolute;
      top: 0;
      left: 4.445%;
      bottom: 0;
      margin: auto;
    }
    h2 {
      font-size: 1.5rem;
      color: #999999;
      font-weight: 400;
    }
  }
  .list_wrapper {
  }
}
</style>
