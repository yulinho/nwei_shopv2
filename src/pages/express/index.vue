<template>
  <div class="main_ls">
    <div class="main_pict_ls">
      <swiper class="main_pict_swiper_ls" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in mdl.headimgs" :index="index" :key="key">
          <swiper-item>
            <image class="main_pict_swiper_img_ls" :src="item.url" mode="widthFix"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="main_blk_ls">
      <div class="main_blk_title_ls is-money">
        ¥{{mdl.reserve_price}}
      </div>
      <div class="main_blk_title_ls">
        {{mdl.title}}
      </div>
      <div class="main_blk_postfee_ls">
        快递: 12
      </div>
    </div>
    <div class="main_marginer_ls"></div>
    <div class="main_blk_ls" v-if="false">
      这些人刚刚购买成功
      <div class="main_blk_buyers_ls">
        <div :animation="animationData" class="main_blk_buyer_ls" v-for="(item,index) in items3" :key="index">
          <div class="main_blk_buyer_headimg_ls">
            <image class="main_blk_buyer_headimg_image_ls"></image>
          </div>
          <div class="main_blk_buyer_headimg_des1_ls is-size-5">
            何宇林{{index}}
          </div>
          <div class="main_blk_buyer_headimg_des2_ls is-size-5">
            刚刚花了49元购买
          </div>
        </div>
      </div>
    </div>
    <div class="main_marginer_ls"></div>
    <div class="main_blk_ls">
      <div class="main_blk_itemdetailtitle_ls">
        商品详情
      </div>
    </div>
    <div class="main_temdetailpics_ls">
      <div v-for="(item,index) in mdl.pics" :key="index">
        <image mode="widthFix" :src="'https://hz.heyulin.com/public/tinypng/'+item" class="main_temdetailpics_pic_ls"></image>
      </div>
    </div>
    <div class="main_ctrlbarmarginer_ls">
    </div>
    <div class="main_touchbar_ls" v-if="isIpx">
    </div>
    <div class="main_ctrlbar_ls">
      <div class="main_ctrlbar_content_ls">
        <button class="main_ctrlbar_content_icon_ls is-center is-plain-button" @click="onclickgotoindex">
          <div class="iconfont is-size-1">&#xe60f;</div>
          <div class="is-size-5">首页</div>
        </button>
        <button class="main_ctrlbar_content_icon_ls is-center is-plain-button" open-type="contact">
          <div class="iconfont is-size-1">&#xe644;</div>
          <div class="is-size-5">客服</div>
        </button>
        <div class="main_ctrlbar_content_button1_ls is-size-4 is-center" @click="onclickbuynow">
          <div>¥{{mdl.reserve_price}}</div>
          <div>直接购买</div>
        </div>
        <button class="main_ctrlbar_content_button2_ls is-size-4 is-center" open-type="share">
          <div>免费拿</div>
          <div>请3好友助力</div>
        </button>
      </div>
      <div class="main_touchbar_ls" v-if="isIpx">
      </div>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
let ctx
import t from 't'
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,

  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      items3: [1, 2, 3],
      q: ``,
      userInfo: {},
      isIpx: false,
      animationData: {},
      order__id: false,
      mdl: {},
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    let product= await t.getItem('product')
    ctx.mdl = product
    // t.toast('show3')
    // console.log(app);
    let isIpx = await t.getItem('isIpx')
    this.isIpx = isIpx

    let user = await t.getItem('user')
    // let product = await t.getItem('product')
    let user__id = user._id
    let res_order = await t.v2dispatch({
      type: `v2chuqidanopen`,
      payload: {
        product,
        chuqidanitem__id: product._id,
        chuqidanuser__id: user__id,
        nsp: `preorder`
      },
    })
    let chuqidanorder = res_order.data
    await t.setItem('chuqidanorder', chuqidanorder)
    ctx.order__id = chuqidanorder._id
    // console.log(`###$isIpx####`,isIpx);
  },
  onShareAppMessage(result) {
    let order__id = ctx.order__id
    let sharetofreepath = `/pages/free/main?order__id=${order__id}`
    let title = `急急急！帮我助力一下0元购，就差你了，谢谢你，爱你哟！`
    // ${order__id}
    // let title = sharetofreepath
    if (result.from === 'button') {
      // this.billId = 'billId-' + new Date().getTime()
    }
    return {
      title,
      path: sharetofreepath,
      success: async (res) => {
        // t.toast(`分享成功，此次path为：${path}`)
        // await this.$store.dispatch('createBill', { ...this.userInfo, ...this.billInfo })
        // // 上传图片
        // await this.$store.dispatch('uploadImg', {
        //   filePath: this.imgSrc,
        //   billId: this.billId
        // })
        // wx.redirectTo(`../item/main?billId=${this.billId}`)
      },
      fail(e) {
        console.log(e)
      }
    }
  },
  methods: {
    async onclickbuynow(){
      t.toast('微信支付申请中，此功能即将开放')
    },
    async onclickgotoindex() {

      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    async onclickproduct() {
      // t.toast('onclickproduct')
      t.open({
        url: '/pages/item/main'
      })
    },
    async onShow() {},
    async onclickget() {
      t.toast('onclickget')
    },
  },
  async onLoad(options) {

  },
  async created() {
    ctx = this
    await this.onShow()
    let translateY = 0
    let rate = await t.getItem('rate')
    setInterval(async () => {
      translateY += -90 * rate
      console.log(`###$go####`);
      let animation = wx.createAnimation({
        duration: 1500,
        timingFunction: "translateY",
        delay: 0,
        transformOrigin: "0 50%",

      })
      animation.translate(0, translateY).step();
      ctx.animationData = animation.export()
      ctx.items3.push(1)
    }, 5000)
    // t.toast(app.globalData.isIpx)
  }
}

</script>
<style scoped>
.main_ls {}

.main_ctrlbar_ls {
  width: 750rpx;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
}

.main_ctrlbar_content_ls {
  width: 750rpx;
  height: 120rpx;
  background-color: pink;
  flex-direction: row;
  display: flex;
}

.main_ctrlbar_content_icon_ls {
  width: 120rpx;
  height: 120rpx;
  background-color: white;
  flex-direction: column;
  line-height: 35rpx;
}

.main_ctrlbar_content_button1_ls {
  /*padding-top: 20rpx;*/
  flex: 1;
  flex-direction: column;
  background-color: #fba2a8;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 40rpx;
  color: white;
}

.main_ctrlbar_content_button2_ls {
  /*padding-top: 20rpx;*/
  flex: 1;
  flex-direction: column;
  background-color: #dd302d;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 40rpx;
  color: white;
  border-radius: 0;
  padding: 0;
}

.main_marginer_ls {
  width: 750rpx;
  height: 15rpx;
}

.main_pict_ls {
  width: 750rpx;
  height: 750rpx;
  /*background-color: red;*/
}
.main_pict_swiper_ls{
  width: 750rpx;
  height: 750rpx;

}
.main_pict_swiper_img_ls{
  width: 750rpx;
  height: 750rpx;

}
.main_pict_pic_ls {
  width: 750rpx;
  height: 750rpx;
}

.main_blk_ls {
  /*width: 730rpx;*/
  /*flex: 1;*/
  padding: 10rpx;
  /*height: 90rpx;*/
  background-color: white;
}

.main_blk_itemdetailtitle_ls {}

.main_temdetailpics_pic_ls {
  width: 100%;
  /*height: 750rpx;*/
  display: block;
}

.main_blk_title_ls {}

.main_blk_postfee_ls {
  color: #ababab;
  font-size: 24rpx;
  line-height: 30rpx;
}

.main_touchbar_ls {
  height: 60rpx;
  width: 750rpx;
}

.main_ctrlbarmarginer_ls {
  height: 120rpx;
  width: 750rpx;
}

.main_blk_buyers_ls {
  height: 180rpx;
  overflow: hidden;
}

.main_blk_buyer_ls {
  line-height: 90rpx;
  height: 90rpx;
  /*width: 750rpx;*/
  /*background-color: red;*/
  flex-direction: row;
  display: flex;
}

.main_blk_buyer_headimg_ls {
  width: 90rpx;
  height: 90rpx;
}

.main_blk_buyer_headimg_des1_ls {
  flex: 1;
}

.main_blk_buyer_headimg_des2_ls {
  /*text-align: right;*/
  /*flex: 1;*/
  /*background-color: blue;*/
  /*align-items: flex-end;*/
  /*justify-content: flex-end;*/
}

.main_blk_buyer_headimg_image_ls {
  width: 70rpx;
  height: 70rpx;
  border-radius: 35rpx;
  background-color: green;
  margin: 10rpx;
}

</style>
