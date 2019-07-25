<template>
  <div class="c_cla">
    <!-- @click="clickHandle('test click', $event)" -->
    <!-- <mp-button type="primary" size="large" btnClass="mb15">默认按钮2</mp-button> -->
    <!-- <van-popup z-index="4918605" :show="is_show_items" :close-on-click-overlay="false" custom-style="background:transparent" position="top" :overlay="true" @close="onClose"> -->
    <nor v-if="!items.length" />
    <div>
      <Item :args="item" @clicksub="item.onClickSubdesc" @clickDesc="item.onClickDesc" @click="" v-for="(item,index) in items" :key="index" />
    </div>
  </div>
  <!-- </van-popup> -->
  <!--<div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
     <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->
  <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>
<script>
import card from '@/components/card'
import nor from 'AngryShell/nor'
// import asLocation from '../../AngryShell/src/location';
// import asItem from '../../AngryShell/src/item';
// import Tools from '../../AngryShell/src/tools';
// import mpSearchbar from 'mpvue-weui/src/searchbar';
// import mpNavbar from 'mpvue-weui/src/navbar';
// import ZanStepper from 'mpvue-zanui/src/pages/zan_stepper';
// import asStepper from '../../AngryShell/src/stepper';
// import Notify from '@/../static/vant/notify/notify'
// import Toast from '@/../static/vant/toast/toast'
// import Tools from '@/AngryShell/src/tools'
import t from 't'
import Item from 'AngryShell/item'
const recorderManager = wx.getRecorderManager()
const SAYTITLE = '按住说出以上口令领红包'
// const SAYTITLE = '按住练练您的普通话'
const SAYTITLE2 = '松开结束录音'
import SiriWave from '@/utils/siriwave'
// import SiriWave from 'siriwave'
let ctx
let that_siriWave
const options = {
  duration: 60000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 64000,
  format: 'mp3',
  frameSize: 50
}
export default {
  components: {
    Item,
    nor,
    // asStepper,
    // mpNavbar,
    // asLocation,
    // asItem,
    // card,
    // mpButton,
    // mpSearchbar,

  },

  data() {
    return {
      user: {},
      items: [],
      options: {},
      hmbbhuoma: {},
      args: {
        pict_url: 'http://qn.heyulin.com/qrcode.png',
        title: '序号',
        tag: '已扫',
        desc: '点击删除',
        subdesc: 'subdesc',
      },
      hidecanvas: true,
      firstCanvas_context: false,
      siriWave: false,
      unid: `${(new Date()).valueOf()}${Math.random()}`,
      title: '',
      threshold: '5000',
      cnt: '1',
      btn_title: SAYTITLE,
      inviter_user_id: false,
      the_city: '杭州',
      actions: [{
          name: '选项'
        },
        {
          name: '分享',
          subname: '描述信息',
          openType: 'share'
        },
        {
          loading: true
        },
        {
          name: '禁用选项',
          disabled: true
        }
      ],
      show: false,
      stype: undefined,
      pay_amt: 0,
      cart_list: [],
      quanmaobrand: {

      },
      // quanmaocoupons: [],
      tabs: [{
        title: '全部',
        stype: undefined,
      }, {
        title: '吃(mai)',
        stype: '吃'
      }, {
        title: '穿(dan)',
        stype: '穿'
      }, {
        title: '住(shen)',
        stype: '住'
      }, {
        title: '行(qian)',
        stype: '行'
      }, ],
      quanmaobrands: [],
      stepper1: {
        stepper: 0,
        min: 0,
        max: 99
      },
      is_show_items: true,
      // items: [1, 2, 3,],
      quanmaocoupons: [{
        title: 'tea',
        cnt: 0,
        deal_price: 0.01,
      }, {
        title: 'teavana',
        cnt: 0,
        deal_price: 0.01,
      }, ],
      second_height: 0,
      container_scroll_style: { 'height': '380px' },
      q: '',
      card: [1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, ],
      motto: 'Hello World',
      userInfo: {}
    }
  },

  computed: {
    charge() {
      return (this.amt * 0.02).toFixed(2)
    },
    pay_amt_vip() {
      if (this.pay_amt) {
        return (parseFloat(this.pay_amt * 0.7)).toFixed(2)
      } else {
        return 0
      }

    },
    the_tabs() {
      let tab_str = []
      for (var i = this.tabs.length - 1; i >= 0; i--) {
        let tab = this.tabs[i]
        tab_str.push(tab.title)
      }
      return tab_str.reverse()
    }
  },
  async onReady(e) {
    // let firstCanvas_context = wx.createCanvasContext('firstCanvas')
    // this.firstCanvas_context = firstCanvas_context
    // let ctx = this
    // let pixelRatio = 0
    // wx.getSystemInfo({
    //   success: function(res) {
    //     // console.log(res);
    //     // pixelRatio = res.pixelRatio
    //     let { screenWidth, } = res
    //     let rate = screenWidth / 375
    //     // console.log(pixelRatio);
    //     that_siriWave = new SiriWave({
    //       // container,
    //       ctx: ctx.firstCanvas_context,
    //       width: 60 * rate,
    //       height: 75 * rate,
    //     });
    //   },
    //   fail: function() {
    //     pixelRatio = 0
    //   }
    // })

    // context.setStrokeStyle('#00ff00')
    // context.setLineWidth(5)
    // context.rect(0, 0, 200, 200)
    // context.stroke()
    // context.setStrokeStyle('#ff0000')
    // context.setLineWidth(2)
    // context.moveTo(160, 100)
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()
    // context.draw()
    // },
    // await this.onRefresh()
    // let res = await Tools.getLocation()
    // let nsp = 'quanmao_userlocation_update'
    // let user = await Tools.getItem('user')
    // let res2 = await Tools.dispatch({
    //   type: 'quanmao/open',
    //   payload: {
    //     id: user.id,
    //     wx_userLocation: JSON.stringify(res),
    //     // stype,
    //     // q,
    //     // item: item,
    //     // user_id,
    //     // stype: this.stype,
    //     // page_no,
    //     // q,
    //     nsp,
    //     t: Math.random(),
    //   },
    // })
    // console.log(res2);
    // let quanmaobrands = res[`${nsp}_response`].quanmaobrands
    // await Tools.toast(res)
  },
  methods: {
    async fetch_hmbbhuomas() {
      this.items = []
      let nsp = 'hmbbhuomas_get'
      let hmbbuser__id = this.user._id
      let res = await t.v2dispatch({
        type: 'v2hmbbopen',
        payload: {
          hmbbuser__id,
          nsp,
        },
      })
      // console.log(res.data);
      let hmbbhuomas = res.data
      for (var i = 0; i < hmbbhuomas.length; i++) {
        let hmbbhuoma = hmbbhuomas[i]
        this.items.push({
          pict_url: hmbbhuoma.qrcode,
          title: `${hmbbhuoma.title}`,
          tag: `阈值: ${hmbbhuoma.threshold}`,
          // subdesc: t.formatTime(hmbbhuoma.created_at),
          subdesc: '删除',
          desc: '点击编辑本条活码',
          onClickSubdesc: async () => {
            // t.toast('subdesc')
            let isok = await t.alert({
              title: '提示',
              content: '确认删除吗',
              showCancel: true,
            })
            if (isok) {
              let nsp = 'hmbbhuomas_update'
              hmbbhuoma.trash = 1
              let res = await t.dispatch({
                type: 'v2hmbbopen',
                payload: {
                  // hmbbqrcode: JSON.stringify(hmbbqrcode),
                  hmbbhuomas: hmbbhuoma,
                  nsp,
                },
              })
              t.toast('已删除')

              ctx.items = []
              await ctx.fetch_hmbbhuomas()
            } else {
              t.toast('取消删除')
            }
          },
          onClickDesc: async () => {
            // console.log(hmbbhuoma);
            await t.setItem('hmbbhuoma', hmbbhuoma)
            t.open({
              url: '/pages/create/main'
            })
            return
            let nsp_hmbbhuoma = 'hmbbhuoma_update'
            hmbbhuoma.trash = 1
            let res_hmbbhuoma = await t.dispatch({
              type: 'v2hmbbopen',
              payload: {
                hmbbhuoma: JSON.stringify(hmbbhuoma),
                nsp: nsp_hmbbqrcode,
              },
            })
            // console.log(res_hmbbqrcode);
            ctx.items = []
            await ctx.fetch_hmbbhuomas()
          }
        })
      }
      // this.hmbbqrcodes = hmbbqrcodes
    },
    async onClickSave() {
      let url = this.hmbbhuoma.qrcodes
      console.log(url);
      t.toast('保存中。。。')
      let isok = await t.save({
        url,
      })
      // console.log(isok);
      if (isok) {
        t.toast('已保存到相册')
      } else {
        t.toast('保存失败')
      }
    },
    async onShow() {
      // let hmbbhuoma = await t.getItem('hmbbhuoma')
      // if (hmbbhuoma) {
      //   console.log(`###$ok####`);
      //   this.hmbbhuoma = hmbbhuoma
      //   this.unid = hmbbhuoma.unid
      //   this.title = hmbbhuoma.title
      // }
      let user = await t.getItem('user')
      // console.log(user);
      this.user = user
      await this.fetch_hmbbhuomas()
    },
    async onClickStep2() {
      // t.wait('上传中。。。')
      // var that = this;
      // 选择图片
      let options = this.options
      let { url, } = await t.qnupload({
        options,
      })
      // console.log(url);
      // t.toast(url)
      if (url) {
        let nsp = 'hmbbqrcode_create'
        let hmbbqrcode = {
          user_id: this.user.id,
          url,
          cnt: 0,
        }
        let res = await t.dispatch({
          type: 'v2hmbbopen',
          payload: {
            hmbbqrcode: JSON.stringify(hmbbqrcode),
            nsp,
          },
        })
        let data = res.data
        let hmbbqrcodes = res.result.hmbbqrcodes
        console.log(data);
        console.log(hmbbqrcodes);
        t.toast('已上传')
        // this.items = []
        await this.fetch_hmbbhuomas()
      }
    },
    async onClickStep1() {
      t.wait('玩命处理中。。。')
      let user = await t.getItem('user')
      let user_id = user.id
      let hmbbhuoma = {
        title: this.title,
        threshold: this.threshold,
        unid: this.unid,
        user_id,
      }
      let nsp = 'hmbbhuoma_update'
      let res = await t.dispatch({
        type: 'v2hmbbopen',
        payload: {
          hmbbhuoma: JSON.stringify(hmbbhuoma),
          nsp,
        },
      })
      let data = res.data
      // console.log(data);
      await t.setItem('hmbbhuoma', data)
      // this.hmbbhuoma = data
      t.toast('保存成功，现在可以进入第二步添加图片了')
      await this.onShow()
      // console.log(res);
      // console.log(hmbbhuoma);
    },
    async onClickDesc() {
      t.toast('onClickDesc')
    },
    async wxacode_make(args) {
      let { csztrade } = args
      let csztrade_id = csztrade.id
      let nsp = 'wxacodeunlimit_make'
      let res = await t.dispatch({
        type: 'csz/open',
        payload: {
          csztrade_id,
          // user_id,
          // title,
          // amt,
          // cnt,
          // stype,
          // q,
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          nsp,
        },
      })
      let { message } = res
      if (message == 'SUCCESS') {

      }
    },
    async initWave(args) {
      // let { ctx, pixelRatio } = args
      // console.log(SiriWave);
      // console.log(typeof(SiriWave));
      // console.log(typeof(document));
      // const ctx = wx.createCanvasContext('myCanvas')
      // ctx.setFillStyle('red')
      // // 从左上角(0, 0)开始，画一个150 x 75px 的矩形。
      // ctx.fillRect(10, 10, 150, 75)
      // ctx.draw()
      // return
      // let container = document.getElementById('siri-container')
      // console.log(container);
      // let ctx = firstCanvas_context
      // console.log(pixelRatio);
      // if (ctx) {
      // console.log(ctx);
      // that_siriWave = new SiriWave({
      //   // container,
      //   ctx: ctx,
      //   width: 65,
      //   height: 75,
      // });

      // console.log('siriWave');
      // }
    },
    async onChangetitle(e) {
      this.title = e.mp.detail
    },
    async onChangethreshold(e) {
      // console.log(e.mp.detail);
      this.threshold = e.mp.detail
    },
    async onChangecnt(e) {
      // console.log(e.mp.detail);
      this.cnt = e.mp.detail
    },
    async onClickSubmit(e) {
      if (this.tpwd == '') {
        t.toast(`数字不能为空`)
        return
      }
      if (this.tpwd > 100 || this.tpwd < 0) {
        t.toast(`数字须0到100之间`)
        return


      }
      if (!(this.amt > 0)) {
        t.toast(`金额须大于0`)
        return
      }
      t.wait()
      let tpwd = this.tpwd
      let amt = this.amt
      let cnt = this.cnt
      let nsp = 'trade_make'
      let user = await t.getItem('user')
      let user_id = user.id
      let res = await t.dispatch({
        type: 'csz/open',
        payload: {
          user_id,
          tpwd,
          amt,
          cnt,
          // stype,
          // q,
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          nsp,
        },
      })
      t.ok()
      t.toast(res.message)
      let csztrade = res.data
      console.log(csztrade);
      //paynow
      //payok then
      await t.setItem('csztrade', csztrade)
      t.open({
        url: '/pages/share/main'
      })
      // await this.wxacode_make({ csztrade })


      // console.log(this.amt, this.tpwd);
      // Tools.toast(this.amt)
      // this.tpwd = this.amt
    },
    async onTouchcancel(e) {
      console.log(e);
    },
    async onTouchstart(e) {
      this.hidecanvas = false
      console.log(e);
      this.btn_title = SAYTITLE2
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
      recorderManager.start(options);
      // if (!this.siriwave) {
      // ctx.initWave({ ctx: this.firstCanvas_context, pixelRatio: 1 })

      // }
      that_siriWave.start()

    },
    async onTouchend(e) {
      this.hidecanvas = true
      this.btn_title = SAYTITLE
      wx.setKeepScreenOn({
        keepScreenOn: false
      })
      recorderManager.stop();
      that_siriWave.stop()

    },
    async onLongpress(e) {},
    async onClick(e) {
      console.log(e);
    },
    async syncLogin() {
      let user = await Tools.syncLogin()
      let { data_quanmao, wx_userInfo, } = user
      // console.log(data_quanmao);
      data_quanmao = JSON.parse(data_quanmao)
      let userInfo = JSON.parse(wx_userInfo)
      await Tools.setItem('data_quanmao', data_quanmao)
      await Tools.setItem('userInfo', userInfo)
      let session_key = data_quanmao.session_key
      let user_id = user.id
      return user
    },
    async onRefresh() {
      let user = await Tools.getItem('user')
      // console.log(user);
      try {
        let last_location = JSON.parse(user.last_location)
        this.the_city = last_location.city ? last_location.city : last_location.region
        // console.log(this.the_city);
      } catch (e) {
        // statements
        console.log(e);
      }
    },
    onClick() {
      this.show = true
    },
    onClose() {
      this.show = falsei
    },
    onSelect(event) {
      console.log(event.detail)
    },
    async onChange(q) {
      // console.log(q);
      await this.fetch_items()

    },
    async myIHaveTheBill() {

      let cart_list = []
      let pay_amt = 0
      for (let i = this.quanmaocoupons.length - 1; i >= 0; i--) {
        let item = this.quanmaocoupons[i]
        if (item.cnt > 0) {
          pay_amt += parseFloat(item.deal_price * item.cnt)
          cart_list.push(item)
        }
      }
      this.pay_amt = pay_amt
      this.cart_list = cart_list
    },
    async onClickStype(index) {
      // console.log(item);
      let tab = this.tabs[index]
      let stype = tab.stype
      this.stype = stype
      await this.fetch_items()
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
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          nsp,
          t: Math.random(),
        },
      })
      // console.log(res);
      let quanmaobrands = res[`${nsp}_response`].quanmaobrands
      // console.log(quanmaobrands);
      this.quanmaobrands = quanmaobrands
      Tools.ok()
      // let total_cnt = res[`${nsp}_response`].total_cnt

    },
    async fetch_coupons(item) {
      // console.log(item);
      Tools.wait()
      let quanmaobrand_id = item.id
      let nsp = 'quanmao_quanmaocoupons_get'
      let res = await Tools.dispatch({
        type: 'quanmao/open',
        payload: {
          quanmaobrand_id,
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          nsp,
          t: Math.random(),
        },
      })
      // console.log(res);
      let quanmaocoupons = res[`${nsp}_response`].quanmaocoupons
      // console.log(quanmaocoupons);
      this.quanmaocoupons = []
      for (var i = quanmaocoupons.length - 1; i >= 0; i--) {
        let quanmaocoupon = quanmaocoupons[i]
        let subtitle = item.subtitle
        // console.log(subtitle);
        let tags = subtitle.split(';')
        if (!tags.length) {
          tags = [subtitle]
        }
        this.quanmaocoupons.push({
          id: quanmaocoupon.id,
          title: quanmaocoupon.title,
          subtitle: quanmaocoupon.subtitle,
          pict_url: quanmaocoupon.pict_url,
          deal_price: quanmaocoupon.deal_price,
          code_type: quanmaocoupon.code_type,
          tags,
          cnt: 0,
          pv: 0,
        })
      }
      Tools.ok()
      // let total_cnt = res[`${nsp}_response`].total_cnt

    },
    async onClickPay() {
      Tools.wait('创建订单中')
      console.log(`###$onClickPay####`);
      // let cart = {}
      // cart.list = []
      let data_quanmao = await Tools.getItem('data_quanmao')
      let user = await Tools.getItem('user')
      let userInfo = await Tools.getItem('userInfo')
      let { openid, } = data_quanmao
      let user_id = user.id
      let user_nickname = userInfo.nickName
      let cart_list = this.cart_list
      let nsp = 'quanmao_quanmaotrades_make'
      let res = await Tools.dispatch({
        type: 'quanmao/open',
        payload: {
          cart_list: JSON.stringify(cart_list),
          // stype,
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          // openid,
          user_id,
          user_nickname,
          nsp,
          t: Math.random(),
        },
      })
      // console.log(res);
      let quanmaotrade = res[`${nsp}_response`].quanmaotrade
      let sub_msg = res[`${nsp}_response`].sub_msg
      let amt = quanmaotrade.amt
      let tid = quanmaotrade.id
      let title = quanmaotrade.title
      // let sub_msg = quanmaotrade.sub_msg
      // Tools.toast(`订单成交成功，需付${amt}元`)
      Tools.ok()
      // Tools.toast(`${sub_msg}`)
      this.is_show_items = false
      // console.log(`###${pay_amt}####`);
      // let {timeStamp, nonceStr, packageValue, sign} = {自己服务器接口，会吐出相关字段，具体开发获取见官方文档};
      // console.log(this.userInfo);
      let ispayok = await Tools.pay({
        method: 'WXPAY',
        title,
        tid,
        amt,
        openid,
      })
      if (ispayok) {
        await this.onRefresh('event_refersh_trades', 'true')
        const url = '../trades/main'
        wx.navigateTo({ url })
      }
    },
    handleZanStepperChange(e) {
      const { componentId, stepper } = e
      // this[componentId].stepper = stepper
      console.log(this.quanmaocoupons);
      this.quanmaocoupons[componentId].cnt = stepper
      this.myIHaveTheBill()
    },
    async onClickOpen(item) {
      this.quanmaobrand = item
      this.is_show_items = true

      await this.fetch_coupons(item)

    },
    onClickClose() {
      this.is_show_items = false
    },
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log(`###${'marked'}####`);
          wx.getUserInfo({
            success: (res) => {
              console.log(res);
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle(msg, ev) {
      // console.log('clickHandle:', msg, ev)
    }
  },
  async onLoad(query) {
    // Tools.toast(query)
    // console.log(`###$query####`);
    // console.log(`###$onLoad####`);
    // console.log(query);
    // console.log(query);
    // const scene = decodeURIComponent(query.scene)
    // user_id=10000639
    // t.toast(scene)
    // console.log(scene);
    // let inviter_user_id = user_id
    // console.log(user_id);
    // let user = await this.syncLogin()

    // // console.log(user);

    // if (scene) {
    //   let csztrade_id = scene.split('=')[1]
    //   // console.log(`###$csztrade_id####`,csztrade_id);
    //   // console.log(csztrade_id);
    //   if (csztrade_id > 0) {
    //     await t.setItem('csztrade_id', csztrade_id)
    //     t.open('../trade/main')
    //   }
    // }
    // console.log(`###${'marked'}####`);
    // return;
    // if (inviter_user_id) {
    //   console.log(inviter_user_id);
    //   await Tools.setItem('inviter_user_id', inviter_user_id)

    //   let nsp = 'sucker_create'
    //   // let user = await Tools.getItem('user')
    //   let res2 = await Tools.dispatch({
    //     type: 'quanmao/open',
    //     payload: {
    //       inviter_user_id,
    //       user_id: user.id,
    //       // id: user.id,
    //       // wx_userLocation: JSON.stringify(res),
    //       // stype,
    //       // q,
    //       // item: item,
    //       // user_id,
    //       // stype: this.stype,
    //       // page_no,
    //       // q,
    //       nsp,
    //       t: Math.random(),
    //     },
    //   })
    // }
    // console.log(scene);
    // console.log(query);
    // console.log(scene);
  },
  async onShow() {
    // t.toast('onshow')
    // this.hmbbhuoma = {}
    this.title = ''
    await this.onShow()
    let qnoptions = await t.getItem('qnoptions')
    this.options = qnoptions
  },
  async created() {
    // 调用应用实例的方法获取全局数据
    // Tools.toast('created')
    ctx = this

    // recorderManager.onStop(async (res) => {
    //   // console.log('recorder stop', res);
    //   const { tempFilePath, } = res;
    //   // console.log(tempFilePath);
    //   // return
    //   // console.log(Tools.dispatch);
    //   let nsp = 'shbao_upload'
    //   let resp = await Tools.dispatch({
    //     type: 'shbao/open/upload',
    //     payload: {
    //       file_path: tempFilePath,
    //       nsp,
    //       t: (new Date()).valueOf(),
    //     },
    //   })
    //   // Tools.toast(resp.text)
    //   // console.log(resp);
    //   // Tools.toast(JSON.parse(resp).text);
    //   let tpwd = JSON.parse(resp).text.data
    //   // Tools.toast('tpwd')
    //   // Tools.toast(tpwd.data)
    //   ctx.tpwd = tpwd

    // })
    // this.getUserInfo()


    // wx.login({
    //   success: function(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       console.log(res);
    //       let code = res.code

    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
    // wx.getSystemInfo({
    //   success: function(res) {
    //     // console.log(res);
    //     // 可使用窗口宽度、高度
    //     // console.log('height=' + res.windowHeight);
    //     // console.log('width=' + res.windowWidth);
    //     let height = res.windowHeight - 190 / 750 * res.windowWidth
    //     // console.log(`###${res.windowHeight}####`);
    //     // console.log(`###${height}####`);
    //     // ctx.container_scroll_style = {
    //     //   height: `${height}rpx`,
    //     // }
    //     ctx.second_height = Math.floor(height) - 1
    //     // 计算主体部分高度,单位为px
    //     // that.setData({
    //     //   // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
    //     //   second_height: res.windowHeight - res.windowWidth / 750 * 300
    //     // })
    //   }
    // })
    // await ctx.fetch_items()

  }
}

</script>
<style scoped>
.c_cla {
  display: flex;
  flex-direction: column;
  background-color: #ececec;
}

.container_coupons_class {
  margin: 50rpx;

  margin-top: 100rpx;
  height: 100%;
  /*background-color: red;*/
  display: flex;
  flex: 1;
  flex-direction: column;
}

.container_coupons_marginer_class {
  flex: 1;
  display: flex;
}

.container_coupons_content_class {
  display: flex;
  /*flex: 1;*/
  flex-direction: column;
  position: relative;
  /*background-color: blue;*/
}

.container_coupons_content_addqrcode_class {
  padding: 30rpx;
}

.container_coupons_content_brand_class {
  /*border-radius: 50%;*/
  border-radius: 15rpx;
  position: absolute;
  left: 250rpx;
  top: -75rpx;
  width: 150rpx;
  height: 150rpx;
  background-color: white;
}

.container_coupons_content_brand_2_class {
  /*border-radius: 50%;*/
  position: absolute;
  left: 250rpx;
  top: -75rpx;
  width: 150rpx;
  height: 150rpx;
  background-color: rgba(0, 0, 0, 0.6);
  /*background-color: white;*/
}

.container_coupons_content_scroller_item_image_class {
  width: 130rpx;
  height: 130rpx;
  margin-left: 10rpx;
  margin-top: 10rpx;
  /*border-radius: 50%;*/
  overflow: hidden;
}

.container_coupons_content_brand_download_class {
  /*background-color: red;*/
  /*line-height: 150%;*/
  font-size: 25rpx;
  text-align: center;
  color: blue;
  /*text-decoration: underline;*/

}

.container_coupons_content_brand_download_class span {
  font-family: iconfont;
}

.container_coupons_content_scroller_item_image_text_class {
  width: 130rpx;
  height: 130rpx;
  align-content: center;
  justify-content: center;
  display: flex;
}

.container_coupons_content_scroller_item_image_text_text_class {
  font-family: iconfont;
  font-size: 80rpx;
}

.container_coupons_content_scroller_item_image_image_class {
  width: 130rpx;
  height: 130rpx;
}

.container_coupons_content_scroller_item_image_canvas_class {
  /*background-color: blue;*/
  width: 130rpx;
  height: 130rpx;
}

.container_coupons_content_scroller_item_image_wave_class {
  background-color: red;
  width: 130rpx;
  height: 130rpx;
  position: absolute;
  left: 10rpx;
  top: 10rpx;
  opacity: 0.5;
}

.container_coupons_content_header_class {
  display: flex;
  /*flex: 1;*/
  /*padding: 30rpx;*/
  flex-direction: row;
  /*width: 690rpx;*/
  background-color: white;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
}

.container_coupons_content_content_class {
  padding: 30rpx;
  background-color: white;
}

.container_coupons_content_content_text1_class {

  text-align: center;
  /*line-height: 200%;*/
}

.container_coupons_content_content_charge_class {

  line-height: 300%;
  /*align-items: center;*/
  /*justify-content: center;*/
  text-align: center;
}

.container_coupons_content_header_say_class {
  padding: 30rpx;
  /*margin: 30rpx;*/
  margin-top: 30rpx;
}

.container_coupons_content_header_say_button_class {
  background-color: #fee99a;
  border-radius: 60rpx;
  background-image: -webkit-gradient(linear, left 0, right 0, from(rgb(255, 255, 255)), to(#fee99a));


}

.container_coupons_content_header_say_button_iconfont_class {
  font-family: iconfont;
}

.container_coupons_content_content_submit_class {
  color: white;
}

.container_coupons_content_scroller_class {
  background-color: #f5f5f9;
  height: 600rpx;
}

.container_coupons_content_scroller_item_pay_class {
  height: 120rpx;
  display: flex;
}

.container_coupons_content_scroller_item_pay_confirm_class {
  flex-direction: column;
  flex: 1;
  display: flex;
  background-color: #555555;
  justify-content: center;
  align-items: center;
  color: white;
}

.container_coupons_content_scroller_item_pay_confirm_1_class {
  flex-direction: row;
  display: flex;
}

.container_coupons_content_scroller_item_pay_confirm_1_text1_class {
  /*color: orange;*/
  font-weight: bold;
  margin-right: 30rpx;
}

.container_coupons_content_scroller_item_pay_confirm_1_text2_class {
  border: 1px solid orange;
  border-radius: 10rpx;
  padding-left: 10rpx;
  padding-right: 10rpx;
}

.container_coupons_content_scroller_item_pay_confirm_2_text1_class {
  font-size: 30rpx;
  color: #a7b8a6;
}

.container_coupons_content_scroller_item_pay_button_class {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  width: 240rpx;
  height: 120rpx;
  background-color: #53a553;
}

.container_coupons_content_scroller_item_pay_button_diasbled_class {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  width: 240rpx;
  height: 120rpx;
  /*background-color: #87d850;*/
  background-color: #53a553;
  opacity: 0.8;
  color: gray;
}

.container_coupons_content_scroller_item_pay_button_diasbled_text_class {
  color: silver;
}

.container_coupons_content_header_gg_class {
  /*background-color: orange;*/
  display: flex;
  flex: 1;
}

.container_coupons_content_header_close_class {
  display: flex;
  /*background-color: red;*/
  width: 100rpx;
  height: 100rpx;
  justify-content: center;
  align-items: center;
  /*flex: 1;*/
}

.container_coupons_content_header_gg_class {
  padding-left: 25rpx;
  padding-top: 25rpx;
}

.container_coupons_content_scroller_item_class {
  height: 150rpx;
  margin: 25rpx;
  background-color: white;
  display: flex;
  flex-direction: row;
  /*padding: 30rpx;*/
  /*margin: 30rpx;*/
  /*width: 690rpx;*/
}

.container_coupons_content_scroller_item_image1_class {
  width: 150rpx;
  height: 150rpx;
  /*background-color: blue;*/
}

.container_coupons_content_scroller_item_image1_image_class {
  width: 150rpx;
  height: 150rpx;
  /*background-color: blue;*/
}

.container_coupons_content_scroller_item_desc_class {
  flex: 1;
  padding-left: 25rpx;
  /*background-color: red;*/
}

.container_coupons_content_scroller_item_desc_title_text_class {
  font-size: 28rpx;
}

.container_coupons_content_scroller_item_desc_reserveprice_class {
  /*font-size: 30rpx;*/
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /*background-color: blue;*/
  height: 48rpx;
  padding: 0;
}

.container_list_item_desc_text2_tag_class {
  display: flex;
  margin: 0;
  margin-right: 10rpx;
  padding: 0;
  /*background-color: red;*/
}

.container_coupons_content_scroller_item_desc_dealprice_class {
  font-size: 30rpx;
  color: orange;
}

.container_coupons_content_scroller_item_stepper_class {
  width: 250rpx;
  height: 150rpx;
  display: flex;
  flex-direction: row;
  /*background-color: green;*/
  align-items: center;
  justify-content: center;
}

.container_fixed_class {
  /*z-index: 4918605;*/
  /*width: 750rpx;*/
  /*height: 190rpx;*/
  /*background-color: red;*/
  /*position: fixed;*/
  /*left: 0rpx;*/
  /*top: 0rpx;*/
}

.container_navbar_class {
  background-color: white;
}

.container_list_class {
  /*height: 100rpx;*/
  /*background-color: red;*/
  /*margin-top: 190rpx;*/
  padding-top: 15rpx;
  padding-bottom: 15rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.container_list_item_wrapper_class {
  /*display: flex;*/
  /*flex: 1;*/
  /*margin-top: 15rpx;*/
  /*margin-bottom: 15rpx;*/
  /*background-color: blue;*/
  /*padding: 30rpx;*/
  /*border-radius: 30rpx;*/
  /*margin-left: 30rpx;*/
  /*margin-top: 30rpx;*/
  /*margin-right: 30rpx;*/
}



.container_header_class {
  display: flex;
  flex-direction: row;
  background-color: #53a553;
  justify-content: center;
  align-items: center;
}

.container_header_location_class {
  /*background-color: pink;*/
  width: 150rpx;
  /*height: 20rpx;*/
  justify-content: center;
  align-items: center;
}

.container_searchbar_header_class {
  flex: 1;
  background-color: white;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
