<template>
  <div id="signup">
    <h2>회원가입 : 학생</h2>
    <p class="noti">강사로 등록 희망하시는 분은 고객센터로 연락 주세요.</p>
    <!-- <div class="sns-login">
      <span class="login-title">SNS 로그인</span>
      <span class="sns-login-btn">
        <img
          src="@/assets/images/main/icon_kakao.png"
          alt="카카오로그인"
          title="카카오로그인"
        />
        <img
          src="@/assets/images/main/icon_naver.png"
          alt="네이버로그인"
          title="네이버로그인"
        />
        <img
          src="@/assets/images/main/icon_google.png"
          alt="구글로그인"
          title="구글로그인"
        />
      </span>
    </div> -->
    <form class="signup-form">
      <legend>회원가입</legend>
      <fieldset>
        <div class="row">
          <label class="dt" for="last_name"
            >성<span class="required">＊</span></label
          >
          <input v-model="lastname" type="text" id="last_name" />
        </div>
        <div class="row">
          <label class="dt" for="first_name"
            >이름<span class="required">＊</span></label
          >
          <input v-model="firstname" type="text" id="first_name" />
        </div>
        <div class="row">
          <label class="dt" for="userid"
            >아이디<span class="required">＊</span></label
          >
          <input v-model="userid" type="text" id="userid" />
        </div>
        <div class="row">
          <label class="dt" for="pw"
            >비밀번호<span class="required">＊</span></label
          >
          <input v-model="pw1" type="password" id="pw" />
        </div>
        <div class="row">
          <label class="dt" for="re_pw"
            >비밀번호 확인<span class="required">＊</span></label
          >
          <input v-model="pw2" type="password" id="re_pw" />
        </div>
        <div class="row">
          <label class="dt" for="email"
            >이메일<span class="required">＊</span></label
          >
          <input v-model="email" type="text" id="email" />
          <p
            class="email-notice"
            v-if="emailValidation == false && email.trim().length > 0"
          >
            이메일이 유효 하지 않습니다.
          </p>
        </div>

        <div class="row">
          <label class="dt phone-title"
            >연락처<span class="required">＊</span></label
          >
          <div class="phone">
            <input v-model="phone" type="number" id="phone" />
            <button
              type="button"
              class="submit-btn"
              @click="phoneAuth()"
              v-if="time == 0"
            >
              전송
            </button>
            <button type="button" class="submit-btn" @click="reSend" v-else>
              재전송
            </button>
          </div>
          <p class="auth-phone-msg" v-if="isWait">
            1분 후에 인증번호를 발송할 수 있습니다.
          </p>
        </div>
        <div class="row">
          <label class="dt phone-title">인증번호</label>
          <div class="phone">
            <input v-model="certInput" type="number" id="auth" />
            <button type="button" class="submit-btn" @click="certIsPass()">
              인증
            </button>
          </div>
          <div class="timer" v-if="isTimer">{{ prettyTime | prettify }}</div>
        </div>
        <div class="row">
          <label class="dt address">주소</label>
          <Search>
            <input
              type="text"
              v-model="address"
              slot="slot_input"
              class="search_contents"
            />
            <button
              slot="search_btn"
              class="search_btn"
              @click="isOpen = true"
              type="button"
            ></button>
          </Search>
          <div class="address-search" v-if="isOpen" @click="isOpen = false">
            <vue-daum-postcode @complete="onComplete" />
          </div>
        </div>
        <div class="row">
          <label class="dt">상세주소</label>
          <input v-model="detailAddress" type="text" />
        </div>
        <div class="row">
          <label class="dt">생년월일</label>
          <SelectYYMMDD @birthday="birthdaySet"></SelectYYMMDD>
        </div>
        <div class="row agree-line">
          <label class="dt">서비스 이용약관</label>
          <textarea
            name=""
            readonly
            disabled
            rows="3"
            placeholder='서비스 이용약관

1장. 약관 및 계약

제1조. 목적

이 이용약관(이하 ‘약관’)은 유니윌(이하 ‘회사’)이 제공하는 이지업(easyupclass.com) 및 이지업 관련 제반 서비스(이하 ‘서비스’)를 이용함에 있어 이지업과 회원의 권리와 의무, 책임사항을 규정함을 그 목적으로 합니다.

제2조. 용어의 정의
1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
a. “서비스”라 함은 “회원” 혹은 웹사이트 방문자가 이용할 수 있는 이지업 서비스를 의미합니다.
b. “회원”이란 “회사”의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 “회사”가 제공하는 “서비스”를 이용하는 고객을 말합니다.
c. “아이디(ID)”라 함은 회원의 식별 및 서비스 이용을 위하여 회원의 신청에 따라 회사가 회원 별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
d. “이메일”은 회원가입이나 로그인 등에 사용되는 단일한 이메일 주소를 말합니다.
e. “비밀번호(Password)”란 아이디(ID)로 식별되는 회원의 본인 여부를 검증하기 위하여 회원이 설정하여 회사에 등록한 고유의 문자와 숫자의 조합을 말합니다.
f. “유료서비스”라 함은 회사가 유료로 제공하는 각종 온라인디지털콘텐츠(동영상 강의 열람, 프리미엄 교육 정보, 기타 유료 콘텐츠를 포함.) 및 제반 서비스를 의미합니다.
g. “게시물”이라 함은 “회원”이 “서비스”를 이용함에 있어 “서비스” 상에 게시한 글, 사진, 동영상 및 각종 파일과 링크를 의미합니다.
h. 위 항에서 정의되지 않은 약관 상의 용어의 의미는 일반적인 거래관행에 따릅니다.

제3조. 약관 효력 및 변경
1. "회사”는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 회원 가입 화면 및 서비스 초기 화면 또는 링크로 연결된 화면에 게시합니다.
2. “회사”는 “전자상거래 등에서의 소비자보호에 관한 법률”, “약관의 규제에 관한 법률”, “전자문서 및 전자거래기본법”, “전자금융거래법”, “전자서명법”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률”, “소비자기본법” 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
3. "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한 약관의 개정의 경우에는 최소 30일 전에 공지 하고, 서비스 내 메시지 또는 “회원” 이메일 및 휴대폰 문자메시지(SMS) 등의 전자적 수단을 통해 개별적으로 명확히 통지하도록 합니다.
4. 회원은 변경된 약관에 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우 언제든지 자유롭게 서비스 이용을 중단하고 탈퇴할 수 있습니다. 다만, 효력발생일까지 탈퇴를 하지 않은 경우 개정된 약관에 동의한 것으로 간주합니다
5. “회원”이 개정약관의 적용에 동의하지 않는 경우 “회사”는 개정 약관의 내용을 적용할 수 없으며, 이 경우 “회사” 또는 “회원”은 이용계약을 해지할 수 있습니다.

제4조 . 약관 외 준칙
이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 『전자상거래 등에서의 소비자 보호에 관한 법률』, 『약관의 규제에 관한 법률』, 공정거래위원회가 정하는 『전자상거래 등에서의 소비자 보호지침』 및 관계법령 및 상관례에 따릅니다.

제5조. 이용계약 체결
1. 이용계약은 “회원”이 되고자 하는 자(이하 “가입신청자”)가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 “회사”가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
2. “회사”는 “가입신청자”의 신청에 대하여 “서비스” 이용을 승낙함을 원칙으로 합니다. 다만, “회사”는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
a. 실명이 아니거나 타인의 명의를 이용한 경우
b. 허위의 정보를 기재하거나, “회사”가 제시하는 내용을 기재하지 않은 경우
c. 14세 미만 아동이 법정대리인(부모 등)의 동의를 얻지 아니한 경우
d. "서비스"의 위상이나 명예에 부정적인 영향을 줄 수 있는 경우
e. 부정한 행위나 과정을 통해 공공질서 및 미풍양속에 저해되는 활동을 하는 경우
f. 타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우
g. "서비스"의 운영을 고의로 방해한 경우
h. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
i. 서비스를 제공하지 않는 국가에서 비정상적이거나 우회적인 방법을 통해 서비스를 이용하는 경우
j. 기타 이 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된 경우
3. 제1항에 따른 신청에 있어 “회사”는 “회원”의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.
4. “회사”는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
5. 제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, “회사”는 원칙적으로 이를 가입신청자에게 알리도록 합니다.
6. 이용계약의 성립 시기는 “회사”가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.
7. 회사”는 “회원”에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
8. “회사”는 “회원”에 대하여 “영화및비디오물의진흥에관한법률” 및 “청소년보호법” “학원법”, “평생교육법” 등에 따른 등급 및 연령 준수를 위해 이용제한이나 등급별 제한을 할 수 있습니다.

제 2장. 정보 및 서비스
제6조. 개인정보보호 의무
1. 회사는 회원에게 서비스를 제공하는 과정에서 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련법령이 규정한 절차와 방법에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 관련법령 및 회사의 개인정보처리방침이 적용됩니다.
2. 서비스 외의 단순히 링크된 제3자 제공의 서비스에 대하여는 회사의 개인정보처리방침이 적용되지 않습니다.
3. 회사는 회원의 귀책사유로 인하여 노출된 회원의 회원정보를 포함한 모든 정보에 대해서 일체의 책임을 지지 않습니다.
4. 회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 동법 시행령에 따라 1년간 서비스를 이용하지 않은 회원의 개인정보를 보호하기 위해 개인정보 파기 등 필요한 조치를 취합니다. 또한, 회사는 객관적으로 계정정보 도용 피해가 우려되는 경우에는 회원정보의 보호 및 운영의 효율성을 위해 임시조치, 이용제한, 계정정보 삭제 등 필요한 조치를 취할 수 있습니다. 본 항에 따른 조치가 취해지는 경우, 회사는 조치일 30일 전까지 개인정보 파기 등 필요한 조치가 취해진다는 사실, 일시 및 항목을 명시하여 제19조에 따라 통지합니다.

제7조. “회원”의 개인정보 관리
1. “회원”의 “아이디”와 “비밀번호” 그리고 “이메일”에 관한 관리책임은 “회원”에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
2. “회사”는 “회원”의 “아이디”가 개인정보 유출 우려가 있거나, 반사회적 또는 미풍양속에 어긋나거나 “회사” 및 “회사”의 운영자로 오인한 우려가 있는 경우, 해당 “아이디”의 이용을 제한할 수 있습니다.
3. “회원”은 “아이디” 및 “비밀번호”가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 “회사”에 통지하고 “회사”의 안내에 따라야 합니다.
4. 제3항의 경우에 해당 “회원”이 “회사”에 그 사실을 통지하지 않거나, 통지한 경우에도 “회사”의 안내에 따르지 않아 발생한 불이익에 대하여 “회사”는 책임지지 않습니다.

제8조. “회원”에 대한 통지
1. “회사”가 “회원”에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 서비스 내 전자우편주소, 전자쪽지 등으로 할 수 있습니다.
2. “회사”는 “회원” 전체에 대한 통지의 경우 7일 이상 “회사”의 게시판에 게시함으로서 제1항의 통지에 갈음할 수 있습니다.

제9조. “회사”의 의무
1. “회사”는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 “서비스”를 제공하기 위하여 최선을 다하여 노력합니다.
2. “회사”는 “회원”이 안전하게 “서비스”를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보취급방침을 공시하고 준수합니다.
3. “회사”는 서비스이용과 관련하여 “회원”으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. “회원”이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 “회원”에게 처리과정 및 결과를 전달합니다.

제10조. “회원”의 의무
1. “회원”은 다음 행위를 하여서는 안 됩니다.
a. 신청 또는 변경 시 허위내용의 등록
b. 타인의 정보도용
c. “회사”가 게시한 정보의 변경
d. “회사”가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
e. “회사”와 기타 제3자의 저작권 등 지적재산권에 대한 침해
f. “회사” 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
g. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 “서비스”에 공개 또는 게시하는 행위
h. 회사의 동의 없이 영리를 목적으로 “서비스”를 사용하는 행위
i. 이 약관에 위배되는 내용을 “회사”에 요구하는 행위
j. 기타 불법적이거나 부당한 행위
2. “회원”은 관계법, 이 약관의 규정, 이용안내 및 “서비스”와 관련하여 공지한 주의사항, “회사”가 통지하는 사항 등을 준수하여야 하며, 기타 “회사”의 업무에 방해되는 행위를 하여서는 안 됩니다.

제11조. 강사 및 수강생의 역할과 권한
1. “강사”는 “서비스”에서 아래와 같은 역할 및 권한과 의무를 가집니다.
a. “강사”는 법령과 이 약관을 준수하는 범위 내에서 강의의 구성원을 설정할 수 있습니다.
b. “강사”, “수강생” 등 모든 회원은 어떠한 경우에도 회원의 사전 서면 허락 없이 개인의 개인정보를 타인에게 공개할 수 없으며, 이를 위반하여 발생하는 모든 법적 책임은 위반하는 회원에게 있습니다.
c. “강사”는 강의 공간을 해당 교육을 위한 합법적인 목적 이외 개인의 영리추구, 불법 또는 사기 등과 같은 서비스 목적에 합당하지 않은 용도로 이용을 할 수 없습니다.
d. “강사”가 "서비스" 회원 탈퇴를 한 경우, “강사”로서의 모든 권한은 상실 됩니다.
e. “강사”는 강의 성격에 부합하지 않은 게시물이 신고된 경우 임의로 삭제할 수 있습니다.
f. “강사”는 양질의 교육 환경과 교육 컨텐츠를 제공하는데 성실히 역할을 이행합니다.
2. “수강생”은 “서비스”에서 아래와 같은 역할 및 권한과 의무를 가집니다.
a. 본인 이외의 계정으로 서비스에 접근하지 않으며, 타인이 본인의 계정을 사용하도록 허용하지 않습니다.
b. 과제나 퀴즈, 설문, 동료 평가 등과 같은 강의 내 학습 진행 시 불법 복제, 허위사실 기재 등의 부정행위를 하지 않습니다.
c. 본인이 수강 중인 강의에 강의의 성격에 부합하지 않는 게시물을 게시하지 않으며, 이를 위반하여 신고된 경우 삭제조치 될 수 있음에 동의합니다.
d. 강의에 대한 수료 시, 추후 수료증이 발급될 경우 불법 복제를 하거나 수료자의 명의 변경 등과 같은 행동을 일체 하지 않습니다.
e. “강사" 및 “회사"의 명예를 손상시키거나 업무를 방해하는 행위
f. 이 약관에 위배되는 내용을 “회사”에 요구하는 행위
g. 본 항의 각 수강생의 역할을 이행하지 않은 경우, "회사"는 회원 자격을 박탈하고 "서비스" 접근 또는 참여를 제한할 수 있습니다.

제12조. 서비스의 제공
1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.
a. 온라인 동영상 강의 서비스
b. 동영상 외 텍스트 강의, 강의 관련 다양한 형태의 교육용 서비스
c. LMS 서비스(토론, 퀴즈, 과제, 평가, 수료)
d. 강의제작 지원 서비스
e. 기타 “회사”가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 “회원”에게 제공하는 일체의 서비스
2. 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다.
3. 회사는 일부 서비스의 이용 가능 시간을 별도로 정할 수 있습니다. 이 경우 서비스 이용안내를 통해 공지합니다.

제13조. 서비스 제공의 변경 및 중지
1. "회사"는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 "서비스"의 전부 또는 일부를 변경할 수 있습니다.
2. "서비스"의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등은 그 변경 전에 “서비스” 내 식별하기 쉬운 곳에 공지합니다.
3. “회사”는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 “회원”에게 별도의 보상을 하지 않습니다.
4. "회사”는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 "서비스"의 제공을 일시적으로 중단할 수 있습니다. 이 경우 "회사"는 제9조에 정한 방법으로 "회원"에게 통지합니다. 다만, “회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우, 해당 사유가 해소된 후 즉시 사후에 통지할 수 있습니다.

제14조. 회원의 게시물 관리
1. 회원이 서비스에 등록하는 게시물 등으로 인하여 본인 또는 타인에게 손해나 기타 문제가 발생하는 경우, 회원은 이에 대한 전적인 책임을 지게 되며, 회사는 이에 대하여 어떤 경우에도 책임을 지지 않습니다.
2. 회사는 다음 각 호에 해당하는 게시물 등을 회원의 사전 동의 없이 임시게시 중단, 수정, 삭제, 이동 또는 등록 거부 등의 관련 조치를 취할 수 있습니다.
a. 다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우
b. 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
c. 불법복제 또는 해킹을 조장하는 내용인 경우
d. 범죄와 결부된다고 객관적으로 인정되는 내용일 경우
e. 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우
f. “회사”의 자체적 판단 아래 해당 “게시물”이 “서비스”의 성격에 부합하지 않는 경우
g. 기타 관계법령에 위배된다고 판단되는 경우
3. 회사는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 삭제 할 수 있으며, 이의를 제기한 자와 게시물 등록자 간에 소송, 합의 등을 통해 당해 게시물에 관한 법적 문제가 종결된 후 이를 근거로 회사에 신청이 있는 경우에만 상기 임시 삭제된 게시물은 다시 등록될 수 있습니다.

제15조. 정보의 편집 및 삭제
“회사”는 다음 각 호의 경우, "강사"와 협의를 통해 이를 추가, 수정, 변경 또는 삭제할 수 있도록 요청할 수 있습니다. 다만, "강사"가 합리적인 사유 없이 이를 거부하거나, 현저한 정책위반 또는 불법성이 명백한 경우 등 사전 협의절차를 거치기에 부적절하다고 판단될 경우, "회사”는 “강사”의 사전승인 없이 추가, 수정, 변경 또는 삭제할 수 있으며, "강사"에게 사후에 이메일 등 별도로 통보합니다.
1. "강사"가 운영하는 "강의"의 강의 컨텐츠가 속한 "카테고리" 등의 정보가 적절하지 않다고 판단될 경우
2. "강의"와 관련된 강의 제목, 동영상 제목, 강사 프로필 이미지, 강의 커버 이미지 등이 "회사"의 정책에 부합하지 않거나 사회 통념상 적절하지 않다고 판단할 경우
3. "강의"에 속한 내용이나 운영사항 또는 "강의"에 속한 동영상의 내용이 "회사”의 정책에 부합하지 않을 경우

제16조. 게시물에 대한 저작권
1. "회원"이 "서비스" 내에 게시한 "게시물"의 저작권은 해당 게시물의 저작자에게 귀속됩니다.
2. "회원"은 "회사"가 제공하는 "서비스"를 이용함으로써 얻은 정보를 저작권자의 사전 승낙 없이 녹화ㆍ복제ㆍ편집ㆍ전시ㆍ전송ㆍ배포ㆍ판매ㆍ방송ㆍ공연하는 등의 행위로 저작권을 침해하여서는 안됩니다.
3. "회원"이 "서비스" 내에 게시하는 "게시물"은 검색 엔진 내지 "서비스" 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, “회사”는 저작권법 규정을 준수하며, "회원"은 언제든지 고객문의 또는 "서비스" 내 관리기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.
4. 회원이 올린 “게시물”이 회원의 동의 없이 타인에 의해 무단, 불법 복제되어 회원뿐 아니라 회사의 이익에 상충할 경우 회사는 회원을 대리해 저작권을 행사할 수 있습니다. 단, 이 경우 회사는 회원에게 개별적 동의를 구합니다.
5. 회사는 본 조 제 4항 이외의 목적으로 회원의 게시물을 사용하고자 하는 경우 사전에 회원의 동의를 얻어 사용합니다.

제17조. 정보의 제공
1. 회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신, 우편, SMS, 전화 등의 방법으로 회원에게 제공할 수 있습니다.
2. 회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 관련 법령에 따라 추가적인 개인 정보를 수집할 수 있습니다.

제 3장. 유료 서비스
제 18조. 유료서비스의 제공
1. “회원”은 “회사”가 제공하는 절차에 의하여 유료서비스 이용계약(이하 “청약”을 신청합니다. “회사”는 원칙적으로 “회원”의 청약 신청을 승낙합니다. 다만, 다음 각 호에 해당하는 경우에는 승낙하지 않거나 승낙을 유보할 수 있습니다.
a. 실명이 아니거나 타인의 명의를 이용한 경우
b. 허위의 정보를 기재하거나, "회사”가 제시하는 내용을 기재하지 않은 경우
c. 미성년자가 청소년보호법 등 관련법에 의해서 이용이 금지되는 유료 서비스를 이용하고자 하는 경우
d. "서비스"의 위상이나 명예에 부정적인 영향을 줄 수 있는 경우
e. “유료서비스"에서 제공하는 서비스의 공급량의 제한의 이유로 "서비스"를 제공할 수 없는 경우
f. 이 약관에 위배되는 내용을 “회사”에 요구한 이력이 있는 “회원”일 경우
2. “유료서비스” 는 별도의 표기가 없는 한 "동영상 열람권" 으로 정의합니다. 질문한 내용에 대한 “유료서비스"에 포함되지 않습니다.
3. 청약의 성립시기는 결제가 완료된 시점으로 합니다.
4. “회사”는 계약 체결 전에 “회원”이 청약의 내용을 확인하고, 정정 또는 취소할 수 있도록 적절한 절차를 갖추어야 합니다.
5. “회원”는 계약 전에 이 약관 및 개별 안내 페이지에서 “회사”가 안내하는 사항을 숙지하여 착오 없이 거래할 수 있도록 하여야 합니다.

제 19조. 청약철회
1. “회사”의 “유료서비스”는 청약철회가 가능한 것과 청약철회가 제한되는 것으로 구분되어 제공되며, 이러한 내용은 이 약관 또는 “회원”의 “결제” 시 고지됩니다.
2. 청약철회가 가능한 “유료서비스”를 “결제”한 “회원”은 “결제” 시부터 7일 이내에 “회사”의 고객센터에 청약 철회를 할 수 있습니다.
3. “회원”은 전항의 “청약철회” 기간이 경과되거나 전자상거래 등에서의 소비자 보호에 관한 법률, 콘텐츠 산업 진흥원, 온라인 디지털 콘텐츠 이용자 보호 지침 등 관련 법령에서 정한 청약철회 제한 사유에 해당하는 “유료서비스”의 경우 청약철회를 할 수 없습니다.
4. 회원은 청약철회 의사를 고객센터 등을 통하여 회사에 그 의사를 표시하여야 하며, 회사는 환불요청을 접수하고 회원의 요청과 환불규정 확인 후, 3영업일 이내에 환불하여 드립니다.
5. 회사의 환불 원칙은 다음과 같습니다.
a. 강의 구매일 1주 이내에 강의시청을 하지 않은 경우 전액 환불이 가능합니다.
b. 강의 구매일이 1주일이 넘었거나, 강의를 진행한 경우 환불이 불가합니다.
c. 1강으로 구성된 개별강의는 원칙적으로 환불이 불가능 합니다.
d. 특별강의는 이벤트성 강의, 비정규 강의, 특별기획 강의 등으로서 이는 별도의 수강 취소, 변경 및 환불규정이 적용될 수 있습니다.
6. 회사의 환불 예외사항은 다음과 같습니다.
a. 회원이 관계법령 및 본 약관의 규정을 위반하여 회사로부터 강제탈퇴 처리가 되는 경우에는 본 조의 환불규정이 적용되지 않습니다.
b. 타인으로부터 양도받은(선물받은) 사이버머니에 대해서는 환불이 불가능합니다.
c. 회사가 회원에게 무료로 지급한 사이버머니나 할인쿠폰 등으로 인해 회원이 획득하게 된 금액에 대해서는 환불되지 않습니다.

제 20조. 청약철회 시 대금의 환급
1. “회사”는 “유료서비스”를 “결제”한 “회원”에게 해당 “유료서비스”를 공급하기 곤란하다는 것을 알았을 때, 즉시 해당 사실을 해당 “회원”에게 통보하고 해당 “회원”의 동의를 얻은 후 취소하여야 하며, “회사”는 해당 “회원”의 결제일로부터 3영업일 이내에 환불 및 환불에 필요한 조치를 취해야 합니다.
2. 결제대금의 환불은“회사”가 환불을 승인한 날로부터 3영업일 이내에 대금의 “결제”와 동일한 방법(신용카드 결제취소 등)으로 이루어집니다.
3. 신용카드를 통한 “결제” 대금 환불 시 “결제” 수단의 전자 결제 대행 사업자, 전자 결제 대행 또는 중개서비스 사업자의 정책 상 특정 기간이 지나 동일한 결제수단의 취소가 불가능한 경우에는 환불 정산액으로 환불이 진행됩니다. 환불정산액의 경우 회원정보 수집 및 내부 프로세스에 따라 영업일 15일 이내 처리될 수 있습니다.
4. 휴대폰소액결제의 경우, 이동통신사 정책에 따라 결제승인 및 취소는 해당 월 내에만 가능하며 익월로 넘어갈 경우 계좌이체로 처리됩니다.
5. 할인 쿠폰을 사용한 강의를 환불할 시 사용된 쿠폰은 소멸됩니다.
6. 수강 7일 초과 시 환불 과정에서 금융수수료가 발생하는 경우, 관련 법률에 따라 결제금액의 10%를 공제하고 환불할 수 있습니다.

제 4장. 계약 해지 및 이용 제한
제21조. 계약해제, 해지 등
1. “회원”은 언제든지 고객센터 또는 회원 정보 관리 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, “회사”는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
2. “회원”이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 “회사”가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 “회원”의 개인정보 데이터는 소멸됩니다.
3. "회원"이 계약을 해지하는 경우, "회원"이 서비스 내에서 직접 작성한 "게시물" 및 덧글과 같이 본인 계정으로 등록된 게시물 일체는 삭제되지 않으므로, 본인이 직접 사전에 삭제 후 탈퇴 하시기 바랍니다.
4. 타인에 의해 담기, 스크랩 등이 되어 재게시 되거나, 공용게시판에 등록된 "게시물" 또한 삭제되지 않으니, 본인이 직접 절차에 의해 삭제 처리를 해야 합니다.

제22조. 마일리지
1. “회사”는 서비스의 효율적 이용 및 운영을 위해 회원 가입, 충전, 이벤트 당첨 시에 회원에게 사이버 머니를 무상으로 제공할 수 있습니다. 단, 무상으로 제공된 사이버머니는 사전 공지 후 일부 또는 전부를 조정할 수 있으며, 회사가 정한 기간에 따라 주기적으로 소멸할 수 있습니다.
2. 무상으로 제공된 사이버머니는 회원이 현금으로 충전 또는 디지털콘텐츠 판매로 획득한 다른 기타 사이버머니 및 현금과 달리, 회원 탈퇴 시 전부 소멸되며 복구가 불가능합니다.

제23조. 이용제한 등
1. “회사”는 “회원”이 이 약관의 의무를 위반하거나 “서비스”의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 “서비스” 이용을 제한할 수 있습니다.
2. “회사”는 전항에도 불구하고, “주민등록법”을 위반한 명의도용 및 결제도용, “저작권법” 및 “컴퓨터프로그램보호법”을 위반한 불법프로그램의 제공 및 운영방해, “정보통신망법”을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른 영구이용정지 시 “서비스” 이용을 통해 획득한 수익 등 기타 혜택 등도 모두 소멸되며, “회사”는 이에 대해 별도로 보상하지 않습니다.
3. “회사”는 “회원”이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
4. “회사”는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 및 개별 서비스상의 운영정책에서 정하는 바에 의합니다.
5. 본 조에 따라 “서비스” 이용을 제한하거나 계약을 해지하는 경우에는 “회사”는 그 사유 및 제한기간 등을 회원에게 9조에 따라 알려야 합니다.
6. “회원”은 본 조에 따른 이용제한 등에 대해 “회사”가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 “회사”가 인정하는 경우 “회사”는 즉시 “서비스”의 이용을 재개합니다.

제24조. 부정이용 금지 및 차단
1. 회사는 다음 각호에 해당하는 경우를 부정 이용행위로 봅니다.
a. 동일한 ID로 2대 이상의 기기에서 동시접속이 발생하는 경우
b. 동일한 ID로 다수의 PC 또는 IP에서 서비스를 이용하는 경우
c. 자신의 ID 및 강의 등의 서비스를 타인이 이용하도록 하는 경우
d. 자신의 ID 및 강의 등의 서비스를 타인에게 판매, 대여, 양도하는 행위 및 이를 광고하는 행위
e. 서비스 이용 중, 복제프로그램을 실행하는 경우 또는 녹화를 하거나 시도하는 경우
f. “강의”의 “게시물”을 재배포 하는경우
2. 회사는 전항에 따른 부정 이용자가 발견 되었을 경우, 다음 각호에 따른 조치를 취할 수 있습니다.
a. [1차 발견 시] 전자우편, 서비스 내 메시지 등을 통하여 경고합니다.
b. [2차 발견 시] 강제 탈퇴 처리되며 “회사”의 법률 대리인을 통한 고발조치와 민사소송을 진행하게 됩니다.
c. 회원은 전항 제2호의 조치를 이유로, 서비스 이용기간의 연장을 요구할 수 없습니다.
d. 회원은 회사로부터의 본 조 제2항의 조치에 이의가 있는 경우, 회사의 법률 대리인을 통해 소명할 수 있습니다.
e. 부정이용 식별방법 및 차단
f. 회사는 회원의 서비스 이용 중에 수집ㆍ확인된 IP정보 등의 자료를 토대로, 서버를 통하여 부정이용 여부를 분류, 확인합니다.
g. 회사는 이용자가 서비스 이용 중에 복제프로그램을 실행시키거나 동일한 ID로 동시 접속을 하는 경우, 서비스 이용 접속을 강제로 종료 시킵니다.

제25조. 면책
1. “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우에는 “서비스” 제공에 관한 책임이 면제됩니다.
2. “회사”는 “회원”의 귀책사유로 인한 “서비스” 이용의 장애에 대하여는 책임을 지지 않습니다.
3. “회사”는 “회원”이 “서비스”와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
4. “회사”는 “회원” 간 또는 “회원”과 제3자 상호간에 “서비스”를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
5. “회사”는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.
6. “회사”는 CP가 제공하거나 회원이 작성하는 등의 방법으로 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 아니합니다.

제26조. 준거법 및 재판관할
1. 본 약관은 대한민국법령에 의하여 규정되고 이행됩니다.
2. 본 약관에 명시되지 않은 사항에 대해서는 관련법령에 의하고, 법에 명시되지 않은 부분에 대하여는 관습에 의합니다.
3. "회사"와 "회원"간 발생한 분쟁에 관한 소송은 제소 당시의 "회사"의 주소에 의한 관할 지방법원을 전속관할로 합니다.

[부칙]
본 약관은 2020년 09월 11일부터 적용됩니다.'
          ></textarea>
          <div class="agree">
            <CheckBox>
              <input
                v-model="agree1"
                type="checkbox"
                checked
                id="check1"
                slot="check"
              />
            </CheckBox>
            <label class="agree-check" for="check1"
              >약관 내용을 모두 확인하였으며 동의합니다.</label
            >
          </div>
        </div>

        <div class="row agree-line">
          <label class="dt">개인정보 수집 및 활용동의</label>
          <textarea
            name=""
            readonly
            disabled
            rows="3"
            placeholder="개인정보 처리방침"
          ></textarea>
          <div class="agree">
            <CheckBox>
              <input
                v-model="agree2"
                type="checkbox"
                checked
                id="check2"
                slot="check"
              />
            </CheckBox>
            <label class="agree-check" for="check2"
              >약관 내용을 모두 확인하였으며 동의합니다.</label
            >
          </div>
        </div>
        <BlueBtn>
          <button slot="blue_btn" type="button" @click="register()">
            등록
          </button>
        </BlueBtn>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import BlueBtn from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  import Search from "@/components/common/Search.vue";
  import SelectYYMMDD from "@/components/common/SelectYYMMDD.vue";
  @Component({
    components: { Search, CheckBox, BlueBtn, SelectYYMMDD },
    filters: {
      prettify(value: string): string {
        let data = value.split(":");
        let minutes = data[0] as number | string;
        let secondes = data[1] as number | string;
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (((secondes as unknown) as number) < 10) {
          secondes = "0" + secondes;
        }
        return minutes + ":" + secondes;
      },
    },
  })
  export default class SignUp extends Vue {
    private isCert = false; // 인증이 완료된경우 true
    private certNumber = ""; // 인증번호
    private snsType = "";
    private birthYear = "";
    private birthMonth = "";
    private birthDays = "";
    private isWait = false; //인증번호 안내 메시지
    private certInput = ""; // 인증번호 입력
    private detailAddress = ""; // 상세주소
    private address = ""; // 주소
    private isOpen = false; // 주소찾기모달창
    private userid = ""; // 아이디
    private isTimer = false;
    private lastname = ""; // 이름
    private firstname = ""; // 성
    private email = "";
    private pw1 = "";
    private pw2 = "";
    private phone: string = "";
    private agree1 = false; // 서비스 이용약관 동의
    private agree2 = false; // 개인정보 수집 동의
    private time = 0;
    private timer = 1;
    private get emailValidation(): boolean {
      const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return re.test(this.email);
    }
    private get prettyTime(): string {
      let time = this.time / 60;
      let minutes = Math.floor(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    }
    private certIsPass(): void {
      if (this.certNumber != this.certInput) {
        this.$noticeMessage("인증번호를 다시 확인 후 입력해 주세요.");
      } else {
        this.$noticeMessage("인증이 완료되었습니다.");
        this.isCert = true;
        this.isWait = false;
        this.stop();
      }
    }
    flag = true;
    private reSend(): void {
      console.log("재전송이다");
      if (this.time > 120) {
        this.isWait = true;
      } else {
        this.flag = true;
        this.isWait = false;
        this.phoneAuth();
      }
    }
    private phoneAuth(): void {
      const re = /^\d{3}\d{3,4}\d{4}$/;
      if (re.test(this.phone) == false) {
        this.$noticeMessage("형식에 맞지 않는 번호입니다.");
      } else {
        this.isCert = false;
        const data = {
          action: "send_sms",
          phone: this.phone,
        };
        if (this.flag) {
          this.flag = false;
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result: { [key: string]: any }) => {
              console.log(result);
              if (result.data.data.result == false) {
                this.$noticeMessage(result.data.data.msg);
              } else {
                this.$noticeMessage("인증문자가 발송되었습니다.");
                this.certNumber = result.data.data.cert_number;
                this.start();
              }
            });
        }
      }
    }
    private birthdaySet(day: { [key: string]: string }): void {
      console.log(day);
      this.birthYear = day.birthYear;
      this.birthMonth = day.birthMonth;
      this.birthDays = day.birthDays;
    }
    private start(): void {
      clearInterval(this.timer);
      this.time = 180;
      this.isTimer = true;
      console.log("전송이다");
      this.timer = window.setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.$noticeMessage(
            "인증번호 입력 시간이 만료 되었습니다.<br>인증번호를 재 발송 후 입력해 주세요."
          );
          this.stop();
        }
      }, 1000);
    }
    private stop(): void {
      clearInterval(this.timer);
      this.time = 0;
      this.isTimer = false;
      this.flag = true;
    }
    // 주소 검색 완료후 이벤트
    private onComplete(result: { [key: string]: any }): void {
      console.log(result);
      // 도로명 검색인경우
      if (result.userSelectedType == "R") {
        this.address =
          "(" +
          result.zonecode +
          ") " +
          result.address +
          " (" +
          result.bname +
          "," +
          result.buildingName +
          ")";
      } else {
        // 지번검색
        this.address = "(" + result.zonecode + ") " + result.jibunAddress;
      }
      this.isOpen = false;
    }
    private validationCheck(): Promise<string> {
      let err;
      return new Promise((resolve, reject) => {
        if (this.lastname.trim().length == 0) {
          this.$noticeMessage("성을 입력하세요");
          err = new Error("성을 입력하세요");
          err.name = "enter your firstname";
          console.log(err);
          reject(err);
        } else if (this.firstname.trim().length == 0) {
          this.$noticeMessage("이름을 입력하세요");
          err = new Error("이름을 입력하세요");
          err.name = "enter your name";
          reject(err);
        } else if (this.userid.trim().length == 0) {
          this.$noticeMessage("아이디를 입력하세요");
          err = new Error("아이디를 입력하세요");
          err.name = "enter your 아이디를";
          reject(err);
        } else if (this.email.trim().length == 0) {
          this.$noticeMessage("이메일을 입력하세요");
          err = new Error("이메일을 입력하세요");
          err.name = "enter your email";
          reject(err);
        } else if (this.pw1.trim().length == 0) {
          this.$noticeMessage("비밀번호를 입력하세요");
          err = new Error("비밀번호를 입력하세요");
          err.name = "enter your password";
          reject(err);
        } else if (this.pw2.trim().length == 0) {
          this.$noticeMessage("비밀번호확인을 입력하세요");
          err = new Error("비밀번호확인을 입력하세요");
          err.name = "confirm your password";
          reject(err);
        } else if (this.pw1.trim() != this.pw2.trim()) {
          this.$noticeMessage("비밀번호가 서로 다릅니다");
          err = new Error("비밀번호가 서로 다릅니다");
          err.name = "wrong password";
          reject(err);
        } else if (this.agree1 == false) {
          this.$noticeMessage("서비스 이용약관 내용에 동의 해주세요");
          err = new Error("서비스 이용약관 내용에 동의 해주세요");
          err.name = "Agreement to terms and conditions";
          reject(err);
        } else if (this.agree2 == false) {
          this.$noticeMessage(
            "개인정보 수집 및 활용 동의 내용에 동의 해주세요"
          );
          err = new Error("개인정보 수집 및 활용 동의 내용에 동의 해주세요");
          err.name =
            "Please agree to the consent to the collection and use of personal information";
          reject(err);
        } else if (this.isCert == false) {
          this.$noticeMessage("인증번호를 다시 확인 후 입력해 주세요.");
          err = new Error("인증번호를 다시 확인 후 입력해 주세요");
          err.name =
            "Please check the authentication number again and enter it";
          reject(err);
        } else {
          resolve("success");
        }
      });
    }
    private register(): void {
      try {
        this.validationCheck().then((result: string) => {
          const data = {
            action: "join",
            firstname: this.firstname, //필수
            lastname: this.lastname, //필수
            email: this.email, //필수, 이메일 형식체크, 이미 사용중인 계정인지는 백단에서 체크하고 있음
            password: this.pw1, //필수
            password_confirm: this.pw2, //필수, 비밀번호란과 동일여부 체크
            phone: this.phone, //옵션, 입력할 경우 숫자만 입력,
            addr1: this.address + this.detailAddress,
            birth_year: this.birthYear,
            birth_month: this.birthMonth,
            birth_day: this.birthDays,
          };
          this.$axios
            .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
            .then((result: { data: { message: string; error: boolean } }) => {
              console.log(result);
              if (result.data.error) {
                this.$noticeMessage(result.data.message);
              } else {
                this.$EventBus.$emit("login from signUpComplete", data);
                this.$router.push("/signupComplete").catch(() => {});
              }
            });
        });
      } catch (e) {
        console.log(e);
      }
    }
    destroyed() {
      this.stop();
    }
  }
</script>
<style scoped lang="scss">
  #signup {
    padding: 16px;
    padding-top: 0;
    margin-top: 13px;
    h2 {
      font-size: 18px;
      margin-bottom: 13px;
      color: #333333;
    }
    .sns-login {
      margin-bottom: 15px;
      .login-title {
        font-size: 14px;
        display: inline-block;
        width: 35%;
      }
      .sns-login-btn {
        width: calc(100% - 35%);
        display: inline-block;
        img {
          &:not(:last-child) {
            margin-right: 15px;
          }
          width: 40px;
          height: 40px;
        }
      }
    }
    .noti {
      color: #999999;
      font-size: 1.25rem;
      margin: 0 0 15px 0;
    }
    .signup-form {
      border-top: 4px solid #f8f8f8;
      padding-top: 15px;
      .address-search {
        position: fixed;
        max-width: 720px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 6;
        .vue-daum-postcode {
          overflow: auto;
          height: 100%;
        }
      }
      .blue_btn {
        margin-top: 20px;
        width: calc(100% - 35%);
        float: right;
        ::v-deep button {
          width: 70%;
        }
      }
      .row {
        &:not(:first-child) {
          margin-top: 10px;
        }
        clear: both;
        input,
        textarea,
        select {
          font-family: "NotoSansCJKkr-Regular";
          font-size: 14px;
          width: calc(100% - 35%);
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          padding: 5px 6px;
          height: 32px;
          line-height: 13px;
          box-sizing: border-box;
        }
        select {
          background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat
            90% center / 7px 5px;
        }
        textarea {
          vertical-align: top;
          resize: none;
          height: 60px;
          &::placeholder {
            color: #666666;
            font-size: 12px;
          }
        }

        .dt {
          width: 35%;
          display: inline-block;
          font-size: 14px;
          font-family: "NotoSansCJKkr-Regular";
          .required {
            color: #114fff;
          }
        }
        .search,
        .select-wrap {
          margin-top: 0;
          width: calc(100% - 35%);
          display: inline-block;
          vertical-align: middle;
          .search_contents {
            margin-left: 0;
            width: 90%;
            border: 0;
          }
        }
        .search {
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        ::v-deep .select-wrap {
          .select {
            width: 31.333%;
            &:not(:last-child) {
              margin-right: 3%;
            }
          }
        }
        .address,
        .phone-title {
          vertical-align: middle;
        }
        .phone {
          vertical-align: middle;
          display: inline-block;
          font-size: 14px;
          width: calc(100% - 35%);
          border: 1px solid #ccc;
          border-right: 0;
          border-radius: 5px;
          box-sizing: border-box;
          position: relative;
          #phone,
          #auth {
            border: 0;
            width: 80%;
            padding: 5px 6px 5px 6px;
            height: 30px;
          }
          .submit-btn {
            height: 32px;
            font-weight: bold;
            width: 20%;
            vertical-align: middle;
            border-radius: 4px;
            border: 1px solid #114fff;
            color: #114fff;
            position: absolute;
            top: -1px;
            right: 0;
          }
        }
      }
      .timer,
      .auth-phone-msg,
      .email-notice {
        color: #ff0000;
        margin-left: 35%;
        font-size: 14px;
        margin-top: 5px;
      }
      .agree-line {
        &:after {
          display: block;
          content: "";
          clear: both;
        }
        .agree {
          width: calc(100% - 35%);
          position: relative;
          float: right;
          color: #666666;
          margin-top: 5px;
          font-size: 1.125rem;
          font-family: "NotoSansCJKkr-Regular";
          ::v-deep .container-checkbox {
            width: 15px;
            height: 15px;
            position: unset;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            input[type="checkbox"] + .checkmark {
              width: 15px;
              height: 15px;
              display: inline-block;
              padding: 0;
              position: unset;
            }
          }
          .agree-check {
            width: calc(100% - 30px);
            display: inline-block;
            font-size: 0.8em;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
