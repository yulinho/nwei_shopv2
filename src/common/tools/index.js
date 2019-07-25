const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';
const Tools = {
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