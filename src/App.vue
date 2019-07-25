<script>
// import Tools from './AngryShell/src/tools';
// import Tools from 'tools$';
import t from 't';
export default {
  async onLaunch(args) {
    // console.log(`###$onLaunch####`);
    // console.log(args);
    let { query, } = args
    // let scene = decodeURIComponent(query.scene)
    // let csztrade_id = scene.split('=')[1]
    // console.log(csztrade_id);
    // await t.setItem('csztrade_id',csztrade_id)
    // let user = await t.login_sync({
    //   type: 'hmbb/open'
    // })
    // await t.setItem('user',user)
  },
  async created(query) {
    // let user = await this.syncLogin()
    // t.toast('ot')
    // console.log(`###$wx.login####`);
    // let wxacode = await Tools.getWxacodeunlimit({user_id,})
    // console.log(`###$1####`);
    // Tools.toast('fine')
    // console.log(typeOf(tools$));
    // console.log(tools$);
    // console.log(res);
    // wx.authorize({ scope: "scope.userInfo" })

    // wx.getUserInfo({
    //   success(res) {
    //     console.log(res);
    //   }
    // })
    // wx.getSetting({
    //   success(res) {
    //     console.log(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    // console.log(Tools);
    // Tools.toast('test')
    // // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
  },

  methods: {
    // async syncLogin() {
    //   let user = await t.login_sync({
    //     type: 'csz/open'
    //   })
    //   let { data_quanmao, wx_userInfo, } = user
    //   // console.log(data_quanmao);
    //   // data_quanmao = JSON.parse(data_quanmao)
    //   let userInfo = JSON.parse(wx_userInfo)
    //   // await t.setItem('data_quanmao', data_quanmao)
    //   await t.setItem('userInfo', userInfo)
    //   // let session_key = data_quanmao.session_key
    //   // let user_id = user.id
    //   return user
    // },
  },
}

</script>
<style lang="less" src='AngryShell/less/global.less'></style>
<style lang="less">
// @import 'AngryShell/less/global'

page{
  background-color: #ececec;
}


@font-face {
  font-family: 'iconfont';  /* project id 1067139 */
  src: url('//at.alicdn.com/t/font_1067139_p386bp52qgj.eot');
  src: url('//at.alicdn.com/t/font_1067139_p386bp52qgj.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1067139_p386bp52qgj.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1067139_p386bp52qgj.woff') format('woff'),
  url('//at.alicdn.com/t/font_1067139_p386bp52qgj.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1067139_p386bp52qgj.svg#iconfont') format('svg');
}

.iconfont {
  font-family: iconfont;
  // color: black;
}
.iconfont-download::before {
  content: '\e600';
}
.iconfont-new::before {
  content: '\e605';
}
.iconfont-www::before {
  content: '\e61c';
}
.iconfont-help::before {
  content: '\e61e';
}
.iconfont-qrcode::before {
  content: '\e6bd';
}
.iconfont-statist::before {
  content: '\e645';
}
.iconfont-statist::before {
  content: '\e645';
}
.weui-loading-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.weui-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.weui-loading-detail {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 122px;
  height: 122px;
  background: rgba(17, 17, 17, 0.7);
  color: #fff;
  border-radius: 5px;
  text-align: center;
  z-index: 1001;
  transform: translate(-50%, -50%);
}

.weui-loading-detail .weui-loading {
  height: 38px;
  width: 38px;
  margin: 50rpx 0 0;
}

.weui-loading-text {
  margin: 10px 0 0 0;
  font-size: 16px;
}

.weui-search-bar {
  background-color: #53a553 !important;
  margin: 0 !important;
  /*padding: 0 !important;*/
}

.weui-search-bar {
  border-top: 0 !important;
  border-bottom: 0 !important;

}

.weui-search-bar__cancel-btn {
  color: white !important;
}

/*.weui-search-bar__label{
  display: none !important;
}*/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

</style>
