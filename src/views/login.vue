<template>
    <Row type="flex" justify="center" align="middle" class="login" @keydown.enter.native="submitLogin">
        <Col :xs="{span:22}" style="width: 368px;">
            <Row class="header">
                <img src="../images/xboot.png" width="220px"/>
                <div class="description">X-Boot 是很不错的Web前后端分离架构脚手架</div>
            </Row>

            <Alert type="error" show-icon v-if="error">{{errorMsg}}</Alert>

            <Row class="login-form">
                <Tabs v-model="tabName">
                    <TabPane label="账户密码登录" name="username" icon="person">
                         <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
                            <FormItem prop="username">
                                <Input v-model="form.username" size="large" clearable placeholder="请输入用户名">
                                    <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="form.password" size="large" clearable  placeholder="请输入密码">
                                    <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="手机号登录" name="mobile" icon="iphone">
                        <Form ref="mobileLoginForm" :model="form" :rules="rules" class="form">
                            <FormItem prop="mobile">
                                <Input v-model="form.mobile" size="large" clearable placeholder="请输入手机号">
                                    <span slot="prepend">
                                        <Icon :size="18" type="iphone"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="verifyCode" :error="errorCode">
                                <Row type="flex" justify="space-between" class="code-row-bg">
                                    <Input v-model="form.verifyCode" size="large" clearable  placeholder="请输入短信验证码" :maxlength="maxLength" class="input-verify">
                                        <span slot="prepend">
                                            <Icon :size="14" type="ios-email-outline"></Icon>
                                        </span>
                                    </Input>
                                    <Button size="large" @click="sendVerify" v-if="!sended" class="send-verify">获取验证码</Button>
                                    <Button size="large" disabled v-if="sended" class="count-verify">{{countButton}}</Button>
                                </Row>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            
                <Row type="flex" justify="space-between" class="code-row-bg">
                    <Checkbox v-model="saveLogin" size="large">自动登录</Checkbox>
                    <a class="forget-pass">忘记密码</a>
                </Row>
                <Row>
                    <Button class="login-btn" type="primary" size="large" :loading="loading" @click="submitLogin" long>
                        <span v-if="!loading">登录</span>
                        <span v-else>登录中...</span>
                    </Button>
                </Row>
                <Row type="flex" justify="space-between" class="code-row-bg other-login">
                    <span class="other-way">
                        其它方式登录
                        <icon class="other-icon" name="brands/qq"></icon>
                        <icon class="other-icon lower" scale="1.2" name="brands/weixin"></icon>
                        <icon class="other-icon lower" scale="1.2" name="brands/weibo"></icon>
                    </span>
                    <router-link to="/regist"><a class="forget-pass">注册账户</a></router-link>
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
import { setStore } from "../utils/storage";
import { router } from "../router/index";
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      error: false,
      errorMsg: "",
      tabName: "username",
      saveLogin: true,
      loading: false,
      sended: false,
      count: 60,
      countButton: "60 s",
      maxLength: 4,
      errorCode: "",
      form: {
        username: "",
        password: "",
        mobile: "",
        verifyCode: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    showErrorMsg(msg) {
      this.error = true;
      this.errorMsg = msg;
    },
    sendVerify() {
      this.$refs.mobileLoginForm.validate(valid => {
        if (valid) {
          this.sended = true;
          this.countDown();
        }
      });
    },
    countDown() {
      let that = this;
      if (this.count === 0) {
        this.sended = false;
        this.count = 60;
        return;
      } else {
        this.countButton = this.count + " s";
        this.count--;
      }
      setTimeout(function() {
        that.countDown();
      }, 1000);
    },
    submitLogin() {
      if (this.tabName === "username") {
        this.$refs.usernameLoginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.postRequest("/login", {
              username: this.form.username,
              password: this.form.password,
              saveLogin: this.saveLogin
            }).then(res => {
              if (res.success === true) {
                setStore("accessToken", res.result);
                if (this.saveLogin) {
                  localStorage.saveLogin = "true";
                }
                // 获取用户信息
                this.getRequest("/user/info").then(res => {
                  if (res.success === true) {
                    Cookies.set("userInfo", res.result);
                    this.$store.commit("setAvatarPath", res.result.avatar);
                    // 存储该用户角色权限值
                    let access = [];
                    if (res.result.roles !== null) {
                      res.result.roles.forEach(function(e) {
                        if (e.access !== null) {
                          access.push(e.access);
                        }
                      });
                    }
                    Cookies.set("access", JSON.stringify(access));
                    this.$router.push({
                      name: "home_index"
                    });
                  }
                  this.loading = false;
                });
              } else {
                this.loading = false;
              }
            });
          }
        });
      } else if (this.tabName === "mobile") {
        this.$refs.mobileLoginForm.validate(valid => {
          if (valid) {
            if (this.form.verifyCode === "") {
              this.errorCode = "验证码不能为空";
              return;
            } else {
              this.errorCode = "";
            }
            this.showErrorMsg("页面演示，暂不支持短信登录");
          }
        });
      }
    }
  },
  mounted() {
    this.$Notice.info({
      title: "体验账号密码",
      desc: "账号：test 密码：123456 已开放注册！"
    });
  }
};
</script>

<style lang="less">
@import "./login.less";
</style>
