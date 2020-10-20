let checkEvent = {
  methods: {
    // 전체 체크
    all_check() {
      this.allCheck = !this.allCheck;
      if (this.allCheck) {
        this.datashare_list.list.forEach((el, index) => {
          this.checked_list.push(el.id);
        });
      } else {
        this.checked_list = [];
      }
    },
    // 부분체크
    partial_check() {
      if (this.datashare_list.list.length != this.checked_list.length) {
        this.allCheck = false;
      } else {
        this.allCheck = true;
      }
    },
  },
  data() {
    return {
      checked_list: [],
      allCheck: false,
    };
  },
};
export default checkEvent;
