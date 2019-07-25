<template>
  <div class="main_class">
    <div class="main_search_class">
      <van-search v-model="q" placeholder="请输入搜索关键词" />
    </div>
    <div class="main_slider_class">
      
    </div>
    <div class="main_bulltin_class">
      
    </div>
    <div class="main_blocks_class">
      <div class="main_blocks_item_class" v-for="(index,item) in items" :key="index">
        
      </div>
    </div>
    <div class="main_products_class">
      <div class="main_products_item_class" v-for="(index,item) in items" :key="index">
        
      </div>
    </div>
  </div>
</template>
<script>
// import card from '@/components/card'
import t from 't'
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,

  },
  data() {
    return {
      items: [1,2,3,4,5,6,7,8,9,0],
      q: ``,
      userInfo: {}
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    t.toast('show2')
  },
  methods: {
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
.main_class {}
.main_search_class{
  /*align-items: center;*/
  /*justify-content: center;*/
  /*width: 750rpx;*/
  /*height: 90rpx;*/
  /*background-color: red;*/
}
.main_slider_class{
  width: 750rpx;
  height: 375rpx;
  background-color: red;
}
.main_bulltin_class{
  width: 750rpx;
  height: 60rpx;
  background-color: green;
}
.main_blocks_class{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: pink;
  margin-bottom: 5rpx;
  margin-top: 5rpx;
}
.main_products_class{
  background-color: orange;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main_products_item_class{
  width: 375rpx;
  height: 375rpx;
  background-color: silver;

}
.main_blocks_item_class{
  width: 150rpx;
  height: 150rpx;
  background-color: blue;
}
</style>
