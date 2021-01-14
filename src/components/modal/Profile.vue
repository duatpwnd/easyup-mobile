<template>
  <div class="mask">
    <div class="profileModal">
      <textarea
        v-model="contents"
        class="contents"
        placeholder="등록한 모든 강의/코스 소개 페이지에 노출되는 강사 소개 프로필입니다.
이력, 저작 활동, 지향하는 목표, 학업에 관한 기타 유용한 이야기 등을 추가해 나만의 프로필을 만들어 보세요!!"
      ></textarea>
      <div class="btn_wrap">
        <BlueBtn @click.native="register()">
          <button class="confirm_ok" slot="blue_btn">
            등록
          </button>
        </BlueBtn>
        <BlueBtn @click.native="cancel()">
          <button class="cancel" slot="blue_btn">취소</button>
        </BlueBtn>
      </div>
    </div>
  </div>
</template>
<script>
import BlueBtn from "@/components/common/BaseButton.vue";
export default {
  components: { BlueBtn },
  data() {
    return {
      contents: ""
    };
  },
  methods: {
    getInfo() {
      const obj = {
        action: "get_teacher_profile"
      };
      console.log(obj);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
        .then(result => {
          this.contents = result.data.data.profile;
        });
    },
    register() {
      const obj = {
        action: "update_teacher_profile",
        contents: this.contents
      };
      console.log(obj);
      this.$axios
        .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(obj))
        .then(result => {
          console.log(result);
          this.$noticeMessage("프로필이 등록되었습니다.");
          this.cancel();
        });
    },
    cancel() {
      this.$emit("profileModalClose");
    }
  },
  created() {
    this.getInfo();
  }
};
</script>
<style scoped lang="scss">
.mask {
  .profileModal {
    background: white;
    max-width: 720px;
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .contents {
      font-size: 16px;
      resize: none;
      padding: 15px;
      width: 100%;
      height: 250px;
      box-sizing: border-box;
    }

    .btn_wrap {
      margin-top: 20px;
      .blue_btn {
        text-align: center;
        width: 50%;
        display: inline-block;
        .confirm_ok,
        .cancel {
          width: 90%;
          height: 40px;
          font-size: 16px;
          line-height: 31px;
        }
        .cancel {
          background: #ccc;
          border: 2px solid #ccc;
        }
      }
    }
  }
}
</style>
