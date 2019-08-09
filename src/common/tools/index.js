const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';
const Tools = {
  sleep: async (args) => {
    return new Promise(async (resolve) => {
      setTimeout(function() {
        resolve({
          success: true,
        })
      }, args) 
    })
  },
  fetch: async (args) => {
    return new Promise(async (resolve) => {
      // that.setState(state, resolve)
      let { method, payload, url, header } = args
      if (!method) {
        method = 'GET'
      }
      // let body = queryString.stringify(payload)
      // let data = queryString.stringify(payload)
      // console.log(payload);
      wx.request({
        url,
        method,
        data: payload,
        header: {
          // 'content-type': 'application/json' ,
          'Content-Type': 'application/x-www-form-urlencoded',
          ...header,
        },
        success(res) {
          // console.log(res.data)
          resolve({
            data: res.data,
          })
        },
        fail(res) {
          // console.log(res.data)
          console.log(`###$fail####`);

          resolve({
            data: false,
          })
        },
        complete(res) {
          // console.log(`###$complete####`);
        }
      })


    });
  },
  v2dispatch: async (args) => {
    let { type, payload, header } = args
    let { nsp } = payload
    let url
    // let access_token = await Tools.getItem(`pro__${ACCESS_TOKEN}`)
    // console.log(`###$v2dispatch####`);
    const regexopen = /(.*)open/gm;
    const regexauth = /(.*)auth/gm;
    switch (true) {
      case regexopen.exec(type):
        //statement1;
        break;
      case regexauth.exec(type):
        //statement2;
        header = {
          ...header,
          // 'Content-Type': 'application/x-www-form-urlencoded'
          'Authorization': `Bearer ${access_token.value}`
        }
        break;
      default:
        // to do
    }
    url = `https://eggd.heyulin.com/${type}.jobs`

    let method = 'POST'
    url = `${url}?nsp=${nsp}`
    header = {
      'content-type': 'application/json',
      ...header,
    }
    let res = await Tools.fetch({
      header,
      url,
      method,
      payload,
    })
    // console.log(res);
    return res.data
  },
  setItem: async (key, data) => {
    //value 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象。
    return new Promise(async (resolve) => {
      wx.setStorage({
        key,
        data,
        success: () => {
          resolve(true)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  },
  getItem: async (key) => {

    return new Promise(async (resolve) => {
      wx.getStorage({
        key,
        success: (res) => {
          resolve(res.data)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  },
  open: (args = {}) => {
    // let { url } = args
    if (typeof(args) == 'string') {
      args = {
        url: args,
      }
    }
    wx.navigateTo(args)
  },
  back: (args = {}) => {
    // let { url } = args
    // if (typeof(args) == 'string') {
    //     args = {
    //         url: args,
    //     }
    // }
    args || (args = {
      delta: 1,
    })
    wx.navigateBack(args)
  },
  alert: async (arg1, args) => {
    args || (args = {})
    let { duration, icon } = args
    icon || (icon = 'none')
    duration || (duration = 2000)
    let message = 'unknow'
    if (typeof(arg1) === 'string' || typeof(arg1) === 'number' || typeof(arg1) === 'boolean') {
      message = arg1
    } else if (typeof(arg1) === 'object') {
      message = JSON.stringify(arg1)
    } else {
      message = typeof(arg1)
    }
    wx.showModal({
      title: '提示',
      content: message,
      // icon,
      // duration,
      // icon: `success`
    })
  },
  toast: async (arg1, args) => {
    args || (args = {})
    let { duration, icon } = args
    icon || (icon = 'none')
    duration || (duration = 2000)
    let message = 'unknow'
    if (typeof(arg1) === 'string' || typeof(arg1) === 'number' || typeof(arg1) === 'boolean') {
      message = arg1
    } else if (typeof(arg1) === 'object') {
      message = JSON.stringify(arg1)
    } else {
      message = typeof(arg1)
    }
    wx.showToast({
      title: message,
      icon,
      duration,
    })
  },
  wait: async (arg1, args) => {
    args || (args = {})
    let { duration, icon } = args
    icon || (icon = 'none')
    arg1 || (arg1 = '加载中')
    duration || (duration = 2000)
    let message = 'unknow'
    if (typeof(arg1) === 'string' || typeof(arg1) === 'number' || typeof(arg1) === 'boolean') {
      message = arg1
    } else if (typeof(arg1) === 'object') {
      message = JSON.stringify(arg1)
    } else {
      message = typeof(arg1)
    }
    wx.showLoading({
      title: arg1,
    })
  },
  ok: async (arg1, args) => {
    args || (args = {})
    let { duration, icon } = args
    icon || (icon = 'none')
    arg1 || (arg1 = '加载中')
    duration || (duration = 2000)
    let message = 'unknow'
    if (typeof(arg1) === 'string' || typeof(arg1) === 'number' || typeof(arg1) === 'boolean') {
      message = arg1
    } else if (typeof(arg1) === 'object') {
      message = JSON.stringify(arg1)
    } else {
      message = typeof(arg1)
    }
    wx.hideLoading()
  },
}
export default Tools;
