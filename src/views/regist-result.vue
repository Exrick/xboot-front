<template>
    <Row type="flex" justify="center" align="middle" class="regist" @keydown.enter="submitRegist">
        <Col :xs="{span:22}" style="width: 368px;">
            <Row class="header">
                <img src="../images/xboot.png" width="220px"/>
                <div class="description">X-Boot 是很不错的Web前后端分离架构脚手架</div>
            </Row>

            <Row class="success">
              <Icon type="checkmark-circled" color="#52c41a" size="64"></Icon>
              <p class="success-words">恭喜您，您的账户：{{username}} 注册成功</p>
              <Row class="buttons">
                <router-link to="/login"><Button type="primary" size="large">立即登录</Button></router-link>
                <router-link to="/regist"><Button type="ghost" size="large">返回注册</Button></router-link>
              </Row>
            </Row>

            <Row class="foot">
                <Row type="flex" justify="space-around" class="code-row-bg help">
                    <a class="item">帮助</a>
                    <a class="item">隐私</a>
                    <a class="item">条款</a>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg copyright">
                    Copyright © 2018 <a href="http://exrick.cn" target="_blank" style="margin:0 5px;">Exrick</a> Presents
                </Row>
            </Row>
        </Col>
    </Row>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: ""
    }
  },
  methods: {
  },
  mounted(){
    this.username = this.$route.query.username
  }
};
</script>

<style lang="less">
@import "./regist-result.less";
</style>
