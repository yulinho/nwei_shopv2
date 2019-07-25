<template>
  <div class="main_class">
    <div class="main_img_class">
    	<span class="main_img_icon_class iconfont" v-html="args.img"></span>
    </div>
    <div class="main_title_class">{{args.title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    args: {
      type: Object,
      value: {
        title: 'title1',
      }
    },
  },
  data() {
    return {
      text: "我是子组件",
    }
  },
}

</script>
<style scoped>
.main_class {
  display: flex;
  flex-direction: column;
  padding: 10px;
  /*background-color: blue;*/
  align-items: center;
  justify-content: center;
}
.main_img_class{

}
.main_img_icon_class{
	font-size: 50rpx;
}
</style>
