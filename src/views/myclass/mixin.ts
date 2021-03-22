import { Vue, Component } from "vue-property-decorator";
@Component
export default class MyLectureCourse extends Vue {
  lec_course_list = "";
  current = 1; //현재번호
  order = "";
  keyword = "";
  getMyCourse(
    action: string,
    num: number,
    order: string,
    keyword: string
  ): void {
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
      .then((result: { [key: string]: any }) => {
        console.log(result, this.$route.query.view);
        this.lec_course_list = result.data.data;
        this.$router
          .push({
            query: {
              pageCurrent: num,
              order: order,
              keyword: keyword,
              view: this.$route.query.view,
            },
          })
          .catch(() => {});
        this.order = order;
        this.keyword = keyword;
        this.current = num;
      });
  }
}
