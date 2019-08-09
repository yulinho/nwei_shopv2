<script>
import t from 't';
export default {
  async onLaunch(args) {
    let { query, } = args
    // console.log(`###$query####`,query);
    let { order__id } = query
    wx.getSystemInfo({
      success: async function(res) {
        let rate = res.windowWidth / 750
        await t.setItem('rate', rate)
        var name = 'iPhone X'
        if (res.model.indexOf(name) > -1) {
          await t.setItem('isIpx', true)
        } else {
          await t.setItem('isIpx', false)
        }
        let isFirst = await t.getItem('isFirst')
        if (!isFirst) {
          // 是第一次使用，展示说明并设置storage
          // this.showDialog = true
          await t.setItem('isFirst', false)
        }
        let isNeedWxLogin = false
        let user = await t.getItem('user')
        if (!user) {
          isNeedWxLogin = true
        } else {
          wx.checkSession({
            success() {
              //session_key 未过期，并且在本生命周期一直有效
              console.log(`###$session_key 未过期，并且在本生命周期一直有效####`);
            },
            fail() {
              // session_key 已经失效，需要重新执行登录流程
              // wx.login() //重新登录
              isNeedWxLogin = true
            }
          })
        }
        console.log(`###$isNeedWxLogin####`, isNeedWxLogin);
        if (isNeedWxLogin) {
          wx.login({
            async success(res) {
              if (res.code) {
                console.log(res);
                let code = res.code
                //发起网络请求
                let res_products = await t.v2dispatch({
                  type: `v2chuqidanopen`,
                  payload: {
                    // chuqidanitem__id: `chuqidanitem__id`,
                    // chuqidanuser__id: user__id,
                    order__id,
                    code,
                    nsp: `wxloginsuccess`
                  },
                })
                let { user } = res_products
                await t.setItem(`user`, user)
                await t.setItem(`wxOpenid`, user.wxOpenid)
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
        // let userUnid = await t.getItem('userUnid')
        // if (!userUnid) {
        //   await t.setItem('userUnid', `${new Date().valueOf()}${Math.random()}`)
        // }
        // let user = await t.getItem(`user`)
        // let mdl = {}
        // if (user) {
        //   mdl = {
        //     _id,
        //     userUnid,
        //   }
        // } else {
        //   mdl = {
        //     userUnid,
        //   }
        // }
        // let res_user = await t.v2dispatch({
        //   type: `v2chuqidanopen`,
        //   payload: {
        //     mdl: {
        //       ...mdl,
        //     },
        //     nsp: `syncuser`
        //   },
        // })
        // // console.log(res_user);
        // user = res_user.data
        // await t.setItem(`user`, user)
      }
    })
  },
  async created(query) {},
  methods: {},
}

</script>
<style lang="less">
page {
  background-color: #ececec;
}

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

@font-face {
  font-family: 'iconfont';
  /* project id 1316788 */
  src: url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.eot');
  src: url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.woff') format('woff'),
    url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1332581_plu7dgbkt2.svg#iconfont') format('svg');
}

.iconfont {
  font-family: iconfont;
  // color: black;
}

.iconfont-order::before {
  content: '\e6ef';
}

.iconfont {
  font-family: iconfont;
}

.is-money {
  color: #ff7300;
}

.is-size-7 {
  font-size: 20rpx;
}

.is-size-6 {
  font-size: 22rpx;
}

.is-size-5 {
  font-size: 24rpx;
}

.is-size-4 {
  font-size: 26rpx;
}

.is-size-3 {
  font-size: 28rpx;
}

.is-size-2 {
  font-size: 30rpx;
}

.is-size-1 {
  font-size: 32rpx;
}

.is-center {
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
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

.is-plain-button {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0rpx;
  background-color: transparent;
  // line-height: 35rpx;

}

.is-plain-button::after {
  border: 0;
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

.is-no-record {
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  color: gray;
  font-size: 28rpx;
}

.is-main_touchbar_ls {
  height: 60rpx;
  width: 750rpx;
}

.is-main_ctrlbar_ls {
  width: 750rpx;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
}

.is-main_ctrlbar_content_ls {
  width: 750rpx;
  height: 120rpx;
  background-color: white;
  flex-direction: row;
  display: flex;
}

.is-main_ctrlbar_content_icon_ls {
  width: 120rpx;
  height: 120rpx;
  background-color: white;
  flex-direction: column;
  line-height: 35rpx;
}

.is-main_ctrlbar_content_button2_ls {
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

</style>
