<template>
  <div class="video" ref="video">
    <iframe
      v-if="playerStore_custom_type == 'youtube'"
      @load.once="isSrtFile()"
      width="100%"
      ref="content_id"
      :src="playerStore_current_link"
      frameborder="0"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
    ></iframe>
  </div>
</template>
<script>
  import parser from "@/assets/js/youtube/subtitles.parser.js";
  import external_subtitle from "@/assets/js/youtube/youtube_external_subtitle.js";
  import { mapState, mapMutations } from "vuex";

  export default {
    components: {},

    data() {
      return {
        youtubeExternalSubtitle: null,
      };
    },
    computed: {
      current_link() {
        return this.$store.getters["playerStore/getCurrentLink"];
      },
      ...mapState("playerStore", {
        playerStore_stopTime: "stop_time",
        playerStore_checkTime: "check_time",
        playerStore_current_link: "current_link",
        playerStore_custom_type: "custom_type",
        playerStore_isBookmarkLink: "isBookmarkLink",
      }),
    },
    watch: {
      current_link(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (newValue != oldValue) {
          this.isSrtFile();
        }
      },
    },
    destroyed() {
      this.$store.commit("playerStore/playerState", {
        isBookmarkLink: true,
      });
    },
    methods: {
      validationCheck() {
        const link = this.playerStore_current_link;
        console.log(link);
        // 책갈피 관리에서 들어오는 페이지
        if (
          this.$route.query.linkType != undefined &&
          this.playerStore_isBookmarkLink
        ) {
          console.log(this.$route.query.linkType, this.$route.query.start);

          const bookmark_time = this.$route.query.start;
          this.$store.commit("playerStore/playerState", {
            current_link:
              link +
              `?cc_load_policy=3&html5=1&playsinline=1&fs=0&autoplay=1&mute=1&start=${bookmark_time}`,
            isBookmarkLink: false,
          });
        }
        // 북마크 시간 있는지 없는지
        if (this.playerStore_checkTime != "") {
          console.log(link, "시간:", this.playerStore_checkTime);
          this.$store.commit("playerStore/playerState", {
            current_link:
              link +
              `?cc_load_policy=3&html5=1&playsinline=1&fs=0&autoplay=1&mute=1&start=${this.playerStore_checkTime}`,
          });
        }
      },
      // 자막파일 파싱
      srtParsing(link) {
        if (link.length > 0) {
          const subtitles = parser.fromSrt(link, true);
          for (let i in subtitles) {
            subtitles[i] = {
              start: subtitles[i].startTime / 1000,
              end: subtitles[i].endTime / 1000,
              text: subtitles[i].text,
            };
          }
          this.youtubeExternalSubtitle = new external_subtitle.Subtitle(
            this.$refs.content_id,
            subtitles
          );
        } else {
          this.youtubeExternalSubtitle = new external_subtitle.Subtitle(
            this.$refs.content_id,
            link
          );
        }

        // 스탑시간 구하기
        this.$store.commit("playerStore/playerState", {
          stop_time: eval(this.youtubeExternalSubtitle.onTimeChange),
        });
      },
      // 자막파일 유무
      isSrtFile() {
        this.validationCheck();
        const data = {
          action: "get_srt_file",
          course_id: this.$route.query.course_id,
          lp_id: this.$route.query.lp_id,
          idx: this.$store.state.playerStore.current_index,
        };
        console.log(this.$store.state.playerStore.current_index);
        this.$axios
          .post(this.$ApiUrl.main_list, data, {
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            if (result.data.error != true) {
              // 자막파일이 있는경우
              console.log("자막있다", result);
              this.srtParsing(result.data);
              this.$refs.video.style.marginBottom = "75px";
            } else {
              // 자막파일이 없는경우
              console.log("자막없다", result);
              this.srtParsing([]);
              this.$refs.video.style.marginBottom = "0";
            }
          });
      },
    },
    mounted() {},
  };
</script>
<style scoped lang="scss">
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
</style>
