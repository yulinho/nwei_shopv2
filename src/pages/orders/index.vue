<template>
  <div class="main_cls">
    <div class="main_cls" v-if="orders.length>0">
      <xorder :args="item" v-for="(item,index) in orders" :key="index"></xorder>
    </div>
    <div class="is-no-record" v-if="orders.length==0">
      <span>暂无纪录</span>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
import xorder from 'common/xorder'
import t from 't'
let ctx
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,
    xorder,
  },
  data() {
    return {
      orders: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      q: ``,
      userInfo: {},
      showDialog: false,
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    ctx = this
    // t.toast('show2')
    await ctx.fetchOrders()
    // this.onShow()

    // const { userInfo } = await t.getUserInfo({
    //   withCredenitals: false
    // })
    // console.log(userInfo);
    // 进来的时候先获取用户信息
    // 然后用userId去判断是否已经处于拼单
    // 若是，则跳转到对应拼单billId的拼单详情页
    // 若否，则允许新建拼单
  },
  methods: {
    async onclickitem(item) {
      // t.toast('onclickitem')
      await t.setItem('product', item)
      t.open({
        url: '/pages/item/main'
      })
    },
    // async onShow() {},
    async onclickget() {
      t.toast('onclickget')
    },
    async paysubmit(args){
      // t.toast(`支付接口申请中，敬请期待`)
      let {data} = args
      let user = await t.getItem('user')
      t.wait('正在发起支付')
      let openid = user.wxOpenid
      let ispayok = await t.wxpay({
        method: 'WXPAY',
        title: '邮费',
        tid: data._id,
        // tid: `test_${new Date().valueOf()}`,
        amt: 12,
        openid,
      })
      t.ok()
      if (ispayok) {
        t.toast('支付成功，我们将尽快为您发货')
        // await this.onRefresh('event_refersh_trades', 'true')
        // const url = '../trades/main'
        // wx.navigateTo({ url })
      }else{
        t.toast('支付失败，请到我的订单查询')
      }
      // console.log(data);
    },
    async fetchOrders() {
      console.log(`###$fetchProductOrder####`);
      let user = await t.getItem('user')
      let user__id = user._id
      let res_products = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          // chuqidanitem__id: `chuqidanitem__id`,
          chuqidanuser__id: user__id,
          nsp: `orders_get`
        },
      })
      let { data } = res_products
      // console.log(data);
      ctx.orders = []
      for (let foo of data) {
        let buttons = []
        if (foo.status == 'Sent') {
          buttons.push({
            title: '查看物流',
            click: () => {
              // t.toast(`物流${foo.title}`)
            }
          })
        }
        if (foo.status == 'Waitpay') {
          buttons.push({
            title: '支付',
            type: `primary`,
            click: () => {
              // t.toast(`支付${foo.title}`)
              if (!user.wxAddress) {
                let user__id = user._id
                wx.chooseAddress({
                  async success(res) {
                    let res_setted = await t.v2dispatch({
                      type: `v2chuqidanopen`,
                      payload: {
                        // chuqidanitem__id: `chuqidanitem__id`,
                        // chuqidanuser__id: user__id,
                        user__id: user__id,
                        detail: res,
                        nsp: `chooseAddressOk`
                      },
                    })
                    if (res_setted.user) {
                      await t.setItem('user', res_setted.user)
                      // ctx.user = res_setted.user
                      ctx.paysubmit({
                        data: foo,
                      })
                    }
                    // console.log(res.userName)
                    // console.log(res.postalCode)
                    // console.log(res.provinceName)
                    // console.log(res.cityName)
                    // console.log(res.countyName)
                    // console.log(res.detailInfo)
                    // console.log(res.nationalCode)
                    // console.log(res.telNumber)
                  }
                })
              } else {
                ctx.paysubmit({
                  data: foo,
                })
              }
            }
          })
        }
        if (foo.status == 'Zhuliing') {
          let order__id = foo._id
          // await t.setItem('order__id',order__id)
          buttons.push({
            title: '查看助力情况',
            // type: `warn`,
            click: () => {
              t.open({
                url: `/pages/free/main?order__id=${order__id}`
              })
              // t.toast(`查看助力情况${foo.title}`)
            }
          })
          foo.topbutton = {
            title: `马山助力`,
            type: `warn`,
            click: () => {
              t.open({
                url: `/pages/free/main?order__id=${order__id}`
              })
              // t.toast('且力助')
            }
          }
        }
        ctx.orders.push({
          ...foo,
          buttons: buttons
        })
      }

      // ctx.products = data
    },
  },
  async onLoad(query) {},
  async created() {
    ctx = this
    // await this.onShow()

  }
}

</script>
<style scoped>
.is-money {
  color: #ff7300;
}

.main_cls {}

</style>
