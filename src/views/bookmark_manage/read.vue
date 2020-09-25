<template>
  <div>
    <div class="head">
      <span class="title">[파이선 완벽 뽀개기]</span>
      <span>TEST</span>
    </div>
    <div class="contents_wrap">
      <BlueBtn>
        <template slot="blue_btn">
          <button>
            타임라인 01:11:11
          </button>
          <span class="date">2020.06.12</span>
        </template>
      </BlueBtn>
      <div class="contents">
        본 수업에서는 리눅스의 사용법을 다룹니다. 특히 초심자들이 어려워하는
        부분이 명령어를 이용해서 컴퓨터를 제어하는 법입니다. 여기서는 초심자가
        명령어를 사용하는데 필요한 가장 보편적인 규칙을 최소한으로 다룹니다.
        또한 리눅스와 인터넷은 서로 뗄레야 뗄 수 없는 관계에 있습니다. 하지만
        리눅스와 인터넷 모두 익숙해지는데 많은 노력이 필요합니다. 여기서는
        인터넷이 동작하는 원리와 리눅스를 함께 다룸으로서 인터넷에 대한 가장
        보편적인 규칙을 파악하는데도 도움이 될 수 있도록 수업을 구성했습니다.
      </div>
    </div>
    <div class="button_wrap">
      <BlueBtn class="btn">
        <button slot="blue_btn">
          수정
        </button>
      </BlueBtn>
      <BlueBtn class="btn last_btn">
        <button slot="blue_btn">
          삭제
        </button>
      </BlueBtn>
    </div>
  </div>
</template>
<script>
  import BlueBtn from "@/components/common/BaseButton.vue";

  export default {
    components: {
      BlueBtn,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style scoped lang="scss">
  .head {
    margin-top: 5%;
    span {
      font-size: 1.375rem;
    }
    .title {
      color: #114fff;
      margin-right: 2%;
      font-weight: 600;
    }
  }
  .contents_wrap {
    border-top: 2px solid #333333;
    border-bottom: 2px solid #333333;
    margin: 2% 0;
    padding: 2% 0;
    .blue_btn {
      position: relative;
      button {
        width: 40%;
        font-size: 10px;
        height: 20px;
        line-height: 18px;
        padding: 0;
      }
      .date {
        position: absolute;
        top: 0;
        right: 0;
        height: 14.5px;
        bottom: 0;
        margin: auto;
        font-size: 12px;
        color: #666666;
      }
    }
    .contents {
      white-space: pre-wrap;
      font-size: 1.25rem;
      color: #666666;
      font-family: "NotoSansCJKkr-Regular";
      margin-top: 10px;
    }
  }
  .button_wrap {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .btn {
      float: left;
      width: 23.172%;
      button {
        border: 1px solid #114fff;
        background: white;
        color: #114fff;
        height: 24px;
        line-height: 16px;
        font-size: 12px;
      }
      &:not(:first-child) {
        margin-left: 2%;
      }
    }
    .last_btn {
      float: right;
    }
  }
</style>
