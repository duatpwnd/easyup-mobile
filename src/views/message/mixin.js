let mixin = {
  methods: {
    all_check() {
      this.allCheck = !this.allCheck;
      if (this.allCheck) {
        console.log(this.list.list);
        this.list.list.forEach((el, index) => {
          this.checked_list.push(el.id);
        });
      } else {
        this.checked_list = [];
      }
    },
    // 부분체크
    partial_check() {
      if (this.list.list.length != this.checked_list.length) {
        this.allCheck = false;
      } else {
        this.allCheck = true;
      }
    },
    goToPath(url) {
      this.$router.push(url).catch(() => {});
    },
    deleteMessage(type) {
      const data = {
        action: "delete_message",
        type: type,
        id: this.checked_list,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.main_list, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
          console.log("메시지", result);
          this.getList(type, 1, "");
          this.allCheck = false;
          //   this.$Util.default.noticeMessage(result.data.data[0]);
        });
    },
    getList(type, num, keyword) {
      const data = {
        action: "get_message_list",
        type: type,
        current: num, //필수
        keyword: keyword, //옵션
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.main_list, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
          console.log("메시지", result);
          this.list = result.data.data;
          this.$router
            .push({
              query: {
                pageCurrent: num,
                keyword: keyword,
              },
            })
            .catch(() => {});
          this.keyword = keyword;
          this.current = num;
        });
    },
  },
  data() {
    return {
      list: "",
      keyword: "",
      current: "",
      checked_list: [],
      allCheck: false,
    };
  },
};
export default mixin;
