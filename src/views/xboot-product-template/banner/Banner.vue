<style lang="less">
</style>
<template>
  <div>
    <Card>
      <Tabs value="1">
        <TabPane label="慕课类" name="1">
          <Alert type="warning" show-icon
            >说明：该组件已开源 图片来源 imooc.com 仅作展示使用
            请自行修改图片数据和样式避免侵权！</Alert
          >
          <span style="margin-right: 10px">开启背景随图片模糊切换：</span>
          <i-switch size="large" v-model="isOpen">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
          <BannerMooc :bk="isOpen" />
        </TabPane>
        <TabPane label="电商类" name="2">
          <Alert type="warning" show-icon
            >说明：该组件已开源 图片来源 mi.com 仅作展示使用
            请自行修改图片数据和样式避免侵权！</Alert
          >
          <BannerShop />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import BannerMooc from "./mooc/BannerMooc.vue";
import BannerShop from "./shop/BannerShop.vue";
export default {
  name: "banner",
  components: {
    BannerMooc,
    BannerShop,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    init() {},
  },
  mounted() {
    this.init();
  },
};
</script>