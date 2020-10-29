<style lang="less">
.uniapp {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
}
.uniapp-imgs {
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
        说明：基于Uniapp开发的配套XBoot App，后端正在XBoot中开发
        <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">立即获取完整版</a>
      </Alert>
      <div class="uniapp">H5演示版本请等待上线！前端请等待开源！敬请关注！</div>
      <div class="uniapp-imgs">
        <img src="https://ooo.0o0.ooo/2020/04/27/rYgLKIQGoB1f2JF.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/WlLwqRNcsEQuT5Y.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/GeaVHTmcYdQNis7.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/LKcgJBdmlpG9iOj.jpg" />
      </div>
      <div class="uniapp-imgs" style="margin: 20px 0">
        <img src="https://ooo.0o0.ooo/2020/04/27/7AkmNaqTyIo1Q2v.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/1DA4JnBlxgNFY5v.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/BXga1m3LQDSTdGE.jpg" />
        <img src="https://ooo.0o0.ooo/2020/04/27/5KRuGiDwpSQbo4h.jpg" />
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "flutter",
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