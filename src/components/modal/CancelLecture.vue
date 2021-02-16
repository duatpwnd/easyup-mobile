<template>
  <div class="mask">
    <div class="cancel_lecture">
      <h2 class="h2_title">취소 강의</h2>
      <select slot="option" class="select" v-model="select">
        <option value="">전체 취소</option>
        <option value="course_name">강의명</option>
        <option value="section_name">섹션명</option>
        <option value="title">책갈피제목</option>
      </select>
      <div class="lecture_wrap">
        <div class="lecture" v-for="(li, index) in lecture_info" :key="index">
          <div class="left">
            <div class="row1">
              <span class="lec" v-if="li.type == 'course'">강의</span>
              <span class="course" v-else>코스</span>
              <span class="name">{{ li.title }}</span>
            </div>
          </div>
          <div class="right">
            <CheckBox>
              <input
                type="checkbox"
                v-model="checked_list"
                slot="check"
                :value="li.id"
            /></CheckBox>
          </div>
        </div>
      </div>
      <h2 class="h2_title reason_title">취소 사유</h2>
      <select slot="option" class="select" v-model="reason">
        <option value="">기타</option>
        <option value="course_name">강의명</option>
        <option value="section_name">섹션명</option>
        <option value="title">책갈피제목</option>
      </select>
      <textarea
        :disabled="reason == ''"
        class="textarea"
        placeholder="취소 사유를 입력해 주세요."
      ></textarea>
      <div class="btn_wrap">
        <BaseButton>
          <button class="confirm_ok" slot="blue_btn" @click="send()">
            확인
          </button>
        </BaseButton>
        <BaseButton>
          <button class="cancel" slot="blue_btn" @click="close()">취소</button>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseButton from "@/components/common/BaseButton.vue";
  import CheckBox from "@/components/common/BaseCheckBox.vue";
  export default {
    props: {
      lecture_info: {
        type: Array,
        required: true,
      },
    },
    components: { BaseButton, CheckBox },
    data() {
      return {
        select: "", // 취소 강의
        reason: "", // 취소 사유
        checked_list: [],
      };
    },
    methods: {
      send() {
        const data = {
          action: "request_cancel",
          order_id: "",
          reason: "",
          reason_etc: "",
        };
        console.log(data);
        this.$axios
          .post(this.$ApiUrl.mobileAPI_v1, JSON.stringify(data))
          .then((result) => {
            console.log(result);
            this.list = result.data.data;
          });
      },
      close() {
        this.$emit("emitClose");
      },
    },
  };
</script>
<style scoped lang="scss">
  .mask {
    .cancel_lecture {
      background: white;
      max-width: 720px;
      width: 80%;
      padding: 15px;
      box-sizing: border-box;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .h2_title {
        font-size: 16px;
        margin-bottom: 15px;
      }
      .reason_title {
        margin-top: 35px;
      }
      .select {
        width: 100%;
        outline: none;
        border: 1px solid #333333;
        font-size: 14px;
        height: 40px;
        padding: 0 10px;
        line-height: 31px;
        border-radius: 4px;
        color: #333333;
        background: url("~@/assets/images/lec_list/arrow_ico.png") no-repeat
          right 10px center / 7px 5px;
      }
      .textarea {
        margin-top: 10px;
        width: 100%;
        outline: none;
        border: 1px solid #333333;
        font-size: 14px;
        padding: 10px;
        border-radius: 4px;
        resize: none;
        height: 80px;
        box-sizing: border-box;
      }
      .lecture_wrap {
        margin-top: 20px;
        .lecture {
          border-bottom: 1px solid #ccc;

          .left {
            display: inline-block;
            padding: 10px 0;
            width: 86%;
            box-sizing: border-box;
            vertical-align: middle;
            .row1 {
              .name,
              .lec,
              .course {
                font-size: 14px;
              }
              .lec,
              .course {
                color: #999999;
                margin-right: 5px;
              }
            }
          }
          .right {
            width: 14%;
            text-align: right;
            display: inline-block;
            vertical-align: middle;
            ::v-deep .container-checkbox {
              position: unset;
              width: unset;
              height: 24px;
              display: inline-block;
              .checkmark {
                position: unset;
                width: 24px;
                display: inline-block;
                height: 24px;
                padding: 0;
                box-sizing: border-box;
              }
            }
          }
        }
      }
      .btn_wrap {
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        .blue_btn {
          text-align: center;
          width: 50%;
          display: inline-block;
          .confirm_ok,
          .cancel {
            width: 90%;
            height: 40px;
            line-height: 31px;
            font-size: 16px;
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
