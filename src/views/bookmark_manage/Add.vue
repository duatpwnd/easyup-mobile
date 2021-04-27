<template>
  <div class="bookmark_add" v-if="Object.keys(info).length > 0">
    <div class="row">
      <span class="left ">
        책갈피
      </span>
      <span class="right">
        <span class="unique">[{{ info.course_name }}]</span>
        <span v-html="info.section_name"></span>
        <span v-html="info.title"></span>
      </span>
    </div>
    <div class="row">
      <span class="left">
        타임라인
      </span>
      <BlueBtn>
        <button
          @click="
            $store.commit('playerStore/playerState', {
              check_time:
                $hms_to_s(info.check_point) == 0
                  ? 1
                  : $hms_to_s(info.check_point),
            });
            $router.push({
              path: '/play',
              query: {
                course_id: info.c_id,
                lp_id: info.lp_id,
                iid: info.iid,
                linkType: 'bookmark',
              },
            });
          "
          slot="blue_btn"
        >
          {{ info.check_point }}
        </button>
      </BlueBtn>
    </div>
    <div class="row">
      <span class="left contents">메모</span>
      <div
        contenteditable="true"
        v-html="editorData"
        class="textarea"
        ref="textarea"
      ></div>
    </div>
    <div class="row">
      <span class="left"></span>
      <button class="save_btn" @click="bookmarkAdd()">등록</button>
    </div>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { Vue, Component } from "vue-property-decorator";
  @Component({
    components: {
      BlueBtn,
    },
  })
  export default class Add extends Vue {
    $refs!: {
      textarea: HTMLTextAreaElement;
    };
    private editorData = "";
    private info: { [key: string]: any } = {};
    private bookmarkRead(): void {
      const data = {
        action: "get_bookmark_info",
        id: this.$route.query.id, //게시물ID
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result.data);
          this.info = result.data.data.info;
          this.info.check_point = this.$getTimeStringSeconds(
            this.info.check_point
          );
          if (this.$route.query.mode == "modify") {
            this.editorData = this.info.contents;
          }
        });
    }
    private bookmarkAdd(): void {
      const data = {
        action: "edit_bookmark",
        id: this.$route.query.id,
        contents: this.$refs.textarea.innerText.trim(),
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          if (result.data.data.result == 1) {
            this.$router.push({
              path: "/bookmarkManage",
              query: {
                keyword: "",
                pageCurrent: 1,
                order: "course_name",
                view: this.$route.query.view,
              },
            });
          }
        });
    }
    created() {
      this.bookmarkRead();
    }
  }
</script>
<style scoped lang="scss">
  .bookmark_add {
    .row {
      display: table;
      width: 100%;
      margin-top: 10px;

      .left {
        font-size: 1.5rem;
        display: table-cell;
        width: 25.5%;
      }
      .right {
        @extend .left;
        width: 76.5%;
        .unique {
          color: #114fff;
        }
        span {
          display: inline-block;
        }
      }
      .blue_btn {
        width: 40%;
      }
      .contents {
        vertical-align: top;
      }
      input,
      .textarea {
        width: 100%;
        font-size: 1.5rem;
        color: black;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        padding: 2.403% 4%;
        box-sizing: border-box;
        &::placeholder {
          color: #dbdbdb;
        }
      }
      .textarea {
        height: 300px;
        overflow: auto;
      }
      .save_btn {
        color: #ffffff;
        font-size: 1.75rem;
        background: #114fff;
        border-radius: 4px;
        width: 60%;
        padding: 1.5% 0;
        margin-top: 3%;
      }
    }
  }
</style>
