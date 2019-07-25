<template>
  <div class="container_class">
    <div class="container_header_class">
      <div class="container_header_1_class" v-if="userInfo.nickName">
        <div class="container_header_1_username_class">
          {{userInfo.nickName}}
        </div>
        <div class="container_header_1_vip_class">
          <asVip :is_vip="true" />
        </div>
        <div class="container_header_1_pic_class">
          <image class="container_header_1_pic_image_class" :src="userInfo.avatarUrl" /><text></text>
        </div>
      </div>
      <div class="container_header_2_class" v-if="false">
        <asDeadline :is_vip="true" :onClickCb="onClickDeanline" />
      </div>
      <div class="container_header_refreshuserinfo_class" v-if="!userInfo.nickName">
        <button open-type="getUserInfo" size="mini" lang="zh_CN" @getuserinfo="onRefreshUserinfo">
          获取我的信息
        </button>
      </div>
      <div class="container_header_refreshuserinfo_class" v-if="userInfo.nickName">
        <button open-type="getUserInfo" size="mini" lang="zh_CN" @getuserinfo="onRefreshUserinfo">
          更新我的信息
        </button>
      </div>
      <div class="container_header_money_class" v-if="false">
        <div class="container_header_money_1_class">
          <text class="container_header_money_1_text1_class">累计收益</text>
          <text class="container_header_money_1_text2_class">0.00</text>
        </div>
        <div class="container_header_money_2_class">
          <div class="container_header_money_2s_class">
            <text class="container_header_money_1_text1_class">一级粉丝人数</text>
            <text class="container_header_money_1_text1_class">{{data_quanmao.suckers1_cnt}}</text>
          </div>
          <div class="container_header_money_2s_vline_class">
          </div>
          <div class="container_header_money_2s_class">
            <text class="container_header_money_1_text1_class">二级粉丝人数</text>
            <text class="container_header_money_1_text1_class">{{data_quanmao.suckers2_cnt}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="container_list_class">
      <!-- test1 -->
      <mpList :items="items1" title=" " />
      <mpList :items="items2" title=" " />
      <!-- <mpList :items="items3" title=" " /> -->
    </div>
    <div class="container_contact_class">
      <button open-type="contact" size="mini">联系我们</button>
    </div>
    <div class="container_contact_class">
      <!-- <mp-button type="default" size="large" btnClass="mb15" openType="getUserInfo" @getuserinfo="onRefreshUserinfo">获取我的信息</mp-button> -->
    </div>
  </div>
</template>
<script>
// Use Vuex
import store from './store'
// import mpList from 'mpvue-weui/src/list';
import mpButton from 'mpvue-weui/src/button';
// import Tools from '../../AngryShell/src/tools';
// import mpList from '../../AngryShell/src/list';
// import asVip from '../../AngryShell/src/asVip';
// import asDeadline from '../../AngryShell/src/asDeadline';


export default {

  components: {
    // mpList,
    // mpButton,
    // asVip,
    // asDeadline,


  },
  data() {
    return {
      userInfo: {},
      user: {},
      data_quanmao: {},
      items3: [{
        title: '常见问题',
        subtitle: '',
        onClickCb: () => {
          console.log(`###$onClickCb####`);
          var url = "../../pages/trades/main"
          wx.navigateTo({ url })
          console.log(wx);
        }
      }, {
        title: '联系客服',
        subtitle: '',
        onClickCb: () => {
          console.log(`###$onClickCb####`);
          var url = "../../pages/trades/main"
          wx.navigateTo({ url })
          console.log(wx);
        }
      }, ],
      items2: [{
        title: '我的纪录',
        subtitle: '',
        onClickCb: () => {
          console.log(`###$onClickCb####`);
          var url = "../../pages/trades/main"
          wx.navigateTo({ url })
          console.log(wx);
        }
      }, ],
      items1: [{
          title: '钱包',
          subtitle: '',
          onClickCb: () => {
            console.log(`###$onClickCb####`);
            var url = "../../pages/trades/main"
            wx.navigateTo({ url })
            console.log(wx);
          }
        },
        // {
        //   title: '礼包中心',
        //   subtitle: '',
        //   onClickCb: () => {
        //     console.log(`###$onClickCb####`);
        //     var url = "../../pages/logs/main"
        //     wx.navigateTo({ url })
        //     console.log(wx);
        //   }
        // }, 
        // {
        //   title: '联系我们',
        //   subtitle: '',
        //   onClickCb: () => {
        //     console.log(`###$onClickCb####`);
        //     var url = "../../pages/logs/main"
        //     wx.navigateTo({ url })
        //     console.log(wx);
        //   }
        // }, 
      ]
    }
  },
  async onShow() {
    await this.showUser()
    // console.log(`###$onShow####`);
  },
  async created() {
    // await this.showUser()
    // console.log(user);
  },
  computed: {
    count() {
      return store.state.count
    }
  },
  methods: {
    async onClickDeanline() {
      // console.log(`###$onClickDeanline####`);
      Tools.toast('续费中')
    },
    async showUser() {
      let user = await Tools.getItem('user')
      let data_quanmao = await Tools.getItem('data_quanmao')
      let userInfo = await Tools.getItem('userInfo')
      if (userInfo)
        this.userInfo = userInfo
      this.user = user
      this.data_quanmao = data_quanmao
      // console.log(user);
      // console.log(data_quanmao);
    },
    async onRefreshUserinfo(data) {
      let user = await Tools.getItem('user')
      console.log(`###$onRefreshUserinfo####`);
      let { mp, } = data
      let { detail, } = mp
      let { userInfo, } = detail
      console.log(userInfo);
      let nsp = 'quanmao_user_update'
      let wx_userInfo = JSON.stringify(userInfo)
      user.wx_userInfo = wx_userInfo
      await Tools.setItem('userInfo', userInfo)
      this.userInfo = userInfo
      let res = await Tools.dispatch({
        type: 'quanmao/open',
        payload: {
          // cart_list: JSON.stringify(cart_list),
          // stype,
          // item: item,
          // user_id,
          // stype: this.stype,
          // page_no,
          // q,
          // openid,
          // user_id,
          // userInfo: JSON.stringify(userInfo),
          post_user: JSON.stringify(user),
          nsp,
          t: Math.random(),
        },
      })
      // console.log(res);
      user = res[`${nsp}_response`].user
      let sub_msg = res.sub_msg
      Tools.toast(sub_msg)
      // console.log(user);
    },
    increment() {
      store.commit('increment')
    },
    decrement() {
      store.commit('decrement')
    }
  }
}

</script>
<style>
.container_class {
  /*text-align: center;*/
  /*margin-top: 100px;*/
  /*height: 100rpx;*/
  /*background-color: red;*/
}

.container_header_2_class {
  margin-bottom: 30rpx;
}



.container_list_class {
  /*background-color: blue;*/
}

.container_contact_class {
  display: flex;
  /*height: 100rpx;*/
  padding: 50rpx;
  justify-content: center;
  align-items: center;
}

.container_header_class {
  color: white;
  /*background-color: #313333;*/
  background-color: #ad3735;
  padding: 30rpx;
  /*margin-bottom: 150rpx;*/
  position: relative;
}

.container_header_money_class {
  position: absolute;
  bottom: -100rpx;
  background-color: #fdd88d;
  height: 200rpx;
  width: 690rpx;
  border-radius: 15rpx;
}

.container_header_money_1_class {
  display: flex;
  /*background-color: red;*/
  height: 100rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container_header_money_2_class {
  display: flex;
  flex-direction: row;
  width: 690rpx;
  /*background-color: blue;*/
}

.container_header_money_2s_vline_class {
  width: 2px;
  height: 30rpx;
  margin-top: 35rpx;
  background-color: #854c10;
  /*background-color: red;*/
}

.container_header_money_2s_class {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container_header_money_1_text1_class {
  color: #854c10;
  font-size: 25rpx;
  /*background-color: blue;*/
  /*font-weight: bold;*/
}

.container_header_money_1_text2_class {
  /*background-color: red;*/
  /*height: 50rpx;*/
  line-height: 50rpx;
  color: #854c10;
  font-size: 50rpx;
  font-weight: bold;
}

.container_header_1_class {
  flex-direction: row;
  display: flex;
  flex: 1;
  /*background-color: red;*/
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.container_header_refreshuserinfo_class {
  height: 160rpx;
  text-align: center;
  /*background-color: red;*/
  /*display: flex;*/
}

.container_header_1_vip_class {
  flex: 1;
  padding-left: 10rpx;
}

.container_header_1_pic_class {

  align-items: center;
  justify-content: center;
  /*background-color: blue;*/
  display: flex;
  flex-direction: row;
}

.container_header_1_pic_image_class {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
