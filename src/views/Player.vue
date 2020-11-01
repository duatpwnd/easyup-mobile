<template>
  <div id="youtube_player" v-if="info">
    <BookmarkListModal
      @bookmark_move="getPlayInfo"
      v-if="toggleStore_bookmark_list_modal.bookmark_list_modal"
    ></BookmarkListModal>
    <!-- 책갈피 추가 모달 -->
    <BookmarkModal
      :current_id="info.current_item[0].item_id"
      v-if="toggleStore_bookmark_modal"
    ></BookmarkModal>
    <!-- lp 타입은 링크인지 영상인지 구분하기 위해서 -->
    <div v-if="info.current_item[0].lp_type == 'document'">
      <!-- video set 하는이유는 자막을 다시 갱신해주기 위해서 -->
      <Video v-if="video_set"></Video>
      <!-- video가 잠시 사라지면 위치가 깨지기 때문에 자리잡는용도 :: S -->
      <div class="video" v-else>
        <iframe
          width="100%"
          src=""
          frameborder="0"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
      </div>
      <!-- video가 잠시 사라지면 위치가 깨지기 때문에 자리잡는용도 :: E -->
    </div>
    <div
      class="link"
      target="_blank"
      @click="newTab(info.current_item[0].link)"
      v-else
    >
      {{ info.current_item[0].link }}
    </div>
    <Scorm :player_info="info.player_info"></Scorm>
    <span
      class="tab"
      v-for="(tab, index) in types"
      :class="{ active: index == isActive }"
      :key="index"
      @click="toggle(tab.target, index)"
      ><span class="active_bar"></span>{{ tab.name }}</span
    >
    <keep-alive>
      <component
        v-bind:is="type"
        :list="info.list[0]"
        :note="info.current_item[0].note_contents"
      ></component>
    </keep-alive>
  </div>
</template>
<script>
  import Tab1 from "@/components/player/LectureList.vue";
  import Tab2 from "@/components/player/LectureNote.vue";
  import Video from "@/components/player/Video.vue";
  import Scorm from "@/components/player/Scorm.vue";
  import BookmarkModal from "@/components/player/BookmarkModal.vue";
  import BookmarkListModal from "@/components/player/BookMarkListModal.vue";
  import { mapState, mapMutations } from "vuex";
  import mixin from "@/components/player/player_mixin.js";
  export default {
    mixins: [mixin],
    components: { BookmarkListModal, Tab1, Tab2, Video, Scorm, BookmarkModal },
    data() {
      return {
        video_set: false,
        info: "",
        isActive: 0,
        type: "Tab1",
        types: [
          { name: "강의 목록", target: "Tab1" },
          { name: "강의 노트", target: "Tab2" },
        ],
      };
    },

    methods: {
      getPlayInfo(id, linkType) {
        this.video_set = false;
        const data = {
          action: "get_player_info",
          course_id: this.$route.query.course_id,
          lp_id: this.$route.query.lp_id,
          linkType: linkType == undefined ? null : linkType,
          iid: id == undefined ? null : id,
        };
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data), {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log("플레이어 정보", result);
            this.info = result.data.data;
            this.$store.commit("playerStore/playerState", {
              current_index: this.info.current_item[0].idx,
              current_item_id: this.info.current_item[0].item_id,
              current_link: this.info.current_item[0].link,
              list: this.info.list[0],
              custom_type: this.info.current_item[0].custom_type,
              lp_type: this.info.current_item[0].lp_type,
              nextBtn: this.info.current_item[0].last_item_chk,
              nextItem: this.info.current_item[0].next_item,
            });
            this.video_set = true;
          });
      },
      newTab(link) {
        window.open(link);
      },
      toggle(type, index) {
        this.type = type;
        this.isActive = index;
      },
    },
    created() {
      if (this.$route.query.linkType != undefined) {
        this.getPlayInfo(this.$route.query.iid, "bookmark");
      } else {
        this.getPlayInfo();
      }
      this.$EventBus.$on("switch_item", (result) => {
        this.getPlayInfo();
      });
    },
  };
</script>
<style scoped lang="scss">
  #youtube_player {
    height: 100%;
    overflow: hidden;
    .tab {
      font-size: 2rem;
      font-weight: 600;
      width: 50%;
      display: inline-block;
      text-align: center;
      background: #f8f8f8;
      padding: 2% 0;
      position: relative;
      .active_bar {
        background: #f8f8f8;
        height: 4px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .active {
        background: #ffffff;
        .active_bar {
          background: #114fff;
        }
      }
    }
    .link {
      background-color: #d9edf7;
      border-color: #bce8f1;
      text-align: center;
      padding: 10px;
    }
    .video {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;

      iframe {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
