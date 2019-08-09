<template>
  <div class="main_ls">
    <div class="main_search_ls" v-if="false">
      <van-search v-model="q" placeholder="请输入搜索关键词" />
    </div>
    <div class="main_slider_ls">
      <image class="main_slider_image_ls" src="http://qiniu.heyulin.cn/h5baisongde_topbanner2_tiny.png"></image>
    </div>
    <div class="main_bulltin_ls">
      <span @click="onclickbulltin">活动: 自己免费领，别人领您有奖励。查看说明。</span>
    </div>
    <div class="main_blocks_ls" v-if="false">
      <div class="main_blocks_item_ls" v-for="(item,index) in products" :key="index">
      </div>
    </div>
    <div class="main_items_ls">
      <div class="main_items_item_ls" v-for="(item,index) in products" :key="index">
        <div class="main_items_item_content_ls" @click="onclickitem(item)">
          <image class="main_items_item_content_image_ls" :src="item.pict_url"></image>
          <div class="main_items_item_content_des_ls">
            <div class="main_items_item_content_des_title_ls">{{item.title}}</div>
            <div class="main_items_item_content_des_price_ls"></div>
            <div class="main_items_item_content_des_footer_ls">
              <div class="main_items_item_content_des_footer_t1_ls is-money">¥{{item.reserve_price}}</div>
              <div class="main_items_item_content_des_footer_t2_ls">销量:3</div>
            </div>
          </div>
        </div>
      </div>
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
    await ctx.fetchProducts()
    // t.toast('show2')
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
    async onclickbulltin(){
      // t.alert('所有帮你助力过的朋友，他自己领取后，你都有0.5元的奖励, 上不封顶。')
      t.alert(`帮您助力过的朋友，他自己领取产品，您将获得0.5元的推广奖励，上不封顶！`)
    },
    async onclickitem(item) {
      // t.toast('onclickitem')
      await t.setItem('product',item)
      t.open({
        url: '/pages/item/main'
      })
    },
    // async onShow() {},
    async onclickget() {
      t.toast('onclickget')
    },
    async fetchProducts() {
      console.log(`###$fetchProducts####`);
      let res_products = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          // chuqidanitem__id: `chuqidanitem__id`,
          // chuqidanuser__id: user__id,
          nsp: `salesproducts_get`
        },
      })
      let { data } = res_products
      // console.log(data);
      ctx.products = data
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

.main_ls {}

.main_search_ls {
  /*align-items: center;*/
  /*justify-content: center;*/
  /*width: 750rpx;*/
  /*height: 90rpx;*/
  /*background-color: red;*/
}

.main_slider_ls {
  width: 750rpx;
  /*height: 375rpx;*/
  /*background-color: red;*/
}

.main_slider_image_ls {
  width: 750rpx;
  height: 180rpx;
  /*height: 375rpx;*/
}

.main_bulltin_ls {
  /*width: 750rpx;*/
  /*height: 60rpx;*/
  /*padding-left: 20rpx;*/
  padding: 8rpx 15rpx;
  color: #fc625d;
  /*background-color: green;*/
}

.main_blocks_ls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*background-color: pink;*/
  margin-bottom: 5rpx;
  margin-top: 5rpx;
}

.main_items_ls {
  /*background-color: orange;*/
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
}

.main_items_item_ls {
  width: 750rpx;
  height: 300rpx;
  /*margin-bottom: 5rpx;*/
  background-color: white;
}

.main_items_item_content_ls {
  width: 730rpx;
  height: 290rpx;
  margin-left: 10rpx;
  margin-top: 10rpx;
  /*background-color: red;*/
  flex-direction: row;
  display: flex;
}

.main_items_item_content_image_ls {
  width: 290rpx;
  height: 290rpx;
  margin-right: 10rpx;
  /*background-color: blue;*/
}

.main_items_item_content_des_ls {
  width: 430rpx;
  height: 290rpx;
  /*background-color: green;*/
  position: relative;
  border-bottom: 1rpx solid #f3f3f3;
}

.main_items_item_content_des_title_ls {
  flex: 1;
  /*background-color: blue;*/
}

.main_items_item_content_des_price_ls {}

.main_items_item_content_des_footer_ls {
  width: 430rpx;
  height: 80rpx;
  line-height: 80rpx;
  /*background-color: orange;*/
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
}

.main_items_item_content_des_footer_t1_ls {
  flex: 1;
  font-size: 34rpx;
  /*color: gray;*/
}

.main_items_item_content_des_footer_t2_ls {
  font-size: 24rpx;
  color: gray;
}

.main_blocks_item_ls {
  width: 150rpx;
  height: 150rpx;
  background-color: blue;
}

</style>
