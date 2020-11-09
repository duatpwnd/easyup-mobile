<template>
  <div class="msg_send">
    <h2 class="title" v-if="$route.query.type == 'notice'">공지사항 등록</h2>
    <h2 class="title" v-else-if="$route.query.type == 'normal'">
      협력기업 등록
    </h2>
    <h2 class="title" v-else>이력서 등록</h2>
    <div class="row">
      <span class="left">제목</span>
      <input type="text" v-model="title" />
    </div>
    <div class="row">
      <span class="left contents">내용</span>
      <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
    </div>

    <div class="row">
      <span class="left">파일 첨부</span>
      <input type="file" id="upload" ref="upload" @change="fileSelect()" />
      <label for="upload" class="file">파일 선택</label>
      <div class="file_name" v-if="file_obj != ''">{{ file_obj.name }}</div>
    </div>
    <div v-if="file_list != false">
      <div class="file_wrap" v-for="(list, index) in file_list" :key="index">
        <span class="oname">
          {{ list.oname }}
        </span>
        <span class="file_del" @click="fileDelete(list.oname)">x</span>
      </div>
    </div>
    <div class="row">
      <span class="left"></span>
      <button class="save_btn" @click="send()">등록</button>
    </div>
  </div>
</template>
<script>
  import mixin from "./unijob_mixin.js";
  import { mapState, mapMutations } from "vuex";
  export default {
    mixins: [mixin],
    data() {
      return {
        file_obj: "",
        editorConfig: {
          // The configuration of the editor.
        },
      };
    },
    computed: {
      ...mapState("userStore", {
        userStore_userinfo: "userinfo",
      }),
    },
    methods: {
      send() {
        this.validationCheck().then((result) => {
          if (result == "success") {
            console.log(this.$route.query.is_notice);
            const formData = new FormData();
            const data = {
              action: "add_unijob",
              type: this.$route.query.type,
              is_notice: this.$route.query.is_notice == "true" ? "on" : "off",
              subject: this.title,
              id: this.$route.query.id ? this.$route.query.id : "",
              contents: this.editorData,
              add_file: this.file_obj,
              mode:
                this.$route.query.action == "reply"
                  ? "reply"
                  : this.$route.query.action == "write"
                  ? "modify"
                  : "write",
            };
            for (var key in data) {
              formData.append(key, data[key]);
            }
            this.$axios
              .post(this.$ApiUrl.main_list, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: this.$cookies.get("user_info")
                    ? "Bearer " + this.$cookies.get("user_info").access_token
                    : null,
                },
              })
              .then((result) => {
                console.log(result);
                // normal은 협력 기업페이지
                this.$router.push({
                  path: `/uniJob/${this.$route.query.type}`,
                  query: {
                    pageCurrent: 1,
                    keyword: "",
                  },
                });
              });
          }
        });
      },
      fileDelete(filename) {
        const data = {
          action: "delete_attached_file",
          type: this.$route.query.type,
          id: this.$route.query.id,
          filename: filename,
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.read(this.$route.query.id);
          });
      },
      fileSelect() {
        const selected_file = this.$refs.upload.files[0];
        this.file_obj = selected_file;
      },
      validationCheck() {
        return new Promise((resolve, reject) => {
          if (this.title.trim().length == 0) {
            this.$noticeMessage("제목을 입력하세요");
          } else if (this.editorData.trim().length == 0) {
            this.$noticeMessage("내용을 입력하세요");
          } else {
            resolve("success");
          }
        });
      },
    },

    created() {
      if (
        this.$route.query.action == "write" ||
        this.$route.query.action == "reply"
      ) {
        this.read(this.$route.query.id);
      }
    },
  };
</script>
<style scoped lang="scss">
  .msg_send {
    padding: 4.445%;
    .title {
      font-size: 2rem;
    }
    .notice {
      margin-left: 25.5%;
      margin-top: 2%;
      font-size: 1.5rem;
    }
    .received_list_wrap {
      margin-left: 25.5%;
      margin-top: 2%;
      background: #efefef;

      li {
        font-size: 1.5rem;
        padding: 2%;
      }
      .active {
        background: #114fff;
        color: white;
      }
    }
    .row {
      display: table;
      width: 100%;
      margin-top: 3%;

      .readonly {
        border: 0;
        padding-left: 0;
      }
      .search_contents {
        width: 100%;
        margin-left: 0;
        line-height: unset;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        padding: 2.403% 4%;
        box-sizing: border-box;
        .inputcontainer {
          position: relative;
          width: 30%;
          .icon-container {
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 12px;
          }
          .loader {
            position: relative;
            height: 12px;
            width: 12px;
            display: inline-block;
            animation: around 5.4s infinite;
          }

          @keyframes around {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .loader::after,
          .loader::before {
            content: "";
            background: white;
            position: absolute;
            display: inline-block;
            width: 100%;
            height: 100%;
            border-width: 2px;
            border-color: #333 #333 transparent transparent;
            border-style: solid;
            border-radius: 20px;
            box-sizing: border-box;
            top: 0;
            left: 0;
            animation: around 0.7s ease-in-out infinite;
          }

          .loader::after {
            animation: around 0.7s ease-in-out 0.1s infinite;
            background: transparent;
          }
          .search_input {
            width: 100%;
            padding: 0;
            outline: none;
          }
        }
        .selected_list {
          &::after {
            display: block;
            content: "";
            clear: both;
          }
          line-height: 30px;
          margin-top: 5px;
          .list {
            float: left;
            .name {
              background-color: #e4e4e4;
              border: 1px solid #aaa;
              font-size: 10px;
              padding: 5px;
              border-radius: 4px;
              vertical-align: middle;
            }
            .close_btn {
              margin-left: 5px;
              vertical-align: middle;
            }
          }
        }
      }

      .multiple {
        height: 200px;
      }
      .left {
        font-size: 1.5rem;
        display: table-cell;
        width: 25.5%;
        vertical-align: middle;
      }
      .contents {
        vertical-align: top;
      }
      input {
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
      input[type="file"] {
        display: none;
      }
      .file {
        width: auto;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 1.5rem;
        padding: 0.763% 5.946%;
      }
      .file_name {
        margin-top: 10px;
        font-size: 12px;
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
    .file_wrap {
      margin-left: 25.5%;
      color: #999999;
      font-size: 1rem;
      .oname,
      .file_del {
        font-size: 10px;
        vertical-align: middle;
      }
      .file_del {
        width: 12px;
        height: 12px;
        display: inline-block;
        border: 1px solid black;
        margin-left: 2px;
        font-size: 10px;
        line-height: 11px;
        text-align: center;
      }
    }
  }
</style>
