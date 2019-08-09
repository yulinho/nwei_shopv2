<template>
  <div class="main_class">
    <div v-if="!user.phone" class="main_authplease_class">
      <!--       <img class="main_authplease_logo_class">

      </img> -->
      <open-data type="userAvatarUrl" class="main_authplease_logo_class"></open-data>
      <div class="main_authplease_nick_class">
        <open-data type="userNickName"></open-data>
      </div>
      <div class="main_authplease_tips_class">手机号码快速注册登录</div>
      <!-- <button type="primary" open-type="getPhoneNumber">点击授权登录</button> -->
      <button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键登录</button>
    </div>
    <div v-if="user.phone">
      <div class="main_info_class">
        <div class="main_info_item_class" v-if="false">
          <div>
            余额
          </div>
          <div>
            0.0
          </div>
          <div>
            <button @click="" size="mini">充值</button>
          </div>
        </div>
        <div class="main_info_item_class">
          <image class="main_info_item_headimg_class" :src="user.headimg" v-if="user.headimg"></image>
          <button class="main_info_item_nick_class is-plain-button" lang="zh_CN" open-type="getUserInfo" @getuserinfo="onRefreshUserinfo">{{user.nick}}</button>
          <!-- <div class="main_info_item_level_class">level</div> -->
          <div v-if="!user.headimg" class="main_authplease_tips_class">点击获取您的公开信息（昵称、头像、性别等）</div>
          <button v-if="!user.headimg" open-type="getUserInfo" size="mini" type="primary" lang="zh_CN" @getuserinfo="onRefreshUserinfo">显示头像昵称
          </button>
        </div>
        <div class="main_info_item_class" v-if="false">
          <div>
            积分
          </div>
          <div>
            0.0
          </div>
        </div>
      </div>
      <div class="main_myorder_class" v-if="false">
        <span class="iconfont">&#xe6ef;</span>查看我的订单
      </div>
      <div class="main_myorderstatus_class" v-if="false">
        <div class="main_myorderstatus_item_class">
          <imgitem :args="imgitemargs"></imgitem>
        </div>
        <div class="main_myorderstatus_item_class">
          <imgitem :args="imgitemargs"></imgitem>
        </div>
        <div class="main_myorderstatus_item_class">
          <imgitem :args="imgitemargs"></imgitem>
        </div>
        <div class="main_myorderstatus_item_class">
          <imgitem :args="imgitemargs"></imgitem>
        </div>
      </div>
      <div class="main_xlistitem_class">
        <xlistitem @click="onclickmyorders" :args="{title:'我的订单',icon:'&#xe617;'}"></xlistitem>
        <xlistitem @click="onclicktransactions" :args="{title:'我的奖励',icon:'&#xe617;'}"></xlistitem>
        <xlistitem @click="onclickmyadress" :args="{title:'收货地址管理',subtitle:user.wxAddress?'已设置':'未设置',icon:'&#xe60d;'}"></xlistitem>
        <xlistitem @click="onclickabout" :args="{title:'关于我们',subtitle:'v1.0.4',icon:'&#xe6a8;',noarrow:true,islast:true}"></xlistitem>
      </div>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
import t from 't'
import imgitem from 'common/imgitem'
import xlistitem from 'common/xlistitem'
let ctx
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,
    imgitem,
    xlistitem,
  },
  data() {
    return {
      user: {},
      isAuth: false,
      userInfo: {},
      imgitemargs: { title: `待付款`, img: `&#xe6ef;` },
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    // t.toast('show2')
    ctx.user = await t.getItem('user')
  },
  methods: {
    async onclickmyadress() {
      let user = await t.getItem('user')
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
            ctx.user = res_setted.user
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
    },
    async onclickabout() {
      // t.open({
      //   url: '/pages/orders/main'
      // })
    },
    async onclicktransactions(){
      t.open({
        url: '/pages/transactions/main'
      })
    },
    async onclickmyorders() {
      t.open({
        url: '/pages/orders/main'
      })
    },
    async postPhone(args) {
      let { detail } = args
      let user = await t.getItem('user')
      let user__id = user._id
      // console.log(detail);
      let res = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          // chuqidanitem__id: `chuqidanitem__id`,
          // chuqidanuser__id: user__id,
          user__id: user__id,
          detail,
          nsp: `getPhoneNumberOk`
        },
      })
      // let {newuser} = res
      if (res.user) {
        await t.setItem('user', res.user)
        ctx.user = res.user
      }
    },
    getPhoneNumber(e) {
      // console.log(e);
      // console.log('result' + e.detail.encryptedData)
      let detail = e.mp.detail
      this.postPhone({
        detail,
      })
      // let { user } = res_products
    },
    async onRefreshUserinfo(data) {
      console.log(data);
      let { mp, } = data
      let { detail, } = mp
      let { userInfo, } = detail
      console.log(userInfo);
      let user = await t.getItem('user')
      let user__id = user._id
      let res = await t.v2dispatch({
        type: `v2chuqidanopen`,
        payload: {
          // chuqidanitem__id: `chuqidanitem__id`,
          // chuqidanuser__id: user__id,
          user__id: user__id,
          userInfo,
          nsp: `getUserInfoOk`
        },
      })
      // let {data} = res
      await t.setItem('user', res.data)
      ctx.user = res.data

    },
    async onShow() {},
  },
  async onLoad(query) {},
  async created() {
    ctx = this
    await this.onShow()

  }
}

</script>
<style scoped>
.main_class {
  flex: 1;
  min-height: 100vh;
  /*background-color: pink;*/
}

.main_authplease_class {
  /*background-color: blue;*/
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 750rpx;
  flex-direction: column;
  background-color: white;
}

.main_authplease_nick_class {

  margin-bottom: 10rpx;
  /*color: gray;*/
  font-size: 28rpx;
}

.main_authplease_logo_class {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  background-color: orange;
  margin: 20rpx;
  overflow: hidden;
}

.main_authplease_tips_class {
  margin: 20rpx;
  color: gray;
  font-size: 24rpx;
}

.main_info_class {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 750rpx;
  padding-top: 40rpx;
  padding-bottom: 40rpx;
  margin-bottom: 10rpx;
  /*height: 375rpx;*/
  background-color: white;
}

.main_myorder_class {
  padding: 5rpx 10rpx;
  background-color: white;
}

.main_myorderstatus_class {
  display: flex;
  flex-direction: row;
  background-color: white;
  margin-top: 2rpx;
  margin-bottom: 4rpx;
}

.main_myorderstatus_item_class {
  width: 187rpx;
}

.main_info_item_class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*width: 250rpx;*/
  color: white;
  /*height: 250rpx;*/
  /*background-color: red;*/
}

.main_info_item_headimg_class {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 2px solid white;
  margin-bottom: 10rpx;
}

.main_info_item_nick_class {
  margin-bottom: 10rpx;
  color: #1b1b1b;
}

</style>
