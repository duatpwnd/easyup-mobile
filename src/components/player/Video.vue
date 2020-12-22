<template>
  <div
    class="video"
    :style="[{ 'margin-bottom': is_srt ? '75px' : '0' }]"
    v-if="playerStore_custom_type == 'youtube'"
  >
    <iframe
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
  <div class="download" v-else-if="playerStore_custom_type == 'download'">
    <h3>강의 자료입니다.</h3>
    <h3>다운로드 하여 확인하세요.</h3>
    <BaseBtn>
      <button slot="blue_btn" @click="download(playerStore_current_item_id)">
        다운로드
      </button>
    </BaseBtn>
  </div>
</template>
<script>
  import parser from "@/assets/js/youtube/subtitles.parser.js";
  import external_subtitle from "@/assets/js/youtube/youtube_external_subtitle.js";
  import { mapState, mapMutations } from "vuex";
  import BaseBtn from "@/components/common/BaseButton.vue";

  export default {
    components: {
      BaseBtn,
    },

    data() {
      return {
        youtubeExternalSubtitle: null,
        is_srt: false,
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
        playerStore_current_item_id: "current_item_id",
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
      getFileName(contentDisposition) {
        let fileName = contentDisposition
          .split(";")
          .filter((ele) => {
            console.log(ele);
            return ele.indexOf("filename") > -1;
          })
          .map((ele) => {
            console.log(ele);
            return ele.replace(/"/g, "").split("=")[1];
          });
        return fileName[0] ? fileName[0] : null;
      },
      download(item_id) {
        const data = {
          action: "download_lecture_data",
          course_id: this.$route.query.course_id,
          lp_id: this.$route.query.lp_id,
          item_id: item_id,
        };
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, data, {
            responseType: "blob",
            headers: {
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            if (window.navigator.msSaveOrOpenBlob) {
              // IE 10+
              window.navigator.msSaveOrOpenBlob(
                result.data,
                this.getFileName(result.headers["content-disposition"])
              );
            } else {
              // not IE
              let link = document.createElement("a");
              link.href = window.URL.createObjectURL(result.data);
              link.target = "_self";
              link.download = this.getFileName(
                result.headers["content-disposition"]
              );
              link.click();
              window.URL.revokeObjectURL(result.data);
            }
          });
      },
      validationCheck() {
        const link = this.playerStore_current_link;
        // 북마크 시간 있는지 없는지
        console.log(this.playerStore_checkTime);
        if (this.playerStore_checkTime != "") {
          console.log(link, this.playerStore_checkTime);
          // 스타트 옵션
          this.$store.commit("playerStore/playerState", {
            current_link:
              link.replace(
                `start=${link.split("start=")[1]}`,
                `start=${this.playerStore_checkTime}`
              ) + `&autoplay=1&mute=1`,
          });
          console.log(this.playerStore_current_link);
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
        this.$axios.post(this.$ApiUrl.mobileAPI_v1, data).then((result) => {
          if (result.data != "") {
            // 자막파일이 있는경우
            this.srtParsing(result.data);
            this.is_srt = true;
          } else {
            // 자막파일이 없는경우
            this.srtParsing([]);
            this.is_srt = false;
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
  .download {
    background: #f8f8f8;
    padding: 22px;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    ::v-deep .blue_btn {
      text-align: center;
      button {
        background: white;
        color: #114fff;
        width: 21%;
        height: 24px;
        line-height: 15px;
        margin-top: 12px;
      }
    }
  }
</style>
