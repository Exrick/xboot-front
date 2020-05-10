<template>
  <div class="authorize">
    <Row
      type="flex"
      justify="center"
      align="middle"
      @keydown.enter.native="submit"
      style="height:100%"
    >
      <Col class="layout">
        <div>
          <Header />
          <Row v-if="!error&&!authLoading">
            <Tabs value="1">
              <TabPane label="XBoot统一认证平台" name="1" icon="md-people">
                <Form ref="loginForm" :model="form" :rules="rules" class="form">
                  <FormItem prop="username">
                    <Input
                      v-model="form.username"
                      prefix="ios-contact"
                      size="large"
                      clearable
                      placeholder="请输入用户名"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="password">
                    <Input
                      type="password"
                      v-model="form.password"
                      prefix="ios-lock"
                      size="large"
                      clearable
                      placeholder="请输入密码"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="code">
                    <Row
                      type="flex"
                      justify="space-between"
                      style="align-items: center;overflow: hidden;"
                    >
                      <Input
                        v-model="form.code"
                        size="large"
                        clearable
                        placeholder="请输入图片验证码"
                        :maxlength="10"
                        style="width: 67%;"
                      />
                      <div class="code-image" style="position:relative;font-size:12px">
                        <Spin v-if="loadingCaptcha" fix></Spin>
                        <img
                          :src="captchaImg"
                          @click="getCaptchaImg"
                          alt="加载验证码失败"
                          style="width:110px;cursor:pointer;display:block"
                        />
                      </div>
                    </Row>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
            <Row>
              <Button type="primary" size="large" :loading="loading" @click="submit" long>
                <span v-if="!loading">授权并登录</span>
                <span v-else>授权中...</span>
              </Button>
            </Row>
            <Row type="flex" justify="space-between" class="other-thing">
              <router-link to="/reset" class="back">忘记密码</router-link>
              <router-link to="/regist">
                <a class="back">还没有账号？立即注册</a>
              </router-link>
            </Row>
          </Row>
          <div v-if="error" style="margin-top: 15vh">
            <Alert type="error" show-icon>
              {{title}}
              <span slot="desc">{{msg}}</span>
            </Alert>
          </div>
          <div v-if="authLoading">
            <RectLoading />
          </div>
        </div>
        <Footer />
      </Col>
      <LangSwitch />
    </Row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { initCaptcha, drawCodeImage } from "@/api/index";
import { authorize, authorized } from "@/api/open";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import RectLoading from "@/views/my-components/xboot/rect-loading";
export default {
  components: {
    LangSwitch,
    Header,
    Footer,
    RectLoading
  },
  data() {
    return {
      authLoading: false,
      title: "",
      msg: "",
      error: false,
      loadingCaptcha: true,
      captchaImg: "",
      loading: false,
      form: {
        username: "",
        password: "",
        code: "",
        client_id: "",
        redirect_uri: "",
        state: "",
        response_type: "",
        captchaId: this.captchaId
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    judgeUrl() {
      let q = this.$route.query;
      if (!q.client_id) {
        this.title = "参数client_id非法";
        this.msg = "The parameter client_id is illegal.";
        this.error = true;
        return;
      }
      if (!q.redirect_uri) {
        this.title = "参数redirect_uri非法";
        this.msg = "The parameter redirect_uri is illegal.";
        this.error = true;
        return;
      }
      if (!q.state) {
        this.title = "参数state非法";
        this.msg = "The parameter state is illegal.";
        this.error = true;
        return;
      }
      this.form.client_id = q.client_id;
      this.form.redirect_uri = q.redirect_uri;
      this.form.state = q.state;
      this.form.responseType = q.responseType;
    },
    getCaptchaImg() {
      this.loadingCaptcha = true;
      initCaptcha().then(res => {
        this.loadingCaptcha = false;
        if (res.success) {
          this.form.captchaId = res.result;
          this.captchaImg = drawCodeImage + res.result;
        }
      });
    },
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          authorize(this.form).then(res => {
            if (res.success) {
              // 存储认证信息 避免下次认证
              Cookies.set("oauthUsername", this.form.username, {
                expires: 30
              });
              let url =
                res.result.redirect_uri +
                "?code=" +
                res.result.code +
                "&state=" +
                res.result.state;
              window.location.href = url;
            } else {
              this.loading = false;
              this.getCaptchaImg();
            }
          });
        }
      });
    }
  },
  mounted() {
    this.judgeUrl();
    // 判断是否认证过
    let username = Cookies.get("oauthUsername");
    if (username) {
      this.authLoading = true;
      this.form.username = username;
      authorized(this.form).then(res => {
        if (res.success) {
          let url =
            res.result.redirect_uri +
            "?code=" +
            res.result.code +
            "&state=" +
            res.result.state;
          window.location.href = url;
        } else {
          this.authLoading = false;
        }
      });
    }
    this.getCaptchaImg();
  }
};
</script>

<style lang="less">
@import "./authorize.less";
</style>
