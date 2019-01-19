<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>

<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatarPath" />
                        </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <div>
                                <b class="card-user-infor-name">{{ username }}</b>
                                <p>X-Boot 欢迎您的使用</p>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">本次登录地点:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">{{city}}</Col>
                    </Row>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">天气:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">{{weather}}</Col>
                    </Row>
                </Card>
                </Col>
                <Col :md="12" :lg="24" style="margin-bottom: 10px;">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="logo-github" size="20" style="margin-bottom:3px;" />
                        <a href="https://github.com/Exrick/x-boot" target="_blank">
                                            X-Boot Github开源版本地址
                                        </a>
                    </p>
                    <p slot="extra">
                        <a target="_blank" href="http://exrick.cn">作者：Exrick</a>
                    </p>
                    <div class="to-do-list-con">
                        <Timeline>
                            <TimelineItem>
                                <Icon type="logo-youtube" color="#fb7299" slot="dot"></Icon>
                                <a @click="showVideo=true">作者亲自制作XBoot文字快闪宣传片 点我观看 
                                                </a>
                            </TimelineItem>
                            <TimelineItem>
                                <Icon type="logo-youtube" color="#fb7299" slot="dot"></Icon>
                                <a href="https://www.bilibili.com/video/av23121122/" target="_blank">作者亲自制作各项目宣传视频 点我观看 
                                                </a>
                            </TimelineItem>
                            <TimelineItem>
                                <Icon type="md-barcode" color="black" slot="dot"></Icon>
                                <a href="https://github.com/Exrick/Machine-Learning" target="_blank">个人机器学习笔记
                                                </a>
                            </TimelineItem>
                            <TimelineItem>
                                <Icon type="md-cart" color="#f4364c" slot="dot"></Icon>
                                <a href="http://xmall.exrick.cn" target="_blank">XMall开源分布式商城
                                                </a>
                            </TimelineItem>
                            <TimelineItem>
                                <Icon type="md-cash" color="#19be6b" slot="dot"></Icon>
                                <a href="http://xpay.exrick.cn" target="_blank">XPay开源个人免签支付系统
                                                </a>
                            </TimelineItem>
                            <TimelineItem>
                                <Icon type="md-people" color="#57a3f3" slot="dot"></Icon>
                                QQ交流群 475743731(付费) 562962309(免费)
                            </TimelineItem>
                        </Timeline>
                    </div>
                </Card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                    <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="md-person-add" color="#2d8cf0" intro-text="今日新增用户"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                    <infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="今日浏览量"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                    <infor-card id-name="collection_count" :end-val="count.collection" iconType="md-cloud-upload" color="#ffd572" intro-text="今日数据采集量"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                    <infor-card id-name="transfer_count" :end-val="count.transfer" iconType="md-shuffle" color="#f25e43" intro-text="今日服务调用量"></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Col :md="24" :lg="12" style="padding: 0 5px 10px 0;">
                        <Card>
                            <p slot="title" class="card-title" style="overflow:visible">
                                <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">
                                    <Icon type="ios-star" size="20" style="margin-bottom:2px"></Icon>
                                    <Badge dot>立即获取 X-Boot 完整版</Badge>
                                </a>
                            </p>
                            <div style="height:368px;overflow:auto">
                                <div class="qr">
                                    <img src="@/assets/qr.png" width="120">
                                    <div>支持手机扫码支付，限时优惠！<br>赠送
                                        <a href="https://v.qq.com/x/page/f0627kf4x1e.html" target="_blank">XMall小程序(不含后台)</a> + 
                                        <a href="https://github.com/Exrick/xpay" target="_blank">XPay个人收款支付系统v1.6</a>
                                    </div>
                                </div>
                                <div class="flex">
                                    完整版(仅供学习)：
                                    <span class="rmb">￥</span> <span class="price">168</span> 
                                    <span class="origin">￥</span><s class="origin">198</s> 
                                    <Button to="http://xpay.exrick.cn/pay?xboot" target="_blank" type="error" icon="md-paper-plane" style="margin-left:10px;">立即获取</Button>
                                </div>
                                <div class="flex">
                                    商用授权价格：
                                    <span class="rmb">￥</span> <span class="price">5998</span> 
                                    <span class="origin">￥</span><s class="origin">9998</s> 
                                    <Button to="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes" target="_blank" type="warning" icon="logo-vimeo" style="margin-left:10px;">获取商用授权</Button><br>
                                </div>
                                <Alert style="padding: 8px 16px 8px 16px;">
                                    支付后源码和更新维护群将自动发至您在支付页面所填写的邮箱，
                                    <span class="light">完整版与商用版都拥有在线demo全部功能，提供永久免费更新，但前者仅供学习使用。</span>
                                    开源版本请遵循GPLv3.0开源协议，<span class="light">不得闭源</span>，商用需求请联系作者签署授权协议。
                                    价格可能随功能逐渐完善或物价变化。
                                </Alert>
                            </div>
                        </Card>
                    </Col>
                    <Col :md="24" :lg="12" style="padding: 0 0 10px 5px;" >
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="md-bookmark"></Icon>
                                ISSUE/评论/更新日志
                            </p>
                            <div id="comments" style="height:365px;overflow:auto;" class="inner-container"></div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="md-map"></Icon>
                    每日来访量统计
                </p>
                <div class="data-source-row">
                    <visite-volume></visite-volume>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="16" :style="{marginBottom: '10px'}">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="md-locate"></Icon>
                        今日服务调用地理分布
                    </p>
                    <div class="map-con">
                        <Col span="10">
                        <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                        </Col>
                        <Col span="14" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            <home-map :city-data="cityData"></home-map>
                        </Row>
                        </Col>
                    </div>
                </Card>
            </col>
        </Row>
        <Modal
            v-model="showVideo"
            title="作者亲自制作XBoot炫酷文字快闪宣传片"
            :styles="{top: '30px'}"
            footer-hide
            width="1000"
            >
            <iframe src="//player.bilibili.com/player.html?aid=30284667&cid=52827707&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width:100%;height:550px;"> </iframe>
        </Modal>
    </div>
</template>

<script>
import { ipInfo } from "@/api/index";
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import visiteVolume from "./components/visiteVolume.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import Cookies from "js-cookie";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

export default {
  name: "home",
  components: {
    homeMap,
    visiteVolume,
    userFlow,
    countUp,
    inforCard,
    mapDataTable
  },
  data() {
    return {
      showVideo: false,
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      cityData: cityData,
      newToDoItemValue: "",
      city: "",
      weather: "",
      username: ""
    };
  },
  computed: {
    avatarPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    init() {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = userInfo.username;
      ipInfo().then(res => {
        if (res.success === true) {
          let ipInfo = JSON.parse(res.result);
          if (ipInfo.retCode === "200") {
            let info = ipInfo.result[0];
            let weather =
              info.weather +
              " " +
              info.temperature +
              " 污染指数: " +
              info.pollutionIndex;
            this.city = info.city;
            this.weather = weather;
          } else {
            this.city = "未知";
            this.weather = "未知";
          }
        }
      });
    }
  },
  mounted() {
    this.init();
    var gitalk = new Gitalk({
      clientID: "a128de2dd7383614273a",
      clientSecret: "a77691ecb662a8303a6c686ae651ae035868da6e",
      repo: "xboot-comments",
      owner: "Exrick",
      admin: ["Exrick"],
      distractionFreeMode: false // 遮罩效果
    });
    gitalk.render("comments");
    // 宣传视频
    let xbootVideo = Boolean(Cookies.get("xbootVideo"));
    if (!xbootVideo) {
      this.showVideo = true;
      Cookies.set("xbootVideo", true);
    }
  }
};
</script>
