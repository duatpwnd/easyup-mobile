const toggle = {
  namespaced: true,
  state: {
    login_modal: false, // 로그인 모달
    // before_login: true, // 로그인 전 모달
    isFooter: true, // 푸터
    GnbBottomMenu: false, // 내강좌/코스, 과제게시판, 공지사항, 자료공유 메뉴
    ProfileMsgTab: false, // 프로필 편집 ,메세지 탭
    score_modal: false, // 강의평가 모달
    score: 0, // 스코어점수
    notice_modal: false, // 각종 경고 모달
    notice_message: "", // 각종 경고 메세지
  },
  mutations: {
    noticeMessage(state, param) {
      state.notice_message = param;
    },
    Toggle(state, obj) {
      console.log(obj);
      Object.keys(obj).forEach((el, index) => {
        state[el] = Object.values(obj)[index];
      });
    },
  },
};

export default toggle;
