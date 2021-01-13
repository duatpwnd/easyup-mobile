let detail = {
  methods: {
    // 구독하기
    subscribe() {
      const data = {};
      if (this.$route.name == "lecDetail") {
        data["action"] = "subscribe_course";
        data["course_id"] = this.$route.query.id;
      } else {
        data["action"] = "subscribe_session";
        data["session_id"] = this.$route.query.id;
      }
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log("구독하기 성공 실패?", result);
          this.isSubscribe();
        });
    },
    // 구독 여부 조회
    async isSubscribe() {
      const data = {};
      if (this.$route.name == "lecDetail") {
        data["action"] = "check_subscribe_course";
        data["course_id"] = this.$route.query.id;
      } else {
        data["action"] = "check_subscribe_session";
        data["session_id"] = this.$route.query.id;
      }
      console.log(data);
      await this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log("구독여부", result);
          if (result.data.error != true) {
            this.is_subscribe = result.data.data.isSubscribe;
            this.isPossibleReview = result.data.data.isPossibleReview;
          }
        });
    },

    scoreCount(result) {
      console.log(result);
      this.score_info = result;
    },
    subscribe_btn_toggle() {
      if (this.$refs.subs_btn != undefined) {
        const btn_offset_top = this.$refs.subs_btn.offsetTop;
        const btn_h = this.$refs.subs_btn.clientHeight;
        const scroll_top = window.scrollY;
        if (scroll_top > btn_offset_top + btn_h) {
          this.subscribe_btn = true;
        } else {
          this.subscribe_btn = false;
        }
      }
    },
    // url 복사
    share() {
      this.$noticeMessage("현재 페이지 주소가 복사되었습니다.");
    },
    // 강의바구니
    cartAdd() {
      const data = {
        action: "add_cart",
        type: this.$route.name == "lecDetail" ? "course" : "session",
        id: this.$route.query.id
      };
      console.log(data);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
        .then(result => {
          console.log(result);
          this.$noticeMessage("강의바구니에 담았습니다.");
        });
    }
  },
  data() {
    return {
      isPossibleReview: false,
      is_subscribe: false,
      subscribe_btn: false,
      detail: "",
      score_info: "", // 각 별점의 개수
      url: window.document.location.href // 클립보드 현재 url
    };
  },
  computed: {
    detect_token() {
      return this.$store.getters["userStore/isToken"];
    }
  },
  watch: {
    detect_token(a, b) {
      console.log(a, b);
      this.isSubscribe();
    }
  },
  mounted() {
    // this.$store.watch(
    //   () => this.$store.getters.isToken,
    //   (n) => {
    //     console.log("watched: ", n);
    //   }
    // );
    // this.$store.watch(this.$store.getters.isToken, (state) => {
    //   console.log(state);
    // if (
    //   el.userStore.userinfo.access_token != null &&
    //   this.$route.name == "lecDetail"
    // ) {
    //   console.log("구독중 함수실행");
    //   this.isSubscribe();
    // }
    // });
  },
  created() {
    window.onscroll = () => {
      this.subscribe_btn_toggle();
    };
  }
};
export default detail;
