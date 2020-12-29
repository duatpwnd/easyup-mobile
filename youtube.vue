<template>
  <div>
    <button class="book_mark" @click="video_add()">비디오 즐겨찾기 추가</button>
    <div id="video_wrap" style="width:50%">
      <video
        @click.once="test()"
        id="myvideo"
        class="video-js"
        controls
        preload="auto"
        data-setup="{
              
              }"
      >
        <source src="./test.mp4" type="video/mp4" />
        <track
          src="http://localhost:3000/static/srt/kr.vtt"
          id="my-alternate-video-track"
          kind="commentary"
          srclang="kr"
          label="한국어"
          default
        />
      </video>
    </div>
    <button class="book_mark" @click="favor_add()">유튜브 즐겨찾기 추가</button>
    <div class="container">
      <iframe
        id="video11"
        width="100%"
        :src="'https://www.youtube.com/embed/fGPPfZIvtCw'"
        frameborder="0"
        allowfullscreen="true"
      ></iframe>
    </div>
  </div>
</template>
<script>
  import parser from "@/assets/static/js/subtitles.parser.js";
  import external_subtitle from "@/assets/static/youtube.external.subtitle/youtube.external.subtitle.js";
  import srt from "raw-loader!./kr.srt";
  export default {
    components: {},
    data() {
      return {
        root: "root",
        stop_time: "",
      };
    },
    methods: {
      test() {
        console.log("test");
        this.$http.post("video/list", { id: "duatpwnd" }).then((res) => {
          videojs("myvideo").currentTime(res.data.stop_time);
        });
      },
      video_add() {
        console.log(Math.floor(videojs("myvideo").currentTime()));
        this.$http
          .post("video/add", {
            time: Math.floor(videojs("myvideo").currentTime()),
          })
          .then((res) => {
            console.log(res);
            alert("즐겨찾기가 추가되었습니다.");
          });
      },
      favor_add() {
        console.log("추가 시간:", Math.floor(this.stop_time()));
        this.$http
          .post("add", {
            time: Math.floor(this.stop_time()),
          })
          .then((res) => {
            alert("즐겨찾기가 추가되었습니다.");
          });
      },

      srt_read() {
        console.log("srt 읽기시작");
        const subtitles = parser.fromSrt(srt, true);

        for (let i in subtitles) {
          subtitles[i] = {
            start: subtitles[i].startTime / 1000,
            end: subtitles[i].endTime / 1000,
            text: subtitles[i].text,
          };
        }
        const youtubeExternalSubtitle = new external_subtitle.Subtitle(
          document.getElementById("video11"),
          subtitles
        );
        this.stop_time = eval(youtubeExternalSubtitle.onTimeChange);
      },
    },
    mounted() {
      const player = videojs("myvideo", {
        controls: true,
        autoplay: false,
        muted: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
      });
      player.fluid(true);
    },
    created() {
      this.$http.post("list", { id: "duatpwnd" }).then((res) => {
        console.log(res);
        document
          .getElementById("video11")
          .setAttribute(
            "src",
            `https://www.youtube.com/embed/fGPPfZIvtCw?start=${res.data.youtube_add_time}`
          );
        this.srt_read();
      });
    },
  };
</script>
<style lang="scss">
  .youtube-external-subtitle {
    span {
      background: red;
      border-radius: 4px;
    }
  }
  .book_mark {
    background: red;
    padding: 10px;
    color: white;
    border: 0;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .vjs-text-track-cue div {
    color: white !important;
    background: black !important;
    border-radius: 4px;
    padding: 10px;
  }
</style>
