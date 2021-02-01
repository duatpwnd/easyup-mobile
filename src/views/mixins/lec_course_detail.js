import { __decorate } from "tslib";
import { Component, Watch, Vue } from "vue-property-decorator";
let GroupMixin = class GroupMixin extends Vue {
    constructor() {
        super(...arguments);
        this.isPossibleReview = false;
        this.is_subscribe = false;
        this.subscribe_btn = false;
        this.detail = {};
        this.score_info = ""; // 각 별점의 개수
        this.url = window.document.location.href; // 클립보드 현재 url
    }
    onPropertyChanged(value, oldValue) {
        this.isSubscribe();
    }
    // 구독하기
    subscribe() {
        let data = {};
        if (this.$route.name == "lecDetail") {
            data["action"] = "subscribe_course";
            data["course_id"] = Number(this.$route.query.id);
        }
        else {
            data["action"] = "subscribe_session";
            data["session_id"] = Number(this.$route.query.id);
        }
        console.log(data);
        this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
            console.log("구독하기 성공 실패?", result);
            this.isSubscribe();
        });
    }
    // 구독 여부 조회
    async isSubscribe() {
        let data = {};
        console.log(data);
        if (this.$route.name == "lecDetail") {
            data["action"] = "check_subscribe_course";
            data["course_id"] = Number(this.$route.query.id);
        }
        else {
            data["action"] = "check_subscribe_session";
            data["session_id"] = Number(this.$route.query.id);
        }
        console.log(data);
        await this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
            console.log("구독여부", result);
            if (result.data.error != true) {
                this.is_subscribe = result.data.data.isSubscribe;
                this.isPossibleReview = result.data.data.isPossibleReview;
            }
        });
    }
    scoreCount(result) {
        console.log(result);
        this.score_info = result;
    }
    subscribe_btn_toggle() {
        if (this.$refs.subs_btn != undefined) {
            const el = this.$refs.subs_btn;
            const btn_offset_top = el.offsetTop;
            const btn_h = el.clientHeight;
            const scroll_top = window.scrollY;
            if (scroll_top > btn_offset_top + btn_h) {
                this.subscribe_btn = true;
            }
            else {
                this.subscribe_btn = false;
            }
        }
    }
    // url 복사
    share() {
        this.$noticeMessage("현재 페이지 주소가 복사되었습니다.");
    }
    // 강의바구니
    cartAdd() {
        const data = {
            action: "add_cart",
            type: this.$route.name == "lecDetail" ? "course" : "session",
            id: this.$route.query.id,
        };
        console.log(data);
        this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result) => {
            console.log(result);
            this.$noticeMessage("강의바구니에 담았습니다.");
        });
    }
    created() {
        window.onscroll = () => {
            this.subscribe_btn_toggle();
        };
    }
};
__decorate([
    Watch("detect_token")
], GroupMixin.prototype, "onPropertyChanged", null);
GroupMixin = __decorate([
    Component({
        computed: {
            detect_token() {
                return this.$store.getters["userStore/isToken"];
            },
        }
    })
], GroupMixin);
export default GroupMixin;
;
//# sourceMappingURL=lec_course_detail.js.map