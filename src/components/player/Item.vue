<template>
  <div class="items">
    <!-- 자식요소가 있는 경우 큰제목 -->
    <div
      class="scorm_section"
      v-if="typeof li.children != 'undefined'"
      @click="scorm_section_active = !scorm_section_active"
    >
      <img
        src="@/assets/images/player/reduce_ico.png"
        alt="접기"
        title="접기"
        v-if="scorm_section_active"
      />
      <img
        v-else
        src="@/assets/images/player/expand_ico.png"
        alt="펼치기"
        title="펼치기"
      />
      <span class="title">{{ li.title }}</span>
    </div>
    <!-- 자식요소가 없는 경우 작은제목 -->
    <div
      :class="[{ scorm_highlight: li.class.indexOf('scorm_highlight') >= 0 }]"
      class="scorm_section"
      v-else
    >
      <div
        :class="[
          'scorm_item_normal',
          {
            completed: li.status == 'completed',
            non_completed: li.status != 'completed',
          },
        ]"
      >
        <span
          class="title"
          @click="switchItem(li.id, li.current_id)"
          v-html="li.title"
        ></span>
        <img
          v-if="li.bookmark == 'active'"
          src="@/assets/images/player/active_bookmark_ico.png"
          alt="북마크 활성화"
          title="북마크 활성화"
          class="bookmark"
          @click="bookmarkListModal(li.id)"
        />
        <img
          v-else-if="
            li.bookmark == 'on' &&
              playerStore_lp_type != 'link' &&
              playerStore_custom_type != 'download'
          "
          @click="bookmarkAddModal()"
          src="@/assets/images/player/inactive_bookmark_ico.png"
          alt="북마크 비활성화"
          title="북마크 비활성화"
          class="bookmark"
        />
      </div>
    </div>

    <!-- 자식요소가 있는경우 -->
    <transition name="slide">
      <div
        class="child_wrapper"
        ref="child_wrapper"
        v-show="scorm_section_active"
      >
        <div
          class="child_items"
          v-for="(childrenli, index) in li.children"
          :key="index"
          :class="{ scorm_highlight: childrenli.current == 'active' }"
        >
          <div
            :class="[
              'scorm_item_normal',
              {
                completed: childrenli.status == 'completed',
                non_completed: childrenli.status != 'completed',
              },
            ]"
            @click="switchItem(childrenli.id, childrenli.current_id)"
          >
            <span class="child_title">{{ childrenli.title }}</span>
            <img
              v-if="childrenli.bookmark == 'active'"
              src="@/assets/images/player/active_bookmark_ico.png"
              alt="북마크 활성화"
              title="북마크 활성화"
              class="bookmark"
              @click.stop="bookmarkListModal(childrenli.id)"
            />

            <img
              v-else-if="
                childrenli.bookmark == 'on' && playerStore_lp_type != 'link'
              "
              @click.stop="bookmarkAddModal()"
              src="@/assets/images/player/inactive_bookmark_ico.png"
              alt="북마크 비활성화"
              title="북마크 비활성화"
              class="bookmark"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import mixin from "@/components/player/player_mixin.js";
  export default {
    mixins: [mixin],
    props: {
      li: {
        type: Object,
        required: true,
      },
      allToggle: Boolean,
    },
    components: {},
    data() {
      return {
        scorm_section_active: true,
        scorm_highlight: "",
      };
    },
    methods: {
      // 즐겨찾기 추가 모달
      bookmarkAddModal() {
        console.log("추가모달");
        this.$store.commit("toggleStore/Toggle", {
          bookmark_modal: true,
        });
      },
      // 즐겨찾기 리스트 모달
      bookmarkListModal(id) {
        this.$store.commit("toggleStore/bookmarkListToggle", {
          bookmark_list_modal: true,
          current_id: id,
        });
      },
      // 전체 토글
      all() {
        if (this.li.children != undefined) {
          const active_item = this.li.children.find((el, index) => {
            return el.current == "active";
          });
          // active 걸려있는건 제외시켜주고 토글
          if (active_item == undefined) {
            this.scorm_section_active = !this.scorm_section_active;
            // 전체토글 켜지거나 꺼져있는데 해당 섹션만 따로 들어가서 킨경우
            if (this.allToggle != this.scorm_section_active) {
              this.scorm_section_active = this.allToggle;
            }
          }
        }
      },
    },
    // props 감시
    watch: {
      allToggle(newValue, oldValue) {
        this.all();
      },
    },
    created() {},
  };
</script>
<style scoped lang="scss">
  img {
    width: 3.659%; /* 24px/720px */
  }
  span {
    font-size: 1.5rem;
    vertical-align: middle;
    margin-left: 3%;
  }
  // 공통으로 쓰이는 클래스 :: S
  .bookmark {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .scorm_highlight {
    background: #f4f4f4;
    .completed {
      background: url("~@/assets/images/player/ing_ico.png") no-repeat left
        center / 14px 14px;
      padding: 0 5%;
    }
  }
  .completed {
    background: url("~@/assets/images/player/complete_ico.png") no-repeat left
      center / 14px 14px;
    padding: 0 5%;
  }
  .non_completed {
    padding: 0 5%;
  }
  .scorm_item_normal {
    position: relative;
  }
  // 공통으로 쓰이는 클래스 :: E
  .scorm_section {
    padding: 2% 4.445%;
    border-bottom: 3px solid #f8f8f8;
    position: relative;
  }
  .no_items {
    padding: 2% 0;
  }
  .child_items {
    position: relative;
    padding: 2% 4.445%;
    border-bottom: 3px solid #f8f8f8;

    .non_completed {
      padding: 0 5%;
    }
    // .child_title {
    //   margin-left: 0;
    // }
  }
  .slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 1s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }
  .slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 1s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .slide-enter-to,
  .slide-leave {
    max-height: 9999px;
    overflow: hidden;
  }
  .slide-enter,
  .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
</style>
