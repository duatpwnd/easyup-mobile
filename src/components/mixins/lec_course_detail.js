let detail = {
  methods: {
    // 구독 여부 조회
    async isSubscribe() {
      const data = {
        action: "check_subscribe_course",
        course_id: this.$route.query.id,
      };
      await this.$axios
        .post(this.$ApiUrl.main_list, JSON.stringify(data), {
          headers: {
            Authorization:
              "Bearer " + this.$cookies.get("userinfo").access_token,
          },
        })
        .then((result) => {
          console.log("구독여부", result);
          if (result.data.error != true) {
            this.is_subscribe = result.data.data.isSubscribe;
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
      is_subscribe: false,
      subscribe_btn: false,
      detail: "",
      score_info: "", // 각 별점의 개수
    };
  },
  mounted() {
    this.$store.watch((el, index) => {
      if (el.userStore.token == null) {
        console.log("구독중 함수실행");
        this.isSubscribe();
      }
    });
  },
  created() {
    window.onscroll = () => {
      this.subscribe_btn_toggle();
    };
  },
};
export default detail;
