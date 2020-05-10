<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>

<template>
  <div>
    <div v-show="currNav=='xboot'" class="home">
      <Row :gutter="10">
        <Col :lg="24" :xl="8">
          <Row :gutter="10">
            <Col :lg="12" :xl="24" :style="{marginBottom: '10px'}">
              <Card>
                <Row type="flex" class="user-info">
                  <Col span="8">
                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                      <img class="avator-img" :src="avatarPath" />
                    </Row>
                  </Col>
                  <Col span="16" style="padding-left:6px;">
                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                      <div>
                        <b class="card-user-info-name">{{ username }}</b>
                        <p>您好，XBoot 欢迎您的使用</p>
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
              </Card>
            </Col>
            <Col :lg="12" :xl="24" style="margin-bottom: 10px;">
              <Card>
                <p slot="title">
                  <Icon type="logo-github" size="20" style="margin-right:5px" />
                  <a href="https://github.com/Exrick/x-boot" target="_blank">XBoot开源版本地址</a>
                </p>
                <p slot="extra">
                  <a target="_blank" href="http://exrick.cn">作者：Exrick</a>
                </p>
                <div style="height: 268px;">
                  <Timeline>
                    <TimelineItem>
                      <Icon type="logo-youtube" color="#fb7299" slot="dot"></Icon>
                      <a @click="showVideo=true">作者亲自制作XBoot文字快闪宣传片 点我观看</a>
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="logo-youtube" color="#fb7299" slot="dot"></Icon>
                      <a
                        href="https://www.bilibili.com/video/av23121122/"
                        target="_blank"
                      >作者亲自制作各项目宣传视频 点我观看</a>
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-barcode" color="black" slot="dot"></Icon>
                      <a href="https://github.com/Exrick/Machine-Learning" target="_blank">个人机器学习笔记</a>
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-cart" color="#f4364c" slot="dot"></Icon>
                      <a href="http://xmall.exrick.cn" target="_blank">XMall开源分布式商城</a>
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-cash" color="#19be6b" slot="dot"></Icon>
                      <a href="http://xpay.exrick.cn" target="_blank">XPay开源个人免签支付系统</a>
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-people" color="#57a3f3" slot="dot"></Icon>QQ交流群 475743731(付费) 562962309(免费)
                    </TimelineItem>
                  </Timeline>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col :lg="24" :xl="16">
          <Row :gutter="5">
            <Col :sm="24" :md="12" :lg="6" :style="{marginBottom: '10px'}">
              <info-card
                id-name="user_created_count"
                :end-val="count.createUser"
                iconType="md-person-add"
                color="#2d8cf0"
                intro-text="今日新增用户"
              ></info-card>
            </Col>
            <Col :sm="24" :md="12" :lg="6" :style="{marginBottom: '10px'}">
              <info-card
                id-name="visit_count"
                :end-val="count.visit"
                iconType="ios-eye"
                color="#64d572"
                :iconSize="50"
                intro-text="今日浏览量"
              ></info-card>
            </Col>
            <Col :sm="24" :md="12" :lg="6" :style="{marginBottom: '10px'}">
              <info-card
                id-name="collection_count"
                :end-val="count.collection"
                iconType="md-cloud-upload"
                color="#ffd572"
                intro-text="今日数据采集量"
              ></info-card>
            </Col>
            <Col :sm="24" :md="12" :lg="6" :style="{marginBottom: '10px'}">
              <info-card
                id-name="transfer_count"
                :end-val="count.transfer"
                iconType="md-shuffle"
                color="#f25e43"
                intro-text="今日服务调用量"
              ></info-card>
            </Col>
          </Row>
          <Row>
            <Col :lg="24" :xl="12" style="padding: 0 5px 10px 0;">
              <Card>
                <p slot="title" style="overflow:visible">
                  <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">
                    <Icon type="ios-star" size="20" style="margin-right:5px"></Icon>
                    <Badge dot>立即获取 XBoot 完整版</Badge>
                  </a>
                </p>
                <div style="height:368px;overflow:auto">
                  <div class="qr">
                    <Tooltip trigger="hover" placement="top" content="手机扫一扫支付，限时优惠！">
                      <img src="@/assets/qr.png" width="120" />
                    </Tooltip>
                  </div>
                  <Alert type="warning" show-icon style="padding: 8px 8px 8px 36px;font-size:12px">
                    价格上调提示：APP模块开发中，价格即将上涨，请尽快获取！永久更新！
                  </Alert>
                  <div class="flex">
                    完整版(仅供学习)：
                    <span class="rmb">￥</span>
                    <span class="price">198</span>
                    <span class="origin">￥</span>
                    <s class="origin">258</s>
                    <Button
                      to="http://xpay.exrick.cn/pay?xboot"
                      target="_blank"
                      type="error"
                      icon="md-paper-plane"
                      style="margin-left:10px;"
                    >立即获取</Button>
                  </div>
                  <div class="flex">
                    商用授权价格：
                    <span class="rmb">￥</span>
                    <span class="price">?998</span>
                    <span class="origin">￥</span>
                    <s class="origin">9998</s>
                    <span class="origin" style="font-size: 8px">起</span>
                    <Button
                      to="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes"
                      target="_blank"
                      type="warning"
                      icon="logo-vimeo"
                      style="margin-left:10px;"
                    >获取商用授权</Button>
                    <br />
                  </div>
                  <Alert style="padding: 8px 16px 8px 16px;font-size:12px">
                    支付后源码和更新维护群将自动发至您在支付页面所填写的邮箱，
                    <span
                      class="light"
                    >完整版与商用版都拥有在线demo全部功能，提供永久免费更新，但前者仅供学习使用。</span>
                    开源版本请遵循GPLv3.0开源协议，
                    <span class="light">不得闭源</span>，商用需求请联系作者签署授权协议。
                    价格可能随功能逐渐完善或物价变化。
                  </Alert>
                </div>
              </Card>
            </Col>
            <Col :lg="24" :xl="12" style="padding: 0 0 10px 5px;">
              <Card>
                <p slot="title">
                  <Icon type="md-bookmark" style="margin-right:5px"></Icon>ISSUE/评论/更新日志
                </p>
                <div id="comments" class="comment-container"></div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col :lg="24" :xl="16" :style="{marginBottom: '10px'}">
          <visit-volume />
        </Col>
        <Col :lg="24" :xl="8" :style="{marginBottom: '10px'}">
          <visit-separation />
        </Col>
      </Row>
    </div>
    <div v-show="currNav=='doc'||currNav=='xboot-show'||currNav=='xpay'||currNav=='xmall'">
      <show />
    </div>
    <div v-show="currNav=='app'">
      <dashboard2 />
    </div>

    <Modal
      v-model="showVideo"
      title="作者亲自制作XBoot炫酷文字快闪宣传片"
      :styles="{top: '30px'}"
      footer-hide
      width="1000"
    >
      <iframe
        src="//player.bilibili.com/player.html?aid=30284667&cid=52827707&page=1"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        style="width:100%;height:550px;"
      ></iframe>
    </Modal>
  </div>
</template>

<script>
import { ipInfo } from "@/api/index";
import visitVolume from "./components/visitVolume.vue";
import visitSeparation from "./components/visitSeparation.vue";
import infoCard from "./components/infoCard.vue";
import show from "./show.vue";
import dashboard2 from "../xboot-charts/dashboard2/dashboard2.vue";
import Cookies from "js-cookie";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

export default {
  name: "home",
  components: {
    visitVolume,
    visitSeparation,
    infoCard,
    show,
    dashboard2
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
      city: "",
      username: ""
    };
  },
  computed: {
    currNav() {
      return this.$store.state.app.currNav;
    },
    avatarPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    init() {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = userInfo.nickname;
      ipInfo().then(res => {
        if (res.success) {
          this.city = res.result;
        }
      });
    },
    showNotice() {
      getNotice().then(res => {
        if (res.success) {
          if (!res.result) {
            return;
          }
          let data = res.result;
          if (
            data.open &&
            (data.title || data.content) &&
            data.position == "HOME"
          ) {
            this.$Notice.info({
              title: data.title,
              desc: data.content,
              duration: data.duration
            });
          }
        }
      });
    }
  },
  mounted() {
    this.init();
    // Gitalk
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
    let videoFlag = "videoShowed";
    let xbootVideo = Cookies.get(videoFlag);
    if (xbootVideo != videoFlag) {
      this.showVideo = true;
      Cookies.set(videoFlag, videoFlag);
    }
  }
};
</script>
