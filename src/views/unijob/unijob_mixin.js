let unijob_common = {
  data() {
    return {
      view: "",
      title: "",
      editorData: "", // 에디터 v-model
      file_list: "",
    };
  },
  methods: {
    read(id) {
      const data = {
        action: "get_unijob_info",
        type: this.$route.query.type,
        id: id,
      };
      this.$axios
        .post(this.$ApiUrl.main_list, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
          this.view = result.data.data.info;
          // 답글 수정일때는 re:를 치환하지 않아도 되기때문에 나누어줌

          if (this.$route.query.action == "write") {
            this.title = this.view.title;
            // 수정일때만 파일리스트
            this.file_list = this.view.attach;
          } else {
            const re = this.view.title.match(/re:/);
            /* 답글 처음다는글은 re가 없기때문에 re가 있는지 없는지 체크
               처음이면 [re]를 강제로 붙여주기
            */
            if (re == null) {
              const reps = this.view.title.replace(
                this.view.title,
                `[re] ${this.view.title}`
              );
              this.title = reps;
            } else {
              const reps = this.view.title
                .replace(/re:/g, "[re]")
                .replace("[re]", "[re] [re]");
              this.title = reps;
            }
          }
          this.editorData = this.view.content;
        });
    },
  },
  mounted() {},
  created() {},
};
export default unijob_common;
