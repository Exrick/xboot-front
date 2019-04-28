<style lang="less">
.f-title {
  font-size: 20px;
  font-weight: 400;
  margin: 12px 0;
}
.f-p {
  margin: 5px;
  font-size: 14px;
}
</style>
<template>
  <div>
    <Col>
      <Card>
        <Alert type="warning" show-icon>说明：基于Flutter开发的配套XBoot App，敬请期待！（待定）</Alert>
        <Row type="flex" justify="start">
          <Col span="6">
            <img src="https://i.loli.net/2019/04/12/5cb04462c892e.png" width="300px">
          </Col>
          <Col span="16">
            <h2 class="f-title">什么是Flutter</h2>
            <p class="f-p">
              Flutter是Google开发的基于Dart的一套全新的跨平台、开源UI框架，支持iOS、Android系统开发，并且是未来新操作系统Fuchsia的默认开发套件。
              Flutter的目标是使同一套代码同时运行在Android和iOS系统上，并且拥有媲美原生应用的性能。
              目前，Abbey Road Studios、阿里巴巴、Capital One、Groupon、Hamilton、京东、Philips Hue、Reflectly 和腾讯等公司都已经使用 Flutter 进行开发。
            </p>
            <h2 class="f-title">Flutter的特点</h2>
            <p class="f-p">快速构建精美应用：Flutter 提供了大量 widgets ，集成并有最大程度的实现了 Material Design。</p>
            <p class="f-p">速度快：基于 Skia 2D 硬件加速图形引擎，该引擎也同样用在了 Chrome 和 Android 平台。</p>
            <p class="f-p">热更新：Flutter 引入了热重载，这个革命性的特性可以让移动开发者和设计师们实时迭代应用程序，这个特性可让开发效率提升 3 倍。</p>
            <p class="f-p">开源：Flutter 是一个基于 BSD-style 许可的开源项目，全球范围内数百位开发者在为它贡献代码。</p>
          </Col>
        </Row>
      </Card>
    </Col>
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