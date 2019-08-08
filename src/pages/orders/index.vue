<template>
  <div class="main_cls">
    <div class="main_cls">
    </div>
    <div class="is-no-record">
      <span>暂无纪录</span>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
import t from 't'
let ctx
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,

  },
  data() {
    return {
      products: [],
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
    async fetchProductOrder() {
      console.log(`###$fetchProductOrder####`);
      let res_products = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          // chuqidanitem__id: `chuqidanitem__id`,
          // chuqidanuser__id: user__id,
          nsp: `chuqidanorders_get`
        },
      })
      let { data } = res_products
      console.log(data);
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
