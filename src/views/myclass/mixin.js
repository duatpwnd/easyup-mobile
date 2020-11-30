let myLectureCourse = {
  data() {
    return {
      lec_course_list: "",
      current: "", //현재번호
      order: "",
      keyword: "",
    };
  },
  methods: {
    getMyCourse(action, num, order, keyword) {
      const data = {
        action: action,
        current: num == undefined ? 1 : num,
        search_status: order == undefined ? "" : order,
        keyword: keyword == undefined ? "" : keyword,
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
          console.log(result);
          this.lec_course_list = result.data.data;
          this.$router
            .push({
              query: {
                pageCurrent: num,
                order: order,
                keyword: keyword,
              },
            })
            .catch(() => {});
          this.order = order;
          this.keyword = keyword;
          this.current = num;
        });
    },
  },
  mounted() {},
  created() {},
};
export default myLectureCourse;
