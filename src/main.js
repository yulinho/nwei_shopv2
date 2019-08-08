import Vue from 'vue'
import App from './App'
import t from 't'
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
// import 'mpvue-weui/src/style/weui.css';
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
