let detail = {
  methods: {
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
        .post(this.$ApiUrl.main_list, JSON.stringify(data), {
          headers: {
            Authorization: this.$cookies.get("user_info")
              ? "Bearer " + this.$cookies.get("user_info").access_token
              : null,
          },
        })
        .then((result) => {
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
  },
  data() {
    return {
      isPossibleReview: false,
      is_subscribe: false,
      subscribe_btn: false,
      detail: "",
      score_info: "", // 각 별점의 개수
    };
  },
  computed: {
    detect_token() {
      return this.$store.getters["userStore/isToken"];
    },
  },
  watch: {
    detect_token(a, b) {
      console.log(a, b);
      this.isSubscribe();
    },
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
  },
};
export default detail;
