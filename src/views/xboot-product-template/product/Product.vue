<style lang="less">
.product-wrap {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10px 20px 10px 20px;
  }
  .item-shop {
    margin: 10px 7px 10px 7px;
  }
}
.product-wrap-dark {
  display: flex;
  flex-wrap: wrap;
  background: #f5f5f5;
  .item {
    margin: 10px 20px 10px 20px;
  }
  .item-shop {
    margin: 10px 7px 10px 7px;
  }
}
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
          <div class="product-wrap">
            <ProductMooc :data="p1" class="item" />
            <ProductMooc :data="p2" class="item" />
            <ProductMooc :data="p3" class="item" />
            <ProductMooc :data="p4" class="item" />
            <ProductMooc :data="p5" type="bounce" class="item" />
            <ProductMooc :data="p6" type="bounce" class="item" />
            <ProductMooc :data="p7" type="bounce" size="large" class="item" />
            <ProductMooc :data="p8" type="bounce" size="large" class="item" />
          </div>
        </TabPane>
        <TabPane label="电商类" name="2">
          <Alert type="warning" show-icon
            >说明：该组件已开源 图片来源 mi.com 仅作展示使用
            请自行修改图片数据和样式避免侵权！</Alert
          >
          <div class="product-wrap">
            <ProductShop
              v-for="(item, i) in p9"
              :key="i"
              :data="item"
              type="saleoff"
              :topColor="i % 9"
              class="item-shop"
            />
          </div>
          <div class="product-wrap-dark">
            <ProductShop
              v-for="(item, i) in p10"
              :key="i"
              :data="item"
              class="item-shop"
            />
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import ProductMooc from "./mooc/ProductMooc.vue";
import ProductShop from "./shop/ProductShop.vue";
export default {
  name: "product",
  components: {
    ProductMooc,
    ProductShop,
  },
  data() {
    return {
      p1: {
        title: "Java读源码之Netty深入剖析",
        description: "更快上手实际开发",
        price: 299,
        sales: 30,
        picUrl: "//img1.mukewang.com/szimg/5b165c2b0001e24a05400300.jpg",
      },
      p2: {
        title: "全网最热Python3入门+",
        description: "更快上手实际开发",
        price: 366,
        sales: 130,
        picUrl: "//img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg",
        label: "快看这里",
      },
      p3: {
        title: "Java+Selenium3.0深度解析自动化测试框架设计与开发",
        description: "实战 高级",
        price: 248,
        sales: 20,
        picUrl: "//img3.mukewang.com/szimg/5b2cd8590001c61505400300.jpg",
        label: "快看右上角",
        tag: "New",
      },
      p4: {
        title: "Java+Selenium3.0深度解析自动化测试框架设计与开发",
        description: "实战 高级",
        price: 248,
        sales: 20,
        picUrl: "//img3.mukewang.com/szimg/5b2cd8590001c61505400300.jpg",
        label: "快看右上角",
        tag: "Hot",
      },
      p5: {
        title: "Spring Cloud微服务实战+",
        description: "实战 高级",
        price: 366,
        sales: 36,
        picUrl: "//img3.mukewang.com/szimg/5a9ca4e80001786305400300.jpg",
      },
      p6: {
        title: "玩转数据结构 从入门到进阶",
        description: "从入门到进阶",
        price: 299,
        sales: 221,
        picUrl: "//img1.mukewang.com/szimg/5ad05dc00001eae705400300.jpg",
      },
      p7: {
        title: "Vue.js 源码全方位深入解析",
        description:
          "全方位讲解 Vue.js 源码，学精学透 Vue 原理实现，进阶高级工程师",
        price: 488,
        sales: 118,
        rate: 9.8,
        picUrl: "//img1.mukewang.com/szimg/5b17bad10001535305400300.jpg",
      },
      p8: {
        title: "Kubernetes实战 高可用集群搭建,配置,运维与应用",
        description: "以生产为目标，原理+操作， Kubernetes结合典型云原生应用",
        price: 199,
        sales: 62,
        rate: 9.8,
        picUrl: "//img.mukewang.com/szimg/5bab70af00014fe105400300-360-202.jpg",
      },
      p9: [
        {
          title: "小米小钢炮蓝牙音箱 2 白色",
          description: "极简设计，专业喇叭",
          price: 9.9,
          originPrice: 129,
          picUrl: "https://i8.mifile.cn/v1/a1/T1o7bgB5Kv1RXrhCrK.jpg",
          flag: "9.9元秒杀",
          flagType: "saleoff",
        },
        {
          title: "小米双单元半入耳式耳机 白色",
          description: "半入耳式舒适佩戴",
          price: 1,
          originPrice: 69,
          picUrl: "https://i8.mifile.cn/a1/pms_1521442671.5222520.jpg",
          flag: "1元秒杀",
          flagType: "saleoff",
        },
        {
          title: "小米USB Type C快速充电数据线 灰色",
          description: "快速充电，稳定传输",
          price: 1,
          originPrice: 16.9,
          picUrl:
            "https://i8.mifile.cn/v1/a1/2dc35d0f-0951-ff2b-e55d-8d258cedc493.jpg",
          flag: "1元秒杀",
          flagType: "saleoff",
        },

        {
          title: "小米WiFi放大器Pro 黑色",
          description: " 轻松扩展WiFi信号",
          price: 11.1,
          originPrice: 79,
          picUrl:
            "https://i8.mifile.cn/v1/a1/9085cddd-530a-0bf0-8b09-74e96fa97cc9.jpg",
          flag: "11.1秒杀",
          flagType: "saleoff",
        },
        {
          title: "小米万能遥控器 黑色",
          description: "让手机变身遥控器",
          price: 75,
          originPrice: 79,
          picUrl: "https://i8.mifile.cn/v1/a1/T1V1VvBKZv1RXrhCrK.jpg",
        },
      ],
      p10: [
        {
          title: "小米8 青春版 4GB+64GB",
          description: "潮流镜面渐变色，2400万自拍旗舰",
          price: 1399,
          picUrl: "//i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg",
          flag: "新品",
        },
        {
          title: "小米8 屏幕指纹版 8GB+128GB",
          description: "全球首款压感屏幕指纹，双频GPS超精准定位",
          price: 3599,
          picUrl: "//i1.mifile.cn/a1/pms_1537356460.6227958!220x220.png",
          flag: "新品",
        },
        {
          title: "小米8 SE 4GB+64GB",
          description: "AI 超感光双摄，三星 AMOLED 屏幕",
          price: 1649,
          originPrice: 1799,
          picUrl: "//i1.mifile.cn/a1/pms_1527684990.93616987!220x220.jpg",
          flag: "减 150 元",
          flagType: "saleoff",
        },
        {
          title: "小米电视4A 43英寸青春版",
          description: "全高清屏 / 人工智能语音",
          price: 1499,
          originPrice: 1699,
          picUrl: "//i1.mifile.cn/a1/pms_1524883847.49276938!220x220.jpg",
          flag: "减 200 元",
          flagType: "saleoff",
          review: "服务周到热情，效率高，值得点赞！",
          reviewer: "Exrick",
        },
        {
          title: "15.6寸笔记本 i5 4G MX110",
          description: "",
          price: 4199,
          picUrl: "//i1.mifile.cn/a4/xmad_15350951136177_QUuVm.png",
          flag: "摸我看评价",
          review: "和小米同在，为你而发烧",
          reviewer: "Exrick",
        },
      ],
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