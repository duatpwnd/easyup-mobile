import { __decorate } from "tslib";
import { Vue, Component } from "vue-property-decorator";
let MyLectureCourse = class MyLectureCourse extends Vue {
    constructor() {
        super(...arguments);
        this.lec_course_list = "";
        this.current = 1; //현재번호
        this.order = "";
        this.keyword = "";
    }
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
                .catch(() => { });
            this.order = order;
            this.keyword = keyword;
            this.current = num;
        });
    }
};
MyLectureCourse = __decorate([
    Component
], MyLectureCourse);
export default MyLectureCourse;
//# sourceMappingURL=mixin.js.map