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
<script lang="ts">
  import { Component, Watch, Vue } from "vue-property-decorator";
  import parser from "@/assets/js/youtube/subtitles.parser.js";
  import external_subtitle from "@/assets/js/youtube/youtube_external_subtitle.js";
  import { mapState, mapMutations } from "vuex";
  import BaseBtn from "@/components/common/BaseButton.vue";
  interface ResultedData<T> {
    data: T;
  }
  interface BodyData {
    action: string;
    course_id: number;
    lp_id: number;
    item_id?: number;
    idx?: number;
  }
  interface YoutubeSubtitle {
    onTimeChange: Function;
  }
  @Component({
    computed: {
      current_link(): string {
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
    components: {
      BaseBtn,
    },
  })
  export default class Video extends Vue {
    youtubeExternalSubtitle!: YoutubeSubtitle;
    is_srt = false;
    playerStore_current_link!: string;
    playerStore_checkTime!: number | undefined | string;
    playerStore_current_item_id!: number;
    @Watch("current_link")
    onPropertyChanged(newValue: string, oldValue: string) {
      if (newValue != oldValue) {
        console.log(newValue, oldValue);
        this.isSrtFile();
      }
    }
    getFileName(contentDisposition: string): string | null {
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
    }
    download(item_id: Number): void {
      const data: BodyData = {
        action: "download_lecture_data",
        course_id: Number(this.$route.query.course_id),
        lp_id: Number(this.$route.query.lp_id),
        item_id: Number(item_id),
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
              this.getFileName(result.headers["content-disposition"]) as string
            );
          } else {
            // not IE
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(result.data);
            link.target = "_self";
            link.download = this.getFileName(
              result.headers["content-disposition"]
            ) as string;
            link.click();
            window.URL.revokeObjectURL(result.data);
          }
        });
    }
    validationCheck() {
      const link = this.playerStore_current_link;
      // 북마크 시간 있는지 없는지
      if (this.playerStore_checkTime != "") {
        console.log(link, this.playerStore_checkTime);
        // 스타트 옵션
        this.$store.commit("playerStore/playerState", {
          current_link:
            link.replace(
              `start=${link.split("start=")[1]}`,
              `start=${this.playerStore_checkTime}`
            ) + `&autoplay=1&mute=1`,
          check_time: "",
        });
      }
    }
    // 자막파일 파싱
    srtParsing<T>(link: T) {
      if (typeof link === "string" && link.length > 0) {
        const subtitles: {
          start: number;
          end: number;
          text: string;
        }[] = parser.fromSrt(link, true);
        for (let i in subtitles) {
          subtitles[i] = {
            start: subtitles[i]["startTime"] / 1000,
            end: subtitles[i]["endTime"] / 1000,
            text: subtitles[i]["text"],
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
        stop_time: this.youtubeExternalSubtitle.onTimeChange,
      });
    }

    // 자막파일 유무
    isSrtFile() {
      this.validationCheck();
      const data: BodyData = {
        action: "get_srt_file",
        course_id: Number(this.$route.query.course_id),
        lp_id: Number(this.$route.query.lp_id),
        item_id: Number(this.playerStore_current_item_id),
        idx: Number(this.$store.state.playerStore.current_index),
      };

      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, data)
        .then((result: ResultedData<string | "">) => {
          console.log(result);
          if (result.data != "") {
            // 자막파일이 있는경우
            this.srtParsing<string>(result.data);
            this.is_srt = true;
          } else {
            // 자막파일이 없는경우
            this.srtParsing<null[]>([]);
            this.is_srt = false;
          }
        });
    }
  }
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
