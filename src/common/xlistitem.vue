<template>
  <button class="main_cls is-plain-button" @click="click">
    <div :class="args.islast?'main_content_last_cls':'main_content_cls'" >
      <div class="main_content_icon_cls" v-if="args.icon">
        <span v-html="args.icon"></span>
      </div>
      <div class="main_content_title_cls">
        {{args.title}}
      </div>
      <div class="main_content_subtitle_cls">
        {{args.subtitle}}
      </div>
      <div class="main_content_arrow_cls">
        <span v-if="!args.noarrow">&#xe6db;</span>
      </div>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    args:{
      type: Object,
      default:{

      }
    },
  },
  data() {
    return {
      // items: [1, 2, 3],
    }
  },
  computed: {
    buttonClass() {
      let buttonClass = `weui-btn weui-btn-${this.size} ${this.btnClass}`;
      return buttonClass;
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    },
  }
};

</script>
<style scoped>
@font-face {
  font-family: 'iconfont-listitem';  /* project id 1339582 */
  src: url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.eot');
  src: url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.woff') format('woff'),
  url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1339582_lfmfq3bq53.svg#iconfont') format('svg');
}
.is-plain-button {
  padding: 0;
  display: block;
  flex-direction: column;
  /*align-items: center;*/
  /*justify-content: center;*/
  border-radius: 0rpx;
  background-color: transparent;

}
.is-plain-button::after {
  border: 0;
}

.main_cls {
  /*width: 750rpx;*/
  /*background-color: red;*/
  flex: 1;
  background-color: white;
}
.main_content_cls{
  /*background-color: blue;*/
  margin-left: 20rpx;
  border-bottom: 1rpx solid #e7e7e7;
  flex-direction: row;
  display: flex;
  align-items: center;
}
.main_content_last_cls{
  /*background-color: blue;*/
  margin-left: 20rpx;
  /*border-bottom: 1rpx solid #e7e7e7;*/
  flex-direction: row;
  display: flex;
  align-items: center;
}
.main_content_icon_cls{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 90rpx;
  font-family: iconfont-listitem;
  /*background-color: orange;*/
}
.main_content_title_cls{
  /*background-color: pink;*/
  text-align: left;
  font-size: 30rpx;
  /*margin-left: 20rpx;*/
  /*justify-content: flex-start;*/
  /*align-items: flex-start;*/
  margin-right: 20rpx;
  flex: 1;
}
.main_content_subtitle_cls{
  /*background-color: pink;*/
  /*margin-left: 20rpx;*/
  /*margin-right: 20rpx;*/
  font-size: 22rpx;
  color: gray;
}
.main_content_arrow_cls{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 90rpx;
  /*background-color: orange;*/
  margin-right: 20rpx;
  font-family: iconfont-listitem;
  color: gray;
}
</style>
