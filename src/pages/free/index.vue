<template>
  <div class="main_ls">
    <div class="main_content_ls">
      <div class="main_content_inner_ls">
        <div class="main_content_inner_item_ls">
          <image class="main_content_inner_item_image_ls" :src="product.pict_url">
          </image>
          <div class="main_content_inner_item_image_des_ls">
            <div class="main_content_inner_item_image_des_title_ls">
              {{product.title}}
            </div>
            <div class="main_content_inner_item_image_des_counting_ls">
            </div>
            <div class="main_content_inner_item_image_des_footer_ls">
              3人助力免费拿
            </div>
          </div>
        </div>
        <div class="main_content_inner_progesstips_ls">
          <span v-if="helpstatus=='Pending'">已有{{helped_cnt}}好友助力，还差{{3-helped_cnt}}人</span>
          <span v-if="helpstatus=='Success'">3好友助力，恭喜您已经获得免费领取资格!</span>
        </div>
        <div class="main_content_inner_progesschart_ls">
          <div class="main_content_inner_progesschart_line_ls" :style="{width: (helped_cnt/3*100)+'%'}">
          </div>
        </div>
        <div class="main_content_inner_zhuli_ls" v-if="ownerorder">
          <button :animation="animationData" class="is-plain-button main_content_inner_zhuli_button_ls" @click="onclickgotozhuli" v-if="helpstatus=='Pending'" open-type="share">喊好友帮忙助力</button>
          <button :animation="animationData" class="is-plain-button main_content_inner_zhuli_button_ls" @click="onclickgotozhuli" v-if="helpstatus=='Success'">助力成功，点我支付邮费领取</button>
        </div>
        <div class="main_content_inner_zhuli_ls" v-if="!ownerorder">
          <button :animation="animationData" class="is-plain-button main_content_inner_zhuli_button_ls" @click="onclicktogoindex">助力成功！我也要免费领</button>
        </div>
        <div class="main_content_inner_zhuli_recordstitle_ls">
          助力记录
        </div>
        <div class="main_content_inner_zhuli_recordslist_ls">
          <div class="main_content_inner_zhuli_recordslist_item_ls" v-for="(item,index) in helpers" :key="index" v-if="helpers.length>0">
            <image v-if="!item.headimg" class="main_content_inner_zhuli_recordslist_item_image_ls" src="http://qiniu.heyulin.cn/who.png"></image>
            <image v-if="item.headimg" class="main_content_inner_zhuli_recordslist_item_image_ls" :src="item.headimg"></image>
            <div class="is-size-4 main_content_inner_zhuli_recordslist_item_title_ls">
              <span v-if="!item.nick">匿名好友</span>
              <span v-if="item.nick">{{item.nick}}</span>
            </div>
            <div class="is-size-4">
              成功助力了一下！
            </div>
          </div>
          <div class="main_content_inner_zhuli_recordslist_item_ls is-size-5" v-if="helpers.length==0">
            暂无
          </div>
        </div>
      </div>
    </div>
    <div class="is-main_ctrlbar_ls">
      <div class="is-main_ctrlbar_content_ls">
        <button class="is-main_ctrlbar_content_icon_ls is-center is-plain-button" @click="onclickgotoindex">
          <div class="iconfont is-size-1">&#xe60f;</div>
          <div class="is-size-5">回到首页</div>
        </button>
      </div>
      <div class="is-main_touchbar_ls" v-if="isIpx">
      </div>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
let ctx
import t from 't'
// import imgitem from 'common/imgitem'
// import listitem from 'common/listitem'
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,
    // imgitem,
    // listitem,
  },
  data() {
    return {
      isIpx: false,
      product: {},
      order__id: false,
      animationData: {},
      helpers: [],
      helpstatus: `Pending`,
      chuqidanorder: {},
      helped_cnt: 0,
      ownerorder: false,
      userInfo: {},
      imgitemargs: { title: `待付款`, img: `&#xe6ef;` },
      listitemargs: {
        items: [{
          title: '收货地址管理',
          icon: 'heart',
          subtitle: '',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // t.copy(this.inviter)
            t.toast('已复制到剪贴板')
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }, {
          title: '会员资料管理',
          icon: 'about',
          // subtitle: 'v1.2.0',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }, {
          title: '关于我们',
          icon: 'about',
          subtitle: 'v1.2.0',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }]
      },
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    let user = await t.getItem('user')
    while (!user) {
      user = await t.getItem('user')
      await t.sleep(1000)
    }
    await ctx.refreshOrder({
      user
    })
    // let product = await t.getItem('product')
    // let res_order = await t.v2dispatch({
    //   type: `v2chuqidanopen`,
    //   payadad: {
    //     chuqidanitem__id: product._id,
    //     chuqidanuser__id: user__id,
    //     nsp: `preorder`
    //   },
    // })
    // let chuqidanorder = res_order.data
    // await t.setItem('chuqidanorder', chuqidanorder)
    // ctx.order__id = chuqidanorder._id

    // let product = res_order.product
    // await t.setItem('product', product)
    // ctx.product = product
    // t.toast('show2')
  },
  onShareAppMessage(result) {
    let order__id = ctx.order__id
    let sharetofreepath = `/pages/free/main?order__id=${order__id}`
    let title = `急急急！帮我助力一下0元购，就差你了，谢谢你，爱你哟`
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
    async refreshOrder(args) {
      let { user } = args
      let res_ordegetr = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          localuser: user,
          chuqidanorder__id: order__id,
          nsp: `order_get`
        },
      })
      let chuqidanorder = res_ordegetr.data
      let { chuqidanuser__id } = chuqidanorder
      ctx.chuqidanorder = chuqidanorder
      ctx.helped_cnt = chuqidanorder.helpers.length
      ctx.helpstatus = chuqidanorder.helpstatus
      ctx.helpers = chuqidanorder.helpers

      let product = res_ordegetr.product
      console.log(product);
      await t.setItem('product', product)
      ctx.product = product

      // console.log(chuqidanorder);
      // t.toast(user._id);
      // console.log(chuqidanuser__id);
      if (`${user._id}` == chuqidanuser__id) {
        //自己订单
        ctx.ownerorder = true
      } else {
        //帮别人加速
        ctx.ownerorder = false
      }
    },
    async onclickgotoindex() {

      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    async onclicktogoindex() {

      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    onclickgotozhuli() {
      t.toast('onclickgotozhuli')
    },
    onclickmain() {
      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    async onRefreshUserinfo(data) {
      let { mp, } = data
      let { detail, } = mp
      let { userInfo, } = detail
      console.log(userInfo);

    },
    async onShow() {},
  },
  async onLoad(options) {
    // console.log(`url携带的参数为: ${JSON.stringify(options)}`)
    let user = await t.getItem(`user`)
    let { order__id } = options
    ctx.order__id = order__id
  },
  async created() {
    ctx = this
    // await this.onShow()
    let isIpx = await t.getItem('isIpx')
    this.isIpx = isIpx


    let user = await t.getItem('user')
    let user__id = user._id


    let animation = wx.createAnimation({
      duration: 618,
      timingFunction: "ease",
      // delay: 0,
      // transformOrigin: "50% 50%",

    })
    let next = true
    setInterval(function() {
      if (next) {
        //根据需求实现相应的动画
        animation.scale(1.05).step()
        next = !next;
      } else {
        animation.scale(1).step()
        next = !next;
      }
      ctx.animationData = animation.export()
    }.bind(this), 618)

  }
}

</script>
<style scoped>
.main_ls {
  flex: 1;
  min-height: 100vh;
  /*background-color: pink;*/
  background-color: #8d2417;
  background-image: url(http://qiniu.heyulin.cn/chuqidan_redpack_bg_tiny.png);
  background-size: contain;
  background-repeat: no-repeat;
  /*padding: 25rpx;*/
}

.main_content_ls {
  /*margin: 25rpx;*/
  padding: 50rpx;
  padding-top: 145rpx;
}

.main_content_inner_ls {
  width: 650rpx;
  /*height: 400rpx;*/
  background-color: white;
  border-radius: 15rpx;
  /*border-radius: 5rpx;*/
  padding-top: 25rpx;
  padding-bottom: 25rpx;
  /*opacity: 0.9;*/
}

.main_content_inner_item_ls {
  width: 600rpx;
  height: 200rpx;
  background-color: #f6f7f8;
  margin-left: 25rpx;
  flex-direction: row;
  display: flex;
  /*margin-top: 25rpx;*/
}

.main_content_inner_item_image_ls {
  height: 180rpx;
  width: 180rpx;
  margin: 10rpx;
  /*background-color: blue;*/
}

.main_content_inner_item_image_des_ls {
  width: 380rpx;
  height: 200rpx;
  margin-left: 10rpx;
  /*padding: 10rpx;*/
  /*background-color: orange;*/
  position: relative;
}

.main_content_inner_item_image_des_title_ls {
  margin-top: 10rpx;
}

.main_content_inner_item_image_des_counting_ls {
  flex: 1;
}

.main_content_inner_item_image_des_footer_ls {
  color: red;
  position: absolute;
  bottom: 10rpx;
  left: 0;
}

.main_content_inner_progesstips_ls {
  text-align: center;
  line-height: 80rpx;
  margin-top: 40rpx;
}

.main_content_inner_progesschart_ls {
  width: 600rpx;
  background-color: silver;
  height: 30rpx;
  margin-left: 25rpx;
  border-radius: 15rpx;
  overflow: hidden;
  position: relative;
}

.main_content_inner_progesschart_line_ls {
  /*width: 99%;*/
  height: 30rpx;
  background-color: #f4d855;
  position: absolute;
  left: 0;
  top: 0;
}

.main_content_inner_zhuli_ls {
  padding: 25rpx;
  /*padding-top: 50rpx;*/
  margin-top: 50rpx;
}

.main_content_inner_zhuli_recordstitle_ls {
  height: 80rpx;
  width: 600rpx;
  margin: 25rpx;
  margin-bottom: 0rpx;
  background-color: #fbe9c6;
  text-align: center;
  line-height: 80rpx;
  color: #a45335;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}

.main_content_inner_zhuli_recordslist_ls {
  /*line-height: 90rpx;*/
  width: 600rpx;
  margin-left: 25rpx;
  /*background-color: green;*/
  padding-top: 10rpx;
}

.main_content_inner_zhuli_recordslist_item_ls {
  /*line-height: 90rpx;*/
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 10rpx;
  background-color: white;
}

.main_content_inner_zhuli_recordslist_item_image_ls {
  width: 90rpx;
  height: 90rpx;
  border-radius: 45rpx;
  /*background-color: gold;*/
  margin-right: 10rpx;
}

.main_content_inner_zhuli_recordslist_item_title_ls {
  flex: 1;
}

.main_content_inner_zhuli_button_ls {
  background-color: #f2d854;
  padding: 15rpx 40rpx;
  border-radius: 60rpx;
  color: red;
  border-bottom: 5rpx solid #f3d049;
}

.main_bg_image_ls {
  width: 750rpx;
  height: 1110rpx;
}

</style>
