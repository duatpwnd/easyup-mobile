<template>
  <div id="youtube_player" v-if="info">
    <BookmarkListModal
      @bookmark_move="getPlayInfo"
      v-if="toggleStore_bookmark_list_modal.bookmark_list_modal"
    ></BookmarkListModal>
    <!-- 책갈피 추가 모달 -->
    <BookmarkModal
      @bookmark_add="getPlayInfo"
      :current_id="info.current_item[0].item_id"
      v-if="toggleStore_bookmark_modal"
    ></BookmarkModal>
    <!-- lp 타입은 링크인지 영상인지 구분하기 위해서 -->
    <div
      v-if="
        info.current_item[0].lp_type == 'document' &&
          info.current_item[0].custom_type == 'youtube'
      "
    >
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
    <!-- 비디오 파일인 경우  -->
    <video
      id="myvideo"
      ref="videoPlayer"
      class="video-js vjs-matrix"
      v-else-if="
        info.current_item[0].lp_type == 'document' &&
          info.current_item[0].custom_type == 'video'
      "
    >
      <track
        id="my-alternate-video-track"
        kind="commentary"
        srclang="kr"
        label="한국어"
        default
      />
    </video>
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
<script lang="ts">
  import { Component, Watch, Vue } from "vue-property-decorator";
  import Tab1 from "@/components/player/LectureList.vue";
  import Tab2 from "@/components/player/LectureNote.vue";
  import Video from "@/components/player/Video.vue";
  import Scorm from "@/components/player/Scorm.vue";
  import BookmarkModal from "@/components/player/BookmarkModal.vue";
  import BookmarkListModal from "@/components/player/BookMarkListModal.vue";
  import { mapState, mapMutations } from "vuex";
  import mixin from "@/components/player/player_mixin.ts";
  import videojs from "video.js";
  @Component({
    components: { BookmarkListModal, Tab1, Tab2, Video, Scorm, BookmarkModal },
    computed: {
      ...mapState("playerStore", {
        playerStore_check_time: "check_time",
      }),
    },
  })
  export default class Player extends mixin {
    @Watch("info")
    onPropertyChanged(a: string, b: string) {
      if (b == "" && a != "") {
        console.log(a, b);
        const self = this;
        if (
          this.info["current_item"][0].lp_type == "document" &&
          this.info["current_item"][0].custom_type == "video"
        ) {
          this.$nextTick(() => {
            this.player = videojs(
              this.$refs.videoPlayer,
              this.videoOptions,
              function onPlayerReady() {
                console.log("onPlayerReady");
                if (self.$route.query.linkType != undefined) {
                  self.player!["currentTime"](self["playerStore_check_time"]);
                }
              }
            );
            // 반응형으로 바꿔줌
            this.player!["fluid"](true);
            self.$store.commit("playerStore/playerState", {
              video_stop_time: this.player,
            });
          });
        }
      }
    }
    video_set: boolean = false;
    info: string = "";
    isActive: number = 0;
    type: string = "Tab1";
    types: { name: string; target: string }[] = [
      { name: "강의 목록", target: "Tab1" },
      { name: "강의 노트", target: "Tab2" },
    ];
    player: null = null;

    videoOptions = {
      controls: true,
      autoplay: false,
      muted: false,
      preload: "auto",
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src: "",
          type: "application/x-mpegURL",
        },
      ],
    };
    getPlayInfo(id, linkType) {
      this.video_set = false;
      const data = {
        action: "get_player_info",
        course_id: this.$route.query.course_id,
        lp_id: this.$route.query.lp_id,
        linkType: linkType == undefined ? null : linkType,
        iid: id == undefined ? null : id,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result) => {
          console.log("플레이어 정보", result);
          this.info = result.data.data;
          this.videoOptions["sources"][0].src = this.info[
            "current_item"
          ][0].link;
          let current_link;
          console.log(this.info["current_item"][0].link.split("?"));
          console.log(this.info["current_item"][0].link.split("start="));
          // rel 있을경우 제거해주기. 이거때문에 start 옵션이 제대로 작동안함
          // 스타트 옵션때문에 분기 처리해줘야함
          if (
            this.info["current_item"][0].link.split("start=")[1] == undefined
          ) {
            current_link =
              this.info["current_item"][0].link +
              "?html5=1&playsinline=1&fs=0&start=1";
            console.log(current_link);
          } else {
            current_link =
              this.info["current_item"][0].link +
              `&html5=1&playsinline=1&fs=0&`;
            console.log(current_link);
          }
          this.$store.commit("playerStore/playerState", {
            current_index: this.info["current_item"][0].idx,
            current_item_id: this.info["current_item"][0].item_id,
            current_link: current_link,
            list: this.info["list"][0],
            custom_type: this.info["current_item"][0].custom_type,
            lp_type: this.info["current_item"][0].lp_type,
            nextBtn: this.info["current_item"][0].last_item_chk,
            nextItem: this.info["current_item"][0].next_item,
          });
          this.video_set = true;
        });
    }
    newTab(link) {
      window.open(link);
    }
    toggle(type, index) {
      this.type = type;
      this.isActive = index;
    }
    beforeDestroy() {
      if (this.player) {
        this.player!["dispose"]();
      }
    }
    mounted() {
      this.$nextTick(() => {
        console.log(this.info);
      });
    }
    created() {
      if (this.$route.query.linkType != undefined) {
        this.getPlayInfo(this.$route.query.iid, "bookmark");
      } else {
        this.getPlayInfo(undefined, undefined);
      }
      this.$EventBus.$on("switch_item", (result) => {
        this.getPlayInfo(undefined, undefined);
      });
    }
  }
</script>
<style scoped lang="scss">
  @import "../../node_modules/video.js/dist/video-js.min.css";
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
    }
    .active {
      background: #ffffff;
      .active_bar {
        background: #114fff;
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
    ::v-deep .video-js {
      .vjs-big-play-button {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
</style>
