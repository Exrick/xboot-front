<style lang="less">
@import "./CategoryMooc.less";
</style>

<template>
  <div>
    <div class="products-banner-wrap">
      <div class="banner-content-wrap">
        <div class="content-nav">
          <a class="header-icon">
            <div class="bag-wrap">
              <Icon class="bag-icon" type="logo-youtube"></Icon>
            </div>
            <span>实战课程</span>
          </a>
          <div class="header-search">
            <Input
              search
              enter-button
              v-model="key"
              size="large"
              placeholder="搜索感兴趣的商品内容"
            ></Input>
            <ul class="header-search-result"></ul>

            <div class="search-hot">
              <span>热搜：</span>
              <a v-for="(item, i) in hotWords" :key="i" href="#">{{ item }}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 背景动画 -->
      <div class="darker"></div>
      <div class="products-banner">
        <div class="banner-absolute">
          <div class="banner-bk">
            <div
              class="svg-block image1"
              :style="{
                backgroundImage: 'url(' + require('./block.png') + ')',
              }"
            ></div>
            <div
              class="svg-diamond image2"
              :style="{
                backgroundImage: 'url(' + require('./circle.png') + ')',
              }"
            ></div>
            <div
              class="svg-leaf image3"
              :style="{
                backgroundImage: 'url(' + require('./leaf.png') + ')',
              }"
            ></div>
            <div
              class="svg-small-circle"
              :style="{
                backgroundImage: 'url(' + require('./circle.png') + ')',
              }"
            ></div>
            <div
              class="svg-big-circle"
              :style="{
                backgroundImage: 'url(' + require('./circle.png') + ')',
              }"
            ></div>
            <div
              class="svg-triangle image4"
              :style="{
                background: 'url(' + require('./triangle.png') + ')',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="products-content-wrap">
      <div class="products-header-nav">
        <div class="nav-wrap">
          <a
            v-for="(item, i) in catData"
            :key="i"
            :class="{ active: i == currFirstCat }"
            @click="handleFirstCat(item, i)"
            >{{ item.title }}</a
          >
        </div>
      </div>
      <div class="products-cat">
        <a
          v-for="(item, i) in secondCat"
          :key="i"
          :class="{ active: i == currSecondCat }"
          @click="handleSecondCat(item, i)"
          >{{ item.title }}</a
        >
      </div>
      <div class="order-box">
        <div class="order-type">
          <a
            v-for="(item, i) in orderData"
            :key="i"
            :class="{ active: i == currOrderType }"
            @click="handleOrderType(item, i)"
            >{{ item.title }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryMooc",
  data() {
    return {
      // 模拟数据
      key: "",
      hotWords: [
        "React.js",
        "算法",
        "Vue.js",
        "Python",
        "人工智能",
        "GO语言",
        "小程序",
      ],
      currFirstCat: 0,
      currSecondCat: 0,
      currOrderType: 0,
      orderData: [
        {
          title: "综合排序",
          order: "",
          sort: "",
        },
        {
          title: "最新",
          order: "",
          sort: "",
        },
        {
          title: "销量",
          order: "",
          sort: "",
        },
        {
          title: "评价",
          order: "",
          sort: "",
        },
      ],
      secondCat: [
        {
          title: "不限",
        },
        {
          title: "微服务",
        },
        {
          title: "区块链",
        },
        {
          title: "机器学习",
        },
        {
          title: "深度学习",
        },
        {
          title: "数据分析&挖掘",
        },
        {
          title: "小程序",
        },
        {
          title: "HTML/CSS",
        },
        {
          title: "JavaScript",
        },
        {
          title: "Vue.js",
        },
        {
          title: "React.JS",
        },
        {
          title: "Java",
        },
        {
          title: "SpringBoot",
        },
        {
          title: "SSM",
        },
        {
          title: "Python",
        },
        {
          title: "爬虫",
        },
      ],
      catData: [
        {
          title: "全部",
          type: "all",
        },
        {
          title: "前沿技术",
          children: [
            {
              title: "微服务",
            },
            {
              title: "区块链",
            },
            {
              title: "机器学习",
            },
            {
              title: "深度学习",
            },
            {
              title: "数据分析&挖掘",
            },
          ],
        },
        {
          title: "前端开发",
          children: [
            {
              title: "小程序",
            },
            {
              title: "HTML/CSS",
            },
            {
              title: "JavaScript",
            },
            {
              title: "Vue.js",
            },
            {
              title: "React.JS",
            },
          ],
        },
        {
          title: "后端开发",
          children: [
            {
              title: "Java",
            },
            {
              title: "SpringBoot",
            },
            {
              title: "SSM",
            },
            {
              title: "Python",
            },
            {
              title: "爬虫",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleFirstCat(v, i) {
      this.currFirstCat = i;
      if (v.type == "all") {
        return;
      }
      let data = [
        {
          title: "不限",
          type: "all",
        },
      ];
      v.children.forEach((e) => {
        data.push(e);
      });
      this.secondCat = data;
    },
    handleSecondCat(v, i) {
      this.currSecondCat = i;
      if (v.type == "all") {
      }
    },
    handleOrderType(v, i) {
      this.currOrderType = i;
    },
  },
  mounted() {},
};
</script>
