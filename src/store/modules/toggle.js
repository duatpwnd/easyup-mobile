import { __decorate } from "tslib";
import { Mutation, VuexModule, Module } from 'vuex-module-decorators';
let Toggle = class Toggle extends VuexModule {
    constructor() {
        super(...arguments);
        this.more_view = false; // 내강의실 상위 메뉴
        this.mask = false; // 내강의실 메뉴 학습관리 클릭시 마스크 생성
        this.login_modal = false; // 로그인 모달
        // before_login: true, // 로그인 전 모달
        this.isFooter = true; // 푸터
        this.GnbBottomMenu = false; // 내강좌/코스, 과제게시판, 공지사항, 자료공유 메뉴
        this.ProfileMsgTab = false; // 프로필 편집 ,메세지 탭
        this.score_info = {
            review_id: "",
            score_modal: false,
            score: 0,
            score_contents: "" // 스코어 컨텐츠
        };
        this.confirm_modal = false; // 각종 확인 모달
        this.notice_modal = false; // 각종 경고 모달
        this.notice_message = ""; // 각종 경고 메세지
        this.bookmark_modal = false; // 책갈피 모달
        this.bookmark_list_info = {
            current_id: "",
            bookmark_list_modal: false // 책갈피 리스트 모달
        };
    }
    noticeMessage(state, param) {
        state.notice_message = param;
    }
    bookmarkListToggle(state, obj) {
        state.bookmark_list_info = obj;
    }
    scoreToggle(state, obj) {
        state.score_info = obj;
    }
    Toggle(state, obj) {
        console.log(typeof Object.keys(obj));
        Object.keys(obj).forEach((el, index) => {
            state[el] = Object.values(obj)[index];
        });
    }
};
__decorate([
    Mutation
], Toggle.prototype, "noticeMessage", null);
__decorate([
    Mutation
], Toggle.prototype, "bookmarkListToggle", null);
__decorate([
    Mutation
], Toggle.prototype, "scoreToggle", null);
__decorate([
    Mutation
], Toggle.prototype, "Toggle", null);
Toggle = __decorate([
    Module({ namespaced: true, name: 'toggle' })
], Toggle);
export default Toggle;
//# sourceMappingURL=toggle.js.map