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
              t.toast(`支付${foo.title}`)
            }
          })
        }
        if (foo.status == 'Zhuliing') {
          let order__id = foo._id
          await t.setItem('order__id',order__id)
          buttons.push({
            title: '查看助力情况',
            type: `primary`,
            click: () => {
              t.open({
                url: `/pages/free/main?order__id=${order__id}`
              })
              // t.toast(`查看助力情况${foo.title}`)
            }
          })
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
