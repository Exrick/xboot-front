<template>
  <div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <Icon type="logo-github" size="42" color="#181617" />
        </div>
        <div>
          <div class="title">Github</div>
          <div class="desc">
            <span v-if="relate.github"
              >已绑定Github账号：{{ relate.githubUsername }}</span
            >
            <span v-else>当前未绑定Github账号</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.github" @click="toRelateGithub()">立即绑定</a>
        <a v-else @click="unRelateGithub()">解除绑定</a>
      </div>
    </div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <img src="@/assets/icon/qq.png" width="42px" />
        </div>
        <div>
          <div class="title">QQ</div>
          <div class="desc">
            <span v-if="relate.qq">已绑定QQ账号：{{ relate.qqUsername }}</span>
            <span v-else>当前未绑定QQ账号</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.qq" @click="toRelateQQ()">立即绑定</a>
        <a v-else @click="unRelateQQ()">解除绑定</a>
      </div>
    </div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <Icon custom="iconfont icon-weixin" size="40" color="#60c126"></Icon>
        </div>
        <div>
          <div class="title">微信</div>
          <div class="desc">
            <span v-if="relate.wechat"
              >已绑定微信账号：{{ relate.wechatUsername }}</span
            >
            <span v-else>当前未绑定微信账号</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.wechat" @click="toRelateWechat()">立即绑定</a>
        <a v-else @click="unRelateWechat()">解除绑定</a>
      </div>
    </div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <img src="@/assets/icon/weibo.png" width="41px" />
        </div>
        <div>
          <div class="title">微博</div>
          <div class="desc">
            <span v-if="relate.weibo"
              >已绑定微博账号：{{ relate.weiboUsername }}</span
            >
            <span v-else>当前未绑定微博账号</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.weibo" @click="toRelateWeibo()">立即绑定</a>
        <a v-else @click="unRelateWeibo()">解除绑定</a>
      </div>
    </div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <img src="@/assets/icon/dingding.png" width="41px" />
        </div>
        <div>
          <div class="title">钉钉</div>
          <div class="desc">
            <span v-if="relate.dingding"
              >已绑定钉钉账号：{{ relate.dingdingUsername }}</span
            >
            <span v-else>当前未绑定钉钉账号</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.dingding" @click="toRelateDingding()">立即绑定</a>
        <a v-else @click="unRelateDingding()">解除绑定</a>
      </div>
    </div>
    <div class="item">
      <div class="social">
        <div class="logo">
          <img src="@/assets/icon/qiyeweixin.png" width="41px" />
        </div>
        <div>
          <div class="title">企业微信</div>
          <div class="desc">
            <span v-if="relate.workwechat"
              >已绑定企业微信账号：{{ relate.workwechatUsername }}</span
            >
            <span v-else>当前未绑定企业微信</span>
          </div>
        </div>
      </div>
      <div>
        <a v-if="!relate.workwechat" @click="toRelateWorkwechat()">立即绑定</a>
        <a v-else @click="unRelateWorkwechat()">解除绑定</a>
      </div>
    </div>
    <Spin fix v-if="jumping">跳转中...</Spin>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  components: {},
  name: "social",
  data() {
    return {
      relate: {},
      jumping: false,
    };
  },
  methods: {
    init() {
      let v = JSON.parse(Cookies.get("userInfo"));
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let userInfo = JSON.parse(str);
    },
    toRelateGithub() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    toRelateQQ() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    toRelateWeibo() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    toRelateWechat() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    toRelateDingding() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    toRelateWorkwechat() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateGithub() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateQQ() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateWeibo() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateWechat() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateDingding() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
    unRelateWorkwechat() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot",
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
