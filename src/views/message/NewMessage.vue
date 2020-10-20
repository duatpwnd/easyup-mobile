<template>
  <div class="msg_send">
    <h2 class="title">메시지 발송</h2>
    <div class="row">
      <span class="left">받는 분</span>
      <Search>
        <input
          v-on:input="keyword = $event.target.value"
          slot="slot_input"
          class="search_contents"
          @keyup="search()"
          placeholder="검색어를 입력하세요."
        />
      </Search>
      <!-- 선택된사람 -->
      <div v-if="choice_list.length > 0">
        <ul>
          <li v-for="(list, index) in choice_list" :key="index">
            {{ list.text }}<button @click="close(list.id)">X</button>
          </li>
        </ul>
      </div>
      <ul v-if="received_list.length > 0" style="background:gold;">
        <li
          v-for="(list, index) in received_list"
          :key="index"
          @click="choice(list)"
        >
          {{ list.text }}
        </li>
      </ul>

      <p class="notice" v-if="keyword.length < 3 && keyword.length > 0">
        3글자 이상 입력해주세요.
      </p>
      <p class="notice" v-if="search_result">
        결과가 없습니다.
      </p>
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
      <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
    </div>

    <div class="row">
      <span class="left">파일 첨부</span>
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
    <div class="row">
      <span class="left"></span>
      <button class="save_btn" @click="send()">발송</button>
    </div>
  </div>
</template>
<script>
  import Search from "@/components/common/Search.vue";

  export default {
    components: { Search },
    data() {
      return {
        title: "",
        choice_list: [], // 선택된사람
        received_list: [], // 받는사람 찾기
        keyword: "", // 검색부분 v-model
        file_obj: "", // 파일객체
        search_result: false,
        editorData: "", // 에디터 v-model
        editorConfig: {
          // The configuration of the editor.
        },
      };
    },
    methods: {
      // 선택된사람 다시 빼기
      close(id) {
        const find_item = this.choice_list.find((item) => {
          return item.id === id;
        });
        console.log(find_item);
        const idx = this.choice_list.indexOf(find_item);
        const result = this.choice_list.splice(idx, 1);
        console.log(result);
      },
      // 선택된사람
      choice(list) {
        console.log(list);
        this.choice_list.push(list);
        this.choice_list = Array.from(new Set(this.choice_list));
        console.log(this.choice_list);
      },
      search() {
        this.search_result = false;
        const data = {
          action: "find_user",
          keyword: this.keyword,
        };
        if (this.keyword.length > 2) {
          this.$axios
            .post(this.$ApiUrl.main_list, JSON.stringify(data), {
              headers: {
                Authorization: this.$cookies.get("user_info")
                  ? "Bearer " + this.$cookies.get("user_info").access_token
                  : null,
              },
            })
            .then((result) => {
              console.log(result);
              if (result.data.data.items.length == 0) {
                this.search_result = true;
              } else {
                this.received_list = result.data.data.items;
              }
            });
        }
      },
      send() {
        const data = {
          action: "send_message",
          users: [],
          title: this.title,
          content: this.editorData,
          attach_1: this.file_obj,
        };
        const map = this.choice_list.map((el, index) => {
          return el.id;
        });
        data.users = map;
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.main_list, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$cookies.get("user_info")
                ? "Bearer " + this.$cookies.get("user_info").access_token
                : null,
            },
          })
          .then((result) => {
            console.log(result);
            if (result.data.data.fail == 0) {
              this.$router.push({
                path: "/msg/receivedList",
                query: {
                  pageCurrent: 1,
                  keyword: "",
                },
              });
            }
          });
      },
      fileSelect() {
        const selected_file = this.$refs.upload.files[0];
        this.file_obj = selected_file;
      },
      validationCheck() {
        return new Promise((resolve, reject) => {
          if (this.new_password != this.new_password_confirm) {
            this.$Util.default.noticeMessage("비밀 번호가 서로 다릅니다.");
          } else {
            resolve("success");
          }
        });
      },
    },
  };
</script>
<style scoped lang="scss">
  .msg_send {
    padding: 4.445%;
    .title {
      font-size: 2rem;
    }
    .row {
      display: table;
      width: 100%;
      margin-top: 2%;
      .search {
        margin-top: 0;
        .search_contents {
          width: 100%;
          margin-left: 0;
          line-height: unset;
        }
      }
      .multiple {
        height: 200px;
      }
      span {
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
        width: 50%;
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
