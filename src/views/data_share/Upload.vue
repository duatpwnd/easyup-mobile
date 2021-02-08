<template>
  <div class="qna">
    <h2>업로드</h2>
    <div class="row">
      <label class="dt">강의선택</label>
      <select name="" id="" @change="targetSelect()" v-model="selected">
        <option value="null">강의를 선택해주세요.</option>
        <option
          :value="value"
          v-for="(list, value, key) in select_list"
          :key="key"
          >{{ list }}</option
        >
      </select>
    </div>
    <div class="row" v-if="selected != null">
      <label class="dt">구독회원 파일 공유</label>
      <select class="share_list" v-model="shared_recipients" multiple>
        <option
          :value="value"
          v-for="(list, value, key) in share_list"
          :key="key"
          >{{ list }}</option
        >
      </select>
    </div>
    <div class="row">
      <label class="dt">파일첨부</label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.gif"
        id="upload"
        ref="upload"
        @change="fileSelect()"
      />
      <label for="upload" class="file">파일 선택</label>
      <span class="file_name">{{ file_obj.name }}</span>
    </div>
    <BlueBtn>
      <button slot="blue_btn" @click="upload()">업로드</button>
    </BlueBtn>
  </div>
</template>
<script lang="ts">
  import BlueBtn from "@/components/common/BaseButton.vue";
  import { Component, Vue } from "vue-property-decorator";
  import { ResultData, BodyData } from "@/assets/js/util.ts";
  interface ExtendedBodyData extends BodyData {
    code: string;
    recipients?: string[];
    file?: File;
  }

  @Component({
    components: {
      BlueBtn,
    },
  })
  export default class Upload extends Vue {
    $refs!: {
      upload: HTMLFormElement;
    };
    file_obj = "";
    select_list = {}; // 강의선택 리스트
    selected = ""; // 강의선택 v-model
    share_list = {}; // 공유 받을사람
    shared_recipients: string[] = []; // 공유받을사람 v-model
    goToPath(): void {
      this.$router.push("/help/read");
    }
    fileSelect(): void {
      const selected_file = this.$refs.upload.files[0];
      this.file_obj = selected_file;
    }
    upload(): void {
      const formData = new FormData();
      const data: ExtendedBodyData = {
        action: "upload_dropbox_file",
        code: this.selected,
        recipients: this.shared_recipients,
        file: new File([this.file_obj], (this.file_obj as any).name, {
          type: (this.file_obj as any).type,
        }),
      };
      for (var key in data) {
        formData.append(key, JSON.stringify(data[key]));
      }
      // for (let key of formData.keys()) {
      //   console.log(key);
      // }
      // // FormData의 value 확인
      // for (let value of formData.values()) {
      //   console.log(value);
      // }
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, formData)
        .then((result: ResultData) => {
          this.$router.push({
            path: "/dataShare",
            query: {
              keyword: "",
              pageCurrent: 1 as any,
              order: "all",
            },
          });
        });
    }
    targetSelect(): void {
      const data: ExtendedBodyData = {
        action: "get_dropbox_target_select",
        code: this.selected,
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          console.log("공유받은사람:", result);
          this.share_list = result.data.data;
        });
    }
    dropBoxList(): void {
      const data = {
        action: "get_dropbox_course_select",
      };
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then((result: ResultData) => {
          console.log(result);
          this.select_list = result.data.data;
        });
    }
    created() {
      this.dropBoxList();
    }
  }
</script>
<style scoped lang="scss">
  .qna {
    padding: 4.445%;
    h2 {
      font-size: 2rem;
    }
    .blue_btn {
      margin-top: 5%;
      width: calc(100% - 35%);
      float: right;
      ::v-deep button {
        width: 70%;
      }
    }
    .row {
      margin-top: 5px;
      select {
        font-family: "NotoSansCJKkr-Regular";
        font-size: 14px;
        width: calc(100% - 35%);
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        padding: 5px 6px;
        height: 32px;
        line-height: 15px;
        box-sizing: border-box;
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat 95%
          center / 7px 5px;
      }
      .share_list {
        height: auto;
      }
      .dt {
        width: 35%;
        display: inline-block;
        font-size: 14px;
        font-family: "NotoSansCJKkr-Regular";
        .required {
          color: #114fff;
        }
      }
      input[type="file"] {
        display: none;
      }
      .file {
        height: 24px;
        color: #114fff;
        border: 1px solid #114fff;
        border-radius: 5px;
        font-size: 13px;
        width: 76px;
        display: inline-block;
        text-align: center;
        line-height: 26px;
      }
      .file_name {
        margin-left: 10px;
      }
    }
  }
</style>
