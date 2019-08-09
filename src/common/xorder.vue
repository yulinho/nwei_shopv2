<template>
  <div class="main_cls" @click="click">
    <div :class="args.islast?'main_content_last_cls':'main_content_cls'">
      <div class="main_content_icon_cls" v-if="args.icon">
        <span v-html="args.icon"></span>
      </div>
      <div class="main_content_title_cls">
        {{args.title}}官方自营店
      </div>
      <div class="main_content_subtitle_cls">
        {{args.subtitle}}
      </div>
      <div class="main_content_arrow_cls">
        <span v-if="!args.noarrow">&#xe6db;</span>
      </div>
      <div class="main_content_status_cls">
        <span class="main_content_status_span_cls">{{args.statusFE}}</span>
      </div>
    </div>
    <div class="main_marginer_cls" style="height: 1rpx;">
      
    </div>
    <div class="main_product_cls">
      <div class="main_product_content_cls">
        <image :src="args.pict_url" class="main_product_content_image_cls"></image>
        <div class="main_product_content_des_cls">
          <div class="main_product_content_des_title_cls">
            <span class="main_product_content_des_title_1_cls">{{args.title}}</span><span>{{args.dealprice}}</span>
          </div>
          <div class="main_product_content_des_subtitle_cls">
            <span class="main_product_content_des_subtitle_1_cls">{{args.subtitle}}</span><span>x{{args.cnt}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main_postfee_cls">
      <span>价格:0 (运费:12)</span>
    </div>
    <div class="main_marginer_cls" style="height: 2rpx;">
      
    </div>
    <div class="main_navis_cls">
      <button class="main_navis_button_cls" size="mini">查看物流</button>
      <button class="main_navis_button_cls" type="primary" size="mini">支付</button>
    </div>
    <div class="main_marginer_cls" style="height: 15rpx;">
      
    </div>
  </div>
</template>
<script>
export default {
  props: {
    args: {
      type: Object,
      default: {

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
  font-family: 'iconfont-listitem';
  /* project id 1339582 */
  src: url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.eot');
  src: url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.woff') format('woff'),
    url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1339582_b8urklkqo6v.svg#iconfont') format('svg');
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
  flex-direction: column;
  display: flex;
  flex: 1;
  background-color: white;
}
.main_postfee_cls{
  padding: 20rpx;
  text-align: right;
}
.main_navis_cls{
  padding: 20rpx;
  flex-direction: row;
  /*align-items: center;*/
  /*display: flex;*/
  /*justify-content: center;*/
  align-items: flex-end;
  text-align: right;
}
.main_navis_button_cls{
  margin-left: 20rpx;
  min-width: 180rpx;
}
.main_marginer_cls{
  /*height: 15rpx;*/
  background-color: #f5f6f7;
}
.main_product_content_cls{
  /*width: 200rpx;*/
  /*margin: 20rpx;*/
  height: 200rpx;
  /*background-color: blue;*/
  display: flex;
  flex-direction: row;
}
.main_product_content_image_cls{
  width: 200rpx;
  height: 200rpx;
  margin-right: 10rpx;
}
.main_product_content_des_cls{
  /*background-color: pink;*/
  flex: 1;
}
.main_product_content_des_title_cls{
  /*flex: 1;*/
  display: flex;
}
.main_product_content_des_subtitle_cls{
  color: gray;
  display: flex;
}
.main_product_content_des_subtitle_1_cls{
  flex: 1;
}
.main_product_content_des_title_1_cls{
  flex: 1;
  display: inline-block;
  /*background-color: blue;*/
}
.main_content_cls {
  /*background-color: blue;*/
  margin-left: 20rpx;
  margin-top: 10rpx;
  /*border-bottom: 1rpx solid #e7e7e7;*/
  flex-direction: row;
  display: flex;
  align-items: center;
}

.main_content_last_cls {
  /*background-color: blue;*/
  margin-left: 20rpx;
  /*border-bottom: 1rpx solid #e7e7e7;*/
  flex-direction: row;
  display: flex;
  align-items: center;
}
.main_product_cls{
  /*margin-left: 20rpx;*/
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  background-color: #f5f6f7;
  /*background-color: red;*/
}
.main_content_icon_cls {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 90rpx;
  font-family: iconfont-listitem;
  /*background-color: orange;*/
}

.main_content_title_cls {
  /*background-color: pink;*/
  text-align: left;
  font-size: 30rpx;
  /*margin-left: 20rpx;*/
  /*justify-content: flex-start;*/
  /*align-items: flex-start;*/
  margin-right: 20rpx;
  /*flex: 1;*/
}

.main_content_subtitle_cls {
  /*background-color: pink;*/
  /*margin-left: 20rpx;*/
  /*margin-right: 20rpx;*/
  font-size: 22rpx;
  color: gray;
}

.main_content_arrow_cls {
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
.main_content_status_cls{
  /*background-color: red;*/
  align-items: center;
  justify-content: center;
  text-align: right;
  flex: 1;
  margin-right: 20rpx;

}
.main_content_status_span_cls{
  color: #b66b58;
}
</style>
