<template>
  <div class="main_class">
    <div class="main_info_class">
      <div class="main_info_item_class">
        <div>
          育儿
        </div>
        <div>
          0.0
        </div>
        <div>
          <button @click="" size="mini">充值</button>
        </div>
      </div>
      <div class="main_info_item_class">
        <image class="main_info_item_headimg_class" src="http://img48.86pla.com/1/20180524/636627902164997450144.jpg"></image>
        <div class="main_info_item_nick_class">nick</div>
        <!-- <div class="main_info_item_level_class">level</div> -->
        <button open-type="getUserInfo" size="mini" lang="zh_CN" @getuserinfo="onRefreshUserinfo">Login
        </button>
      </div>
      <div class="main_info_item_class">
        <div>
          积分
        </div>
        <div>
          0.0
        </div>
      </div>
    </div>
    <div class="main_myorder_class">
      <span class="iconfont">&#xe6ef;</span>查看我的订单
    </div>
    <div class="main_myorderstatus_class">
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
    <div class="main_listitem_class">
      <listitem :args="listitemargs" />
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
import t from 't'
import imgitem from 'common/imgitem'
import listitem from 'common/listitem'
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,
    imgitem,
    listitem,
  },
  data() {
    return {
      userInfo: {},
      imgitemargs: { title: `待付款`, img: `&#xe6ef;` },
      listitemargs: {
        items: [{
          title: '收货地址管理',
          icon: 'heart',
          subtitle: '',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // t.copy(this.inviter)
            t.toast('已复制到剪贴板')
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }, {
          title: '会员资料管理',
          icon: 'about',
          // subtitle: 'v1.2.0',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }, {
          title: '关于我们',
          icon: 'about',
          subtitle: 'v1.2.0',
          onClickCb: () => {
            // console.log(`###$onClickCb####`);
            // var url = "../../pages/trades/main"
            // wx.navigateTo({ url })
            // console.log(wx);
          }
        }]
      },
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    t.toast('show2')
  },
  methods: {
    async onRefreshUserinfo(data) {
      let { mp, } = data
      let { detail, } = mp
      let { userInfo, } = detail
      console.log(userInfo);

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
  background-color: pink;
}

.main_info_class {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 750rpx;
  padding-top: 40rpx;
  padding-bottom: 40rpx;
  /*height: 375rpx;*/
  background-color: green;
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
  width: 250rpx;
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
  color: white;
}

</style>
