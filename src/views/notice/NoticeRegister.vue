<template>
  <div>
    <div class="row" v-if="$route.query.type == 'write'">
      <span class="left">강의 선택</span>
      <select class="select" v-model="selected">
        <option value="null">강의를 선택해주세요.</option>
        <option
          :value="value"
          v-for="(list, value, key) in select_list"
          :key="key"
          v-html="list"
        ></option>
      </select>
    </div>
    <div class="row">
      <span class="left">제목</span>
      <input
        type="text"
        v-model="title"
        placeholder="30자 이내 작성해 주세요."
      />
    </div>
    <div class="row">
      <span class="left contents">내용</span>
      <div
        contenteditable="true"
        v-html="editorData"
        class="textarea"
        ref="textarea"
      ></div>
    </div>
    <div class="row">
      <label class="left">파일 첨부</label>
      <input type="file" id="upload" ref="upload" @change="fileSelect()" />
      <label for="upload" class="file">파일 선택</label>
      <div class="file_name" v-if="file_obj != ''">{{ file_obj.name }}</div>
    </div>
    <div class="file_wrap" v-if="file_list != null">
      <span class="oname">
        {{ file_list.filename }}
      </span>
      <span class="file_del" @click="fileDelete(file_list.filename)">x</span>
    </div>
    <div class="row">
      <span class="left"></span>
      <button class="save_btn" @click="send()">공지 보냄</button>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class NoticeRegister extends Vue {
    $refs!: {
      textarea: HTMLTextAreaElement;
      upload: HTMLFormElement;
    };
    private file_list: { [key: string]: any } | null = null;
    private view = "";
    private title = "";
    private selected = null; // 강의선택 v-model
    private editorData = ""; // 에디터 v-model
    private file_obj = "";
    private select_list = {};
    private fileDelete(filename: string): void {
      console.log(filename);
      const data = {
        action: "delete_notice_attached_file",
        id: (this.file_list as { [key: string]: any }).id,
        course_id: this.$route.query.c_id,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.read();
        });
    }
    private fileSelect(): void {
      const selected_file = this.$refs.upload.files[0];
      this.file_obj = selected_file;
    }
    private dropBoxList(): void {
      const data = {
        action: "get_approved_courses",
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          console.log(result);
          this.select_list = result.data.data;
        });
    }
    private send(): void {
      this.validationCheck().then((result) => {
        if (result == "success") {
          console.log("유효성 검사 통과");
          const formData = new FormData();
          let data = {
            action: "add_notice",
            subject: this.title,
            contents: this.$refs.textarea.innerText.trim(),
            add_file: this.file_obj,
            mode: this.$route.query.type,
          };
          if (this.$route.query.type == "modify") {
            let modify = {
              id: this.$route.query.id,
              course_id: this.$route.query.c_id,
            };
            data = { ...data, ...modify };
          } else {
            let write = {
              course_id: this.selected,
            };
            data = { ...data, ...write };
          }
          console.log(data);
          for (let key in data) {
            formData.append(key, data[key as never]);
          }
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: this.$cookies.get("user_info")
                  ? "Bearer " + this.$cookies.get("user_info").access_token
                  : null,
              },
            })
            .then((result: { [key: string]: any }) => {
              console.log(result);
              // normal은 협력 기업페이지
              this.$router.push({
                path: "/notice/list",
                query: {
                  view: this.$route.query.view,
                  order: "all",
                  pageCurrent: 1,
                  keyword: "",
                },
              });
            });
        }
      });
    }
    private validationCheck(): Promise<string> {
      return new Promise((resolve, reject) => {
        if (this.$route.query.type == "write" && this.selected == null) {
          this.$noticeMessage("강의를 선택해주세요");
        } else if (this.title.trim().length == 0) {
          this.$noticeMessage("제목을 입력하세요");
        } else {
          resolve("success");
        }
      });
    }
    private read(): void {
      const data: { action: string; id: number; course_id: number } = {
        action: "get_my_notice_info",
        id: this.$route.query.id,
        course_id: this.$route.query.c_id,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: { [key: string]: any }) => {
          if (result.data.data.attachment_list != undefined) {
            this.file_list = result.data.data.attachment_list;
          } else {
            this.file_list = null;
          }
          this.view = result.data.data;
          this.title = result.data.data.subject;
          this.editorData = result.data.data.content;
        });
    }
    created() {
      if (this.$route.query.type == "write") {
        console.log("글쓰기");
        this.dropBoxList();
      } else {
        console.log("글수정");
        this.read();
      }
    }
  }
</script>
<style scoped lang="scss">
  .title {
    font-size: 2rem;
  }
  .row {
    display: table;
    width: 100%;
    margin-top: 2%;
    .select {
      outline: none;
      width: 100%;
      text-overflow: ellipsis;
      border-radius: 5px;
      border: 1px solid #dbdbdb;
      padding: 2.403% 10% 2.403% 4%;
      font-size: 1.5rem;
      background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 95%
        center / 12px 9px;
    }
    span {
      font-size: 1.5rem;
      display: table-cell;
      width: 25.5%;
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
    .left {
      font-size: 1.5rem;
      display: table-cell;
      width: 25.5%;
      vertical-align: middle;
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
  }
  .file_wrap {
    margin-top: 2%;
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
</style>
