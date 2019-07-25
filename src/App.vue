<script>
import t from 't';
export default {
  async onLaunch(args) {
    let { query, } = args
  },
  async created(query) {
  },
  methods: {
  },
}
</script>
<style lang="less">
page{
  background-color: #ececec;
}
@font-face {
  font-family: 'iconfont';  /* project id 1316788 */
  src: url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.eot');
  src: url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.woff') format('woff'),
  url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1316788_nw86ses8hx9.svg#iconfont') format('svg');
}
.iconfont {
  font-family: iconfont;
  // color: black;
}
.iconfont-order::before {
  content: '\e6ef';
}

.iconfont {
  font-family: iconfont;
}
.weui-loading-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.weui-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.weui-loading-detail {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 122px;
  height: 122px;
  background: rgba(17, 17, 17, 0.7);
  color: #fff;
  border-radius: 5px;
  text-align: center;
  z-index: 1001;
  transform: translate(-50%, -50%);
}

.weui-loading-detail .weui-loading {
  height: 38px;
  width: 38px;
  margin: 50rpx 0 0;
}

.weui-loading-text {
  margin: 10px 0 0 0;
  font-size: 16px;
}

.weui-search-bar {
  background-color: #53a553 !important;
  margin: 0 !important;
  /*padding: 0 !important;*/
}

.weui-search-bar {
  border-top: 0 !important;
  border-bottom: 0 !important;

}

.weui-search-bar__cancel-btn {
  color: white !important;
}

/*.weui-search-bar__label{
  display: none !important;
}*/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

</style>
