<style lang="less">
@import "./home.less";
</style>

<template>
  <div>
    <div v-show="currNav == 'xboot'" class="home">
      <Row :gutter="10">
        <!-- 左上侧 用户信息及github链接 -->
        <Col :xs="24" :sm="24" :lg="24" :xl="8">
          <Row :gutter="10">
            <Col style="margin-bottom: 10px; width: 100%">
              <Card :padding="0">
                <div class="welcome-card">
                  <div class="left">
                    <div class="user">
                      <Avatar
                        v-if="avatar"
                        :src="avatar"
                        size="60"
                        class="avator-img"
                      ></Avatar>
                      <Avatar
                        v-else
                        icon="md-person"
                        size="60"
                        class="avator-icon"
                      ></Avatar>
                      <div class="info">
                        <p class="username">Hi, {{ nickname }} !</p>
                        <p class="welcome">欢迎回到XBoot快速开发平台</p>
                      </div>
                    </div>
                    <div class="list">
                      <div class="p">
                        <div class="dot"></div>
                        您当前所在的部门为：{{ departmentTitle }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        您当前的用户类型为：{{ userType }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        本次登录地点：{{ city }}
                      </div>
                    </div>
                  </div>
                  <img
                    class="pic"
                    :src="require('@/assets/icon/computer.svg')"
                  />
                </div>
              </Card>
            </Col>
            <Col style="margin-bottom: 10px; width: 100%">
              <Card>
                <p slot="title">
                  <Icon
                    type="logo-github"
                    size="20"
                    style="margin-right: 5px"
                  />
                  <a href="https://github.com/Exrick/x-boot" target="_blank"
                    >XBoot开源版本地址</a
                  >
                </p>
                <p slot="extra">
                  <a target="_blank" href="http://exrick.cn">作者：Exrick</a>
                </p>
                <div class="timeline-content">
                  <Timeline>
                    <TimelineItem>
                      <Icon
                        type="logo-youtube"
                        color="#fb7299"
                        slot="dot"
                      ></Icon>
                      <a @click="showVideo = true"
                        >作者亲自制作XBoot文字快闪宣传片</a
                      >
                    </TimelineItem>
                    <TimelineItem>
                      <Icon
                        type="logo-youtube"
                        color="#fb7299"
                        slot="dot"
                      ></Icon>
                      <a
                        href="https://www.bilibili.com/video/av23121122/"
                        target="_blank"
                        >作者亲自制作各项目宣传视频 点我观看</a
                      >
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-barcode" color="black" slot="dot"></Icon>
                      <a
                        href="https://github.com/Exrick/Machine-Learning"
                        target="_blank"
                        >个人机器学习笔记</a
                      >
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-cart" color="#f4364c" slot="dot"></Icon>
                      <a href="http://xmall.exrick.cn" target="_blank"
                        >XMall开源分布式商城</a
                      >
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-cash" color="#19be6b" slot="dot"></Icon>
                      <a href="http://xpay.exrick.cn" target="_blank"
                        >XPay开源个人免签支付系统</a
                      >
                    </TimelineItem>
                    <TimelineItem>
                      <Icon type="md-people" color="#57a3f3" slot="dot"></Icon
                      >QQ交流群 475743731(付费) 562962309(免费)
                    </TimelineItem>
                  </Timeline>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <!-- 右上侧 -->
        <Col :lg="24" :xl="16">
          <Row :gutter="10">
            <Col
              :xs="24"
              :sm="24"
              :lg="24"
              :xl="12"
              style="margin-bottom: 10px"
            >
              <Card>
                <p slot="title" style="overflow: visible">
                  <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">
                    <Icon
                      type="ios-star"
                      size="20"
                      style="margin-right: 5px"
                    ></Icon>
                    <Badge dot>立即获取 XBoot 完整版</Badge>
                  </a>
                </p>
                <div class="buy-content">
                  <div class="qr">
                    <img src="@/assets/qr.png" width="130" />
                    <span class="des">手机扫一扫支付，限时优惠</span>
                  </div>
                  <Alert
                    type="warning"
                    show-icon
                    style="padding: 8px 8px 8px 36px; font-size: 12px"
                    >价格上调提示：App端开发中，价格即将上调，请尽快获取！永久更新！</Alert
                  >
                  <div class="flex">
                    完整版(仅供学习)：
                    <span class="rmb">￥</span>
                    <span class="price">{{ price }}</span>
                    <span class="origin">￥</span>
                    <s class="origin">298</s>
                    <Button
                      to="http://xpay.exrick.cn/pay?xboot"
                      target="_blank"
                      type="error"
                      icon="md-paper-plane"
                      style="margin-left: 10px"
                      >立即获取</Button
                    >
                  </div>
                  <div class="flex">
                    商用授权：
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
                      style="margin-left: 10px"
                      >获取商用授权</Button
                    >
                    <br />
                  </div>
                  <Alert style="padding: 8px 16px 8px 16px; font-size: 12px">
                    支付后源码和更新维护群将自动发至您在支付页面所填写的邮箱，
                    <span class="light"
                      >完整版与商用版都拥有在线demo全部功能，提供永久免费更新，但前者仅供学习使用。</span
                    >
                    开源版本请遵循GPLv3.0开源协议，
                    <span class="light">不得闭源</span
                    >，商用需求请联系作者签署授权协议。
                    价格可能随功能逐渐完善或物价变化。
                  </Alert>
                </div>
              </Card>
            </Col>
            <Col :xs="24" :sm="24" :xl="12" style="margin-bottom: 10px">
              <Card>
                <p slot="title">
                  <Icon type="md-bookmark" style="margin-right: 5px"></Icon
                  >ISSUE/评论/更新日志
                </p>
                <div id="comments" class="comment-container">
                  请于线上
                  <a href="http://xboot.exrick.cn" target="_blank"
                    >http://xboot.exrick.cn </a
                  >查看
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card1"
            prefix="￥"
            :end-val="count.data1"
            title="今日销售额"
            :image="require('@/assets/icon/money.png')"
            width="34px"
            height="34px"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card2
            id="card2"
            suffix="%"
            :end-val="count.data2"
            color="#f90"
            title="销售量增长"
            description="相比昨日"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card4
            title="待办事项"
            :time="time"
            description="您有一个新的待审批任务，请前往查看"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card3
            title="应用中心"
            description="销量统计，用户统计，日活分析"
            :image="require('@/assets/icon/app.png')"
            width="34px"
            height="34px"
            titleSize="18px"
          />
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp icon="logo-buffer" title="SaaS应用" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#2db7f5" icon="md-bookmarks" title="日志分析" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#19be6b" icon="md-cloud" title="云运维" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#f90" icon="md-film" title="视频监控" />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#8950fc" icon="md-stats" title="数据分析"
        /></Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <cardApp activeColor="#ed4014" icon="md-people" title="用户分析"
        /></Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card5"
            :bordered="false"
            :end-val="126778"
            title="今日新增互动数"
            backgroundColor="#fff4df"
            :image="require('@/assets/icon/comment.png')"
            width="34px"
            height="34px"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card6"
            :bordered="false"
            :end-val="68893"
            backgroundColor="#6993fe"
            countColor="#fff"
            icon="md-person-add"
            iconColor="#fff"
            titleColor="#fff"
            title="今日新增用户"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card7"
            :bordered="false"
            :end-val="count.data4"
            backgroundColor="#8950fe"
            countColor="#fff"
            icon="md-cloud-download"
            iconColor="#fff"
            titleColor="#fff"
            title="今日下载量"
          />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card8"
            :bordered="false"
            :end-val="13507632434"
            backgroundColor="#f64e61"
            countColor="#fff"
            icon="md-calendar"
            iconColor="#fff"
            titleColor="#fff"
            title="月活"
          />
        </Col>
      </Row>
      <Row :gutter="10">
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="16"
          :style="{ marginBottom: '10px' }"
        >
          <visit-volume />
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="8"
          :style="{ marginBottom: '10px' }"
        >
          <visit-separation />
        </Col>
      </Row>
    </div>
    <div v-if="currNav == 'app'">
      <dashboard2 />
    </div>

    <Modal
      v-model="showVideo"
      title="作者亲自制作XBoot炫酷文字快闪宣传片"
      :styles="{ top: '30px' }"
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
        style="width: 100%; height: 550px"
      ></iframe>
    </Modal>
  </div>
</template>

<script>
import { ipInfo } from "@/api/index";
import visitVolume from "./components/visitVolume.vue";
import visitSeparation from "./components/visitSeparation.vue";
import card1 from "@/views/my-components/widget/card1.vue";
import card2 from "./components/card2.vue";
import card3 from "@/views/my-components/widget/card3.vue";
import card4 from "@/views/my-components/widget/card4.vue";
import cardApp from "./components/cardApp.vue";
import dashboard2 from "../xboot-charts/dashboard2/dashboard2.vue";
import Cookies from "js-cookie";
export default {
  name: "home",
  components: {
    visitVolume,
    visitSeparation,
    card1,
    card2,
    card3,
    card4,
    cardApp,
    dashboard2,
  },
  data() {
    return {
      showVideo: false,
      count: {
        data1: 5396,
        data2: 68,
        data3: 19305,
        data4: 39503498,
      },
      city: "未知",
      departmentTitle: "无",
      userType: "无",
      time: "",
      price: "...",
    };
  },
  computed: {
    currNav() {
      return this.$store.state.app.currNav;
    },
    nickname() {
      return this.$store.state.user.nickname;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
  },
  methods: {
    init() {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.departmentTitle = userInfo.departmentTitle;
      if (userInfo.type == "0") {
        this.userType = "普通用户";
      } else if (userInfo.type == "1") {
        this.userType = "管理员";
      }
      ipInfo().then((res) => {
        if (res.success) {
          this.city = res.result;
        }
      });
      this.time = this.format(new Date(), "yyyy年MM月dd日");
    },
  },
  mounted() {
    this.init();
    // 价格
    AV.init({
      appId: "6Bstbxl4NDU69I77D3nzf61h-gzGzoHsz",
      appKey: "gaFTnYlTul3M8qdiGlbfvoJK",
      serverURL: "https://6bstbxl4.lc-cn-n1-shared.com",
    });
    const query = new AV.Query("Price");
    query.equalTo("objectId", "6080216c2a5bb23590bcaedb");
    query.first().then((e) => {
      this.price = e.attributes.price;
    });
    // 宣传视频
    let videoFlag = "videoShowed";
    let xbootVideo = Cookies.get(videoFlag);
    if (xbootVideo != videoFlag) {
      this.showVideo = true;
      Cookies.set(videoFlag, videoFlag);
    }
  },
};
</script>
