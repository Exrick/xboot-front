<style lang="less">
@import "./BannerShop.less";
</style>

<template>
  <div class="banner-container">
    <div class="banner-wrap">
      <!-- 分类 -->
      <div class="category">
        <div class="category-list">
          <a v-for="(item, i) in catData" :key="i" class="item" @mouseover="handleShowSub(true,item)" @mouseout="handleShowSub(false)">
            <span class="title">{{item.title}}</span>
            <Icon type="ios-arrow-forward" size="20" color="rgba(255,255,255,0.5)" />
          </a>
        </div>
      </div>
      <!-- 分类详情 -->
      <div class="category-children" v-show="showSub" @mouseover="showSub=true" @mouseout="showSub=false">
        <div class="children-wrap">
          <a class="item" v-for="(item,i) in secondCat" :key="i">
            <img :src="item.picUrl" width="40" height="40">
            <span class="title">{{item.title}}</span>
          </a>
        </div>
      </div>
      <!-- 轮播 -->
      <Carousel autoplay loop :radius-dot="true" :autoplay-speed="3500" :height="460" class="carousel">
        <CarouselItem v-for="(item, i) in bannerData" :key="i">
          <img :src="item.picUrl">
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerShop",
  data() {
    return {
      showSub: false,
      secondCat: []
    };
  },
  props: {
    bannerData: {
      type: Array,
      default: function() {
        // 默认模拟数据
        return [
          {
            picUrl: "//i1.mifile.cn/a4/xmad_15338982677936_eQTJk.jpg"
          },
          {
            picUrl: "//i1.mifile.cn/a4/xmad_15404716972142_jGJnP.jpg"
          },
          {
            picUrl: "//i1.mifile.cn/a4/xmad_1540622566963_Dhkyv.jpg"
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
            title: "手机卡 电话卡",
            children: [
              {
                title: "小米MIX 3",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/mix3-80.png?width=80&height=80"
              },
              {
                title: "小米8 青春版",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/qingchun-80.png?width=80&height=80"
              },
              {
                title: "小米8 屏幕指纹版",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/pingmu-80.png?width=80&height=80"
              },
              {
                title: "小米8 青春版",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/qingchun-80.png?width=80&height=80"
              },
              {
                title: "小米8",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/m8-80.png?width=80&height=80"
              },
              {
                title: "小米8 SE",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/m8se-80.png?width=80&height=80"
              }
            ]
          },
          {
            title: "电视盒子",
            children: [
              {
                title: "米家激光投影电视",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/m8se-80.png?width=80&height=80"
              },
              {
                title: "小米电视4A 32英寸",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/TV4A-32.png?width=80&height=80"
              },
              {
                title: "小米电视4A 40英寸",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/TV4A-40.png?width=80&height=80"
              }
            ]
          },
          {
            title: "笔记本 平板",
            children: [
              {
                title: "小米笔记本 15.6",
                picUrl:
                  "//i1.mifile.cn/f/i/g/bijiben80.jpg?width=80&height=80"
              },
              {
                title: "小米笔记本 13.3",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/80x80.png?width=80&height=80"
              }
            ]
          },
          {
            title: "家电 插线板",
            children: [
              {
                title: "米家互联网空调",
                picUrl:
                  "//i1.mifile.cn/f/i/g/2015/cn-index/kongtiaoguan140.png?width=80&height=80"
              }
            ]
          }
        ];
      }
    }
  },
  methods: {
    handleShowSub(show, v) {
      if (show) {
        this.secondCat = v.children;
        this.showSub = true;
      } else {
        this.showSub = false;
      }
    }
  },
  created() {}
};
</script>
