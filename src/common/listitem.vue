<template>
  <div class="container_class plain" open-type="contact">
    <div class="weui-cells__title">{{args.title}}</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_access" hover-class="weui-cell_active" @click="item.onClickCb" v-for="(item,index) in args.items" :key="index">
        <!-- <div class="weui-cell__hd"> -->
        <div class="container_icon_wrapper_wrapper_class" v-if="item.icon">
          <div class="container_icon_wrapper_class">
            <!-- <image :src="item.image" v-if="item.image" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image> -->
          <van-icon size="28rpx" class-prefix="iconfont" :name="item.icon" :color="item.color" />
          </div>
        </div>
        <div class="weui-cell__bd">{{item.title}}</div>
        <div class="weui-cell__ft weui-cell__ft_in" v-if="!item.clickable">{{item.subtitle}}<image :src="item.image" v-if="item.image" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image></div>
        <div class="weui-cell__ft weui-cell__ft_in-access" v-if="item.clickable">{{item.subtitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    args:{
      type: Object,
      default:{

      }
    },
    items: {
      type: Array,
      default: {
        title: '我的订单',
        subtitle: '',
        onClickCb: () => {
          // console.log(`###$onClickCb####`);
          var url = "../../pages/logs/main"
          wx.navigateTo({ url })
          console.log(wx);
        }
      },
    },
    title: {
      type: String,
      default: 'TITLE'
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
.container_class {
  width: 750rpx;
  /*height: 100rpx;*/
  /*background-color: red;*/
}
.container_icon_wrapper_wrapper_class{
  /*background-color: red;*/
  /*display: flex;*/
  height: 40rpx;
  width: 40rpx;
  margin: 0 10rpx 0 10rpx;
  display: flex;
}
.container_icon_wrapper_class{
  display: flex;
  width: 40rpx;
  height: 40rpx;
  border-radius: 10rpx;
  line-height: 40rpx;
  text-align: center;
  /*background-color: #252625;*/
  justify-content: center;
  align-items: center;
}
.weui-cell__hd{
  background-color: red;
  height: 40rpx;
  line-height: 40rpx;
  padding: 0;
  margin: 0 0 0 10rpx;
}


</style>
