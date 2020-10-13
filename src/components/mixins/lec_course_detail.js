let detail = {
  methods: {
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
      subscribe_btn: false,
      detail: "",
      score_info: "", // 각 별점의 개수
    };
  },
  created() {
    window.onscroll = () => {
      this.subscribe_btn_toggle();
    };
  },
};
export default detail;
