<template>
  <div class="container_class">
    <div class="container_canvas_wrapper_class">
      <canvas canvas-id="shareCanvas" class="container_canvas_class" v-if="!tempFilePath"></canvas>
      <image class="container_canvas_class" :src="tempFilePath" v-if="tempFilePath"></image>
      <button class="container_canvas_savebutton_class" plain :loading="disabled" :disabled="disabled" @click="onShowshare">立即邀请</button>
    </div>
    <popupMenu :args="args" />
  </div>
</template>
<script>
import t from 't'
import sleep from 'await-sleep'
import iPhoneX from 'AngryShell/iPhoneX'
import popupMenu from 'AngryShell/popupMenu'
let ctx
// const he = require('he');

export default {
  components: {
    iPhoneX,
    popupMenu,
  },
  data() {
    return {
      args: {
        iphonex: true,
        show: true,
        title: false,
        items: [{
          title: '发给好友',
          code: `&#xe63d;`,
          openType: 'share',
          click: () => {
            // console.log(`###$11####`);
          }
        }, {
          title: '海报分享',
          code: `&#xe609;`,
          click: () => {
            // console.log(`###$11####`);
            console.log(`###$on save####`);
            ctx.savePict()
          }
        }, ]
      },
      tempFilePath: false,
      is_show_shares: true,
      disabled: true,
      rpx_rate: 1,
      user: {},
    }
  },

  computed: {
    pay_amt_vip() {
      if (this.pay_amt) {
        return (parseFloat(this.pay_amt * 0.7)).toFixed(2)
      } else {
        return 0
      }
    }
  },

  async onShow() {},
  methods: {
    async onShowshare() {
      // this.is_show_shares = true

      this.args = {
        ...this.args,
        show: true,
      }
    },
    async onSendCard() {
      // this.is_show_shares = true
    },
    async onCancel() {
      this.args = {
        ...this.args,
        show: false,
      }
      // this.is_show_shares = false
    },
    async onSave() {
      await this.savePict()
    },
    async initShare() {
      ctx.disabled = true
      const canvas_ctx = wx.createCanvasContext('shareCanvas')
      let share_pict_url = await t.getItem('share_pict_url')
      console.log(share_pict_url);
      let rpx_rate = ctx.rpx_rate
      // share_pict_url = `https://egg.heyulin.com/public/temp/qrcode/quanmao_user_id_8.png`
      // console.log(share_pict_url);
      // let timeStamp = Math.random()
      // share_pict_url = `${share_pict_url}?t=${timeStamp}`
      // console.log(share_pict_url);
      // 1125 2000
      // let shareqrcodebg = `http://qiniu.heyulin.cn/quanmao_shareqrcodebg.jpg`
      let shareqrcodebg = `https://egg.heyulin.com/public/quanmao_shareqrcodebg.jpg`
      let shareqrcodebg_res = await t.getImageInfo({
        src: shareqrcodebg,
      })
      // console.log(shareqrcodebg_res);
      let shareqrcodebg_path = shareqrcodebg_res.path
      // canvas_ctx.setFillStyle('#53a553')
      // canvas_ctx.fillRect(0, 0, 600 * rpx_rate, 1066 * rpx_rate)
      canvas_ctx.drawImage(shareqrcodebg_path, 0 * rpx_rate, 0 * rpx_rate, 600 * rpx_rate, 1066 * rpx_rate)
      let share_pict_url_res = await t.getImageInfo({
        src: share_pict_url,
      })
      let share_pict_url_path = share_pict_url_res.path
      canvas_ctx.drawImage(share_pict_url_path, 392 * rpx_rate, 830 * rpx_rate, 100 * rpx_rate, 100 * rpx_rate)
      canvas_ctx.draw()
      await this.preSavePict()
      // wx.getImageInfo({
      //   src: shareqrcodebg,
      //   success: async (res) => {
      //     // console.log(res);
      //     // console.log(res.width)
      //     // console.log(res.height)
      //     let rpx_rate = ctx.rpx_rate
      //     let path = res.path
      //     const canvas_ctx = wx.createCanvasContext('shareCanvas')
      //     // canvas_ctx.setFillStyle('#53a553')
      //     canvas_ctx.fillRect(0, 0, 600 * rpx_rate, 1066 * rpx_rate)

      //     canvas_ctx.drawImage(res.path, 0 * rpx_rate, 0 * rpx_rate, 600 * rpx_rate, 1066 * rpx_rate)
      //     // canvas_ctx.draw()
      //     // canvas_ctx.setTextAlign('center') // 文字居中
      //     // canvas_ctx.setFillStyle('#fff') // 文字颜色：黑色
      //     // canvas_ctx.setFontSize(15) // 文字字号：22px
      //     // canvas_ctx.fillText('向您分享了一张毒券', 600 * rpx_rate / 2, 66 * rpx_rate)
      //     // canvas_ctx.fillText('长按识别小程序，获取超值优惠券吧', 600 * rpx_rate / 2, 666 * rpx_rate)
      //     // canvas_ctx.stroke()
      //     canvas_ctx.draw()
      //     ctx.disabled = false

      //   },
      //   fail: async (res) => {
      //     console.log(res);
      //     ctx.disabled = true
      //     await sleep(10000);
      //     await t.toast('重新生成中');
      //     //retry
      //     await ctx.initShare()
      //   }
      // })
      // console.log(shareqrcodebg_res.path);
    },
    async preSavePict() {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 600 * ctx.rpx_rate,
        height: 1066 * ctx.rpx_rate,
        destWidth: 1125 * ctx.rpx_rate,
        destHeight: 2000 * ctx.rpx_rate,
        canvasId: 'shareCanvas',
        async success(res) {
          // console.log(res.tempFilePath)
          ctx.tempFilePath = res.tempFilePath
          // await t.alert({
          //   content: ctx.tempFilePath,
          // });
          ctx.disabled = false
        }
      })
    },
    async savePict() {
      t.toast('保存中')
      let tempFilePath = this.tempFilePath
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(res) {
          t.toast('保存到相册成功，现在发送给你的好友吧。')
        }
      })
    },
    async fetch_items() {
      Tools.wait()
      let q = this.q
      let stype = this.stype
      console.log(q);
      let nsp = 'quanmao_quanmaobrands_get'
      let res = await Tools.dispatch({
        type: 'quanmao/open',
        payload: {
          stype,
          q,
          nsp,
          t: Math.random(),
        },
      })
      let quanmaobrands = res[`${nsp}_response`].quanmaobrands
      this.quanmaobrands = quanmaobrands
      Tools.ok()

    },
  },
  async onLoad(query) {
    // console.log(ctx);

    const systeminfo = wx.getSystemInfoSync()
    let { windowWidth, windowHeight } = systeminfo
    this.rpx_rate = windowWidth / 750
    const scene = decodeURIComponent(query.scene)
    // let inviter_user_id = scene.split('=')[1]
    // let user = await this.syncLogin()
    // if (inviter_user_id) {
    //   console.log(inviter_user_id);
    //   await Tools.setItem('inviter_user_id', inviter_user_id)
    //   let nsp = 'sucker_create'
    //   let res2 = await Tools.dispatch({
    //     type: 'quanmao/open',
    //     payload: {
    //       inviter_user_id,
    //       user_id: user.id,
    //       nsp,
    //       t: Math.random(),
    //     },
    //   })
    // }
    await this.initShare()
  },
  async created() {
    ctx = this
    this.csztrade = await t.getItem('csztrade')
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let user = this.user
    // console.log(user);
    // let csztrade = await t.getItem('csztrade')
    let csztrade = this.csztrade
    let csztrade_id = csztrade.id
    let user_id = user.id
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: `送你一个超大红包，猜得中钱全是你的${csztrade_id}`,
      // path: '/pages/index/main?id=123',
      // imageUrl:'http://qiniu.heyulin.cn/quanmao_shareqrcodebg.jpg',
      imageUrl: 'http://qiniu.heyulin.cn/csz_sharecardbg.png',
      path: `/pages/trade/main?scene=csztrade_id%3D${csztrade_id}`,
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function(res) {
        // 不管成功失败都会执行
      }
    }
  },
}

</script>
<style scoped>
.container_class {
  display: flex;
  flex-direction: column;
  /*background-color: #ececec;*/
  background-color: #52ab6f;
  min-height: 100vh;
}

.container_canvas_wrapper_class {
  display: flex;
  flex: 1;
  flex-direction: column;
  /*background-color: blue;*/
  align-items: center;
  justify-content: center;
}

.container_canvas_savebutton_class {
  margin: 15rpx;
  background-color: #2f2f2f;
  color: white;
}

.container_canvas_class {
  display: flex;
  width: 600rpx;
  height: 1066rpx;
  /*background-color: red;*/
}

</style>
