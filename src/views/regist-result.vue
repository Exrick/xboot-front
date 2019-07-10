<template>
  <div class="regist-result">
    <Row type="flex" justify="center" align="middle" @keydown.enter="submitRegist">
      <Col style="width: 368px;">
        <Header/>
        <Row class="success">
          <Icon type="md-checkmark-circle" color="#52c41a" size="64"></Icon>
          <p class="success-words">恭喜您，您的账户：{{username}} 注册成功</p>
          <Row class="buttons">
            <router-link to="/login">
              <Button type="primary" size="large" style="margin-right:10px;">立即登录</Button>
            </router-link>
            <router-link to="/regist">
              <Button size="large">返回注册</Button>
            </router-link>
          </Row>
        </Row>
        <Footer/>
      </Col>
    </Row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      username: ""
    };
  },
  methods: {},
  mounted() {
    this.username = this.$route.query.username;
  }
};
</script>

<style lang="less">
@import "./regist-result.less";
</style>
