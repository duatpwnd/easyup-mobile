const toggle = {
  namespaced: true,
  state: {
    login_modal: false, // 로그인 모달
    // before_login: true, // 로그인 전 모달
    isFooter: true, // 푸터
    GnbBottomMenu: false, // 내강좌/코스, 과제게시판, 공지사항, 자료공유 메뉴
    ProfileMsgTab: false, // 프로필 편집 ,메세지 탭
    score_info: {
      review_id: "", // 댓글 수정 아이디
      score_modal: false, // 강의평가 모달
      score: 0, // 스코어점수
      score_contents: "", // 스코어 컨텐츠
    },
    confirm_modal: false, // 각종 확인 모달
    notice_modal: false, // 각종 경고 모달
    notice_message: "", // 각종 경고 메세지
    bookmark_modal: false, // 책갈피 모달
    bookmark_list_info: {
      current_id: "",
      bookmark_list_modal: false, // 책갈피 리스트 모달
    },
  },
  mutations: {
    noticeMessage(state, param) {
      state.notice_message = param;
    },
    bookmarkListToggle(state, obj) {
      state.bookmark_list_info = obj;
    },
    scoreToggle(state, obj) {
      state.score_info = obj;
    },
    Toggle(state, obj) {
      Object.keys(obj).forEach((el, index) => {
        state[el] = Object.values(obj)[index];
      });
    },
  },
};

export default toggle;
