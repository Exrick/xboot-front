<style lang="less">
@import "./BannerMooc.less";
</style>

<template>
  <div class="mooc">
    <!-- 模糊背景 -->
    <div v-if="bk" class="bk" :style="backgroundImage"></div>
    <!-- 轮播图 -->
    <div class="wrap">
      <div class="banner">
        <!-- 左侧分类 -->
        <div class="menu-content">
          <a v-for="(item, i) in catData" :key="i" class="item" @mouseover="handleShowSub(true,item)" @mouseout="handleShowSub(false)">
            <span>{{item.title}}</span>
            <Icon type="md-arrow-dropright"/>
          </a>
        </div>
        <!-- 分类详情 -->
        <div class="submenu" v-show="showSubMenu" @mouseover="showSubMenu=true" @mouseout="showSubMenu=false">
          <div class="sub-wrap">
            <!-- 分类 -->
            <div class="innerBox">
              <div class="banner-line">
                <span>{{catName}}</span>
              </div>
              <div class="tag-box">
                <a v-for="(item,i) in secondCat" :key="i">{{item.title}}</a>
              </div>
            </div>
            <!-- 推荐商品 -->
            <div class="recomment-box">
              <a v-for="(item,i) in catRecommend" :key="i" :title="item.title" class="banner-card">
                <img :src="item.picUrl">
                <div class="card">
                  <h3 class="name">{{item.title}}</h3>
                  <div class="price">￥{{Number(item.price).toFixed(2)}}</div>
                  <div class="sales">
                    销量：{{item.sales}}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- 右侧轮播图 -->
        <div class="banner-content">
          <Carousel @on-change="changeBanner" autoplay loop :radius-dot="true" :autoplay-speed="3500" :height="316" class="carousel">
            <CarouselItem v-for="(item, i) in bannerData" :key="i">
              <img :src="item.picUrl" width="937" height="316">
            </CarouselItem>
          </Carousel>
          <!-- 下方热门图标 -->
          <div class="hot-banner">
            <a v-for="(item, i) in hotBanner" :key="i">
              <img :src="item.picUrl" />
              <p class="tit">{{item.title}}</p>
              <p class="desc">{{item.desc}}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerMooc",
  data() {
    return {
      backgroundImage: "",
      showSubMenu: false,
      catName: "",
      secondCat: [],
      catRecommend: []
    };
  },
  props: {
    // 开启背景模糊
    bk: {
      type: Boolean,
      default: false
    },
    bannerData: {
      type: Array,
      default: function() {
        // 默认模拟数据
        return [
          {
            picUrl: "//img.mukewang.com/5b1e47160001d8a918720632.jpg"
          },
          {
            picUrl: "//img.mukewang.com/5b3ca3060001241b09360316.jpg"
          },
          {
            picUrl: "//img.mukewang.com/5b31a0c60001d59009360316.jpg"
          }
        ];
      }
    },
    hotBanner: {
      type: Array,
      default: function() {
        // 默认模拟数据
        return [
          {
            title: "Web前端攻城狮",
            desc: "互联网时代最火爆的技术",
            picUrl: "https://s1.ax1x.com/2018/10/23/irETwF.png"
          },
          {
            title: "Java攻城狮",
            desc: "综合就业排名第一",
            picUrl: "https://s1.ax1x.com/2018/10/23/irEhQ0.png"
          },
          {
            title: "Android攻城狮",
            desc: "移动设备市场份额第一",
            picUrl: "https://s1.ax1x.com/2018/10/23/irE5LT.png"
          },
          {
            title: "PHP攻城狮",
            desc: "世界上最好的语言：）",
            picUrl: "https://s1.ax1x.com/2018/10/23/irEoeU.png"
          },
          {
            title: "iOS攻城狮",
            desc: "可能是全球最好用的系统",
            picUrl: "https://s1.ax1x.com/2018/10/23/irE7o4.png"
          }
        ];
      }
    },
    catData: {
      type: Array,
      default: function() {
        // 默认模拟数据
        return [
          {
            title: "前沿 / 区块链 / 人工智能",
            children: [
              {
                title: "微服务"
              },
              {
                title: "区块链"
              },
              {
                title: "人工智能"
              }
            ],
            recommend: [
              {
                title: "前端进阶：响应式开发与常用框架",
                price: 658,
                sales: 1258,
                picUrl: "//climg.mukewang.com/5915802b0001da6206000338.jpg"
              },
              {
                title: "前端进阶：响应式开发与常用框架",
                price: 658,
                sales: 1180,
                picUrl: "//img1.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg"
              },
              {
                title: "React16+React-Router4 从零打造企业级电商后台管理系统",
                price: 268,
                sales: 1328,
                picUrl: "//img3.mukewang.com/szimg/5a6e7fdf0001e7bb05400300.jpg"
              }
            ]
          },
          {
            title: "前端 / 小程序 / JS",
            children: [
              {
                title: "HTML/CSS"
              },
              {
                title: "JavaScript"
              },
              {
                title: "Vue.js"
              }
            ],
            recommend: [
              {
                title: "从网页搭建入门Java Web",
                price: 568,
                sales: 975,
                picUrl: "//climg.mukewang.com/5915802b0001da6206000338.jpg"
              },
              {
                title: "Java并发编程与高并发解决方案",
                price: 299,
                sales: 1913,
                picUrl: "//img1.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg"
              },
              {
                title: "Google资深工程师深度讲解Go语言",
                price: 399,
                sales: 1082,
                picUrl: "//img3.mukewang.com/szimg/5a6e7fdf0001e7bb05400300.jpg"
              }
            ]
          }
        ];
      }
    }
  },
  methods: {
    changeBanner(v) {
      v += 1;
      if (v == this.bannerData.length) {
        v = 0;
      }
      this.backgroundImage =
        "background-image: url('" + this.bannerData[v].picUrl + "')";
    },
    handleShowSub(show, v) {
      if (show) {
        this.catName = v.title;
        this.secondCat = v.children;
        this.catRecommend = v.recommend;
        this.showSubMenu = true;
      } else {
        this.showSubMenu = false;
      }
    }
  },
  mounted() {}
};
</script>
