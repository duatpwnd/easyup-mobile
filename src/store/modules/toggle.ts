import { Module, VuexModule, Mutation } from "vuex-module-decorators";
interface KeysType {
  more_view: string;
}
// 스코어 인터페이스
interface ScoreInfo {
  review_id: string;
  score_modal: boolean;
  score: number;
  score_contents: string;
}
// 책갈피 인터페이스
interface Bookmark {
  current_id: string;
  bookmark_list_modal: boolean;
}
@Module({ namespaced: true, name: "Toggle" })
export default class Toggle extends VuexModule {
  more_view = false; // 내강의실 상위 메뉴
  mask = false; // 내강의실 메뉴 학습관리 클릭시 마스크 생성
  login_modal = false; // 로그인 모달
  isFooter = true; // 푸터
  GnbBottomMenu = false; // 내강좌/코스, 과제게시판, 공지사항, 자료공유 메뉴
  ProfileMsgTab = false; // 프로필 편집 ,메세지 탭
  score_info = {
    review_id: "", // 댓글 수정 아이디
    score_modal: false, // 강의평가 모달
    score: 0, // 스코어점수
    score_contents: "", // 스코어 컨텐츠
  };
  confirm_modal = false; // 각종 확인 모달
  cart_modal = false; // 장바구니 이동 모달
  notice_modal = false; // 각종 경고 모달
  notice_message = ""; // 각종 경고 메세지
  purchase_apply = false; // 강의 상세페이지 구매하기 버튼 클릭시 모달
  bookmark_modal = false; // 책갈피 모달
  bookmark_list_info = {
    current_id: "",
    bookmark_list_modal: false, // 책갈피 리스트 모달
  };
  @Mutation
  noticeMessage(msg: string): void {
    this.notice_message = msg;
  }
  @Mutation
  bookmarkListToggle(obj: Bookmark): void {
    this.bookmark_list_info = obj;
  }
  @Mutation
  scoreToggle(obj: ScoreInfo): void {
    this.score_info = obj;
  }
  @Mutation
  Toggle(obj: { [key: string]: any }): void {
    Object.keys(obj).forEach((el: string, index: number) => {
      this[el as keyof KeysType] = Object.values(obj)[index];
    });
  }
}
