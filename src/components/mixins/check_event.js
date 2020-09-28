let checkEvent = {
  methods: {
    upload() {
      this.$router.push("/dataShare/upload");
    },
    // 전체 체크
    all_check() {
      this.allCheck = !this.allCheck;
      if (this.allCheck) {
        this.checked_list = this.arr;
      } else {
        this.checked_list = [];
      }
    },
    // 부분체크
    partial_check() {
      if (this.arr.length != this.checked_list.length) {
        this.allCheck = false;
      } else {
        this.allCheck = true;
      }
    },
  },
  data() {
    return {
      arr: [0, 1, 2, 3],
      checked_list: [],
      allCheck: false,
    };
  },
};
export default checkEvent;
