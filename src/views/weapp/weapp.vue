<style lang="less">
.weapp {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
}
.weapp-imgs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    width: 260px;
    height: 563px;
    margin: 10px 0;
  }
}
</style>
<template>
  <div>
    <Card>
      <Alert type="warning" show-icon>
        说明：全新重构设计微信小程序，现已开源！后即正在XBoot中开发
        <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">立即获取完整版</a>
      </Alert>
      <div class="weapp">
        <Poptip trigger="hover" title="打开微信扫一扫">
          <div slot="content">
            <img src="https://i.loli.net/2019/10/06/yrtuPTL9DXQUvd2.jpg" width="180px" />
          </div>
          <Button
            type="primary"
            icon="md-qr-scanner"
            shape="circle"
            size="size"
            style="margin-right:20px;"
          >微信扫码体验</Button>
        </Poptip>
        <Button
          to="https://www.bilibili.com/video/av70226175"
          target="_blank"
          shape="circle"
          icon="ios-videocam"
          size="size"
          style="margin-right:20px;"
        >小程序宣传视频</Button>
        <Button
          to="https://github.com/Exrick/xmall-weapp"
          target="_blank"
          shape="circle"
          icon="logo-github"
          size="size"
        >Github地址</Button>
      </div>
      <div class="weapp-imgs">
        <img src="https://i.loli.net/2019/07/08/5d22e3df51b3b41948.png" />
        <img src="https://i.loli.net/2019/07/08/5d22e3def39a024428.png" />
        <img src="https://i.loli.net/2019/07/08/5d22e3df6ee8d14238.png" />
        <img src="https://i.loli.net/2019/07/08/5d22e3df80a8539956.png" />
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "weapp",
  data() {
    return {};
  },
  methods: {
    init() {}
  },
  mounted() {
    this.init();
  }
};
</script>